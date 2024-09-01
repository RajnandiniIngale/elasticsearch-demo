const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://localhost:9200" });

async function createIndex() {
  try {
    await client.indices.create({
      index: "books",
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            author: { type: "keyword" },
            publish_date: { type: "date" },
            description: { type: "text" },
            price: { type: "float" },
          },
        },
      },
    });

    console.log("Index created successfully!");
  } catch (err) {
    console.error("Error creating index",err);
  }
}

createIndex();

async function indexDocument() {
  try {
    await client.index({
      index: "books",
      body: {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publish_date:  '1925-04-10',
        description: 'A novel about the American Dream in the Jazz Age',
        price: 12.99
      },
    });

    console.log('Document Index successfully')
  } catch (err) {
    console.error("Document not added", err);
  }
}

indexDocument();

async function searchDocuments() {

  const res = await client.search({
    index: 'books',
    query: {
        match: {
            price: 12.99
        }
    }
  })

  console.log(res.hits.hits);
}

searchDocuments();

async function addDocuments() {
  try {
    await client.index({
      index: "books",
      body: {
        title: "abc",
        author: "F. Scott Fitzgerald",
        publication_date: "1825-04-10",
        description: "A novel about the Paris Dream in the New Age",
        price: 10.99,
      },
    });

    console.log("Document added successfully");
  } catch (err) {
    console.error("Docuemnt not added", err);
  }
}

addDocuments();

async function searchDocuments() {
  try {
    const res = await client.search({
      query: {
        match: {
          title: "abc",
        },
      },
    });

    console.log("results: ", res.hits.hits);
  } catch (err) {
    console.error("Error here", err);
  }
}

searchDocuments();

async function updateDocuments(id) {
  const res = await client.update({
    index: "books",
    id: id,
    body: {
      doc: {
        title: "New Book",
      },
    },
  });

  console.log("Document updated: ", res);
}

updateDocuments('PmscrZEBeER4iBsP8NYk');

async function searchDocuments() {
  const res = await client.search({
    index: "books",
    // query: {
    //   match: {
    //     title: "New Book",
    //   },
    // },
  });

  console.log("Document Found: ", res.hits.hits);
}

searchDocuments();

async function searchDocuments() {
  const res = await client.search({
    index: "books",
    // query: {

    // }
  });

  console.log("results: ", res.hits.hits);
}

searchDocuments();

async function updateDocuments(id) {
    try {
      await client.update({
        index: "books",
        id: id,
        body: {
          doc: {
            publish_date: "1930-05-12",
          },
        },
      });
    } catch (err) {
      console.error("error: ", err);
    }
  }

  updateDocuments("PmscrZEBeER4iBsP8NYk");

async function deleteDocuments(id) {
  try {

    await client.delete({
        index: 'books',
        id: id
    })

    console.log("Deleted Successfully");
  } catch (err) {
    console.error("Error: ", err);
  }
}

deleteDocuments("PmscrZEBeER4iBsP8NYk");

async function advancedSearch() {
  const res = await client.search({
    index: "books",
    query: {
      bool: {
        must: [
          {
            match: {
              title: "gatsby",
            },
          },
        ],
        filter: [
          {
            range: {
              publish_date: {
                lte: "2000-01-01",
              },
            },
          },
        ],
      },
    },
  });

  console.log("results: ", res.hits.hits);
}

advancedSearch();
