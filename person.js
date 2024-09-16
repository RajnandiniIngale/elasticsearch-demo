const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
});

async function createIndex() {
  await client.indices.create({
    index: "person",
    mappings: {
      properties: {
        name: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
            },
          },
        },
        city: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
            },
          },
        },

        description: {
          type: "text",
          fields: {
            keyword: {
              type: "text",
            },
          },
        },
      },
    },
  });
}

const docs = [
  {
    name: "Alice",
    age: 30,
    city: "New York",
    description: "Software Engineer",
  },
  {
    name: "Bob",
    age: 25,
    city: "San Francisco",
    description: "Data Scientist",
  },
  {
    name: "Charlie",
    age: 35,
    city: "Los Angeles",
    description: "Product Manager",
  },
  { name: "Dave", age: 40, city: "New York", description: "CTO" },
];

async function AddDocuments() {
  for (let i = 0; i < docs.length; i++) {
    await client.index({
      index: "person",
      body: docs[i],
    });
  }
}

async function getAllDocuments() {
  const res = await client.search({
    index: "person",
    query: {
      match_all: {},
    },
  });

  console.log(res.hits.hits);
}

async function getDocsByCity() {
  const res = await client.search({
    index: "person",
    query: {
      match: {
        city: "New York",
      },
    },
  });

  console.log(res.hits.hits);
}

// Bool Query (find documents where 'age' is greater than 30 and city is 'New York')
async function boolQuery() {
  const res = await client.search({
    index: "person",
    query: {
      bool: {
        must: [
          {
            match: {
              city: "New York",
            },
          },
          {
            range: {
              age: {
                gte: 30,
              },
            },
          },
        ],
      },
    },
  });

  console.log(res.hits.hits);
}

// Multi_match Query (search for 'Engineer' in 'description' or 'name')
async function multiMatchQuery() {
  const res = await client.search({
    index: "person",
    query: {
      multi_match: {
        query: "Dave",
        fields: ["name", "description"],
      },
    },
  });

  console.log(res.hits.hits);
}

async function rangeQuery() {
  const res = await client.search({
    index: "person",
    query: {
      range: {
        age: {
          lt: 30,
        },
      },
    },
  });

  console.log(res.hits.hits);
}

async function phraseQuery() {
  const res = await client.search({
    index: "person",
    query: {
      match_phrase: {
        description: "Product Manager",
      },
    },
  });

  console.log(res.hits.hits);
}

async function phraseQuery1() {
  const res = await client.search({
    index: "person",
    query: {
      match_phrase: {
        name: "Charlie",
      },
    },
  });

  console.log(res.hits.hits);
}

async function fuzzyQuery() {
  const res = await client.search({
    index: "person",
    query: {
      fuzzy: {
        description: {
          value: "Softwre",
          fuzziness: "AUTO",
        },
      },
    },
  });

  console.log(res.hits.hits);
}

async function wildCardQuery() {
  const res = await client.search({
    index: "person",
    query: {
      wildcard: {
        "description.keyword": "Soft*",
      },
    },
  });

  console.log(res.hits.hits);
}


async function getAllDocs(){

  const res = await client.search({
    index: "person",
    query: {
      match_all: {}
    }
  })

  console.log(res.hits.hits);
}


async function deleteByQuery(){

  const res = await client.deleteByQuery({
    index: "person",
    query: {
      match_all: {}
    }
  })

  console.log(res);

}

// deleteByQuery();

// getAllDocs();


// wildCardQuery();

// termQuery();

// fuzzyQuery();

// phraseQuery1();

// phraseQuery();

// rangeQuery();

// multiMatchQuery();

// boolQuery();

// getDocsByCity();

//  getAllDocuments();

// AddDocuments();

// createIndex();

async function deleteIndex() {
  try {
    await client.indices.delete({ index: "person" });

    console.log("Index deleted successfully");
  } catch (err) {
    console.error("Error deleting index: ", err);
  }
}

// deleteIndex();
