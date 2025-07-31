const weaviate = require("weaviate-ts-client").default;

const client = weaviate.client({
  scheme: "https",
  host: process.env.WEAVIATE_URL.replace("https://", ""), // Weaviate host থেকে https:// বাদ দাও
});

module.exports = client;
