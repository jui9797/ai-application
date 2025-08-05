const weaviate = require("weaviate-ts-client").default;

const client = weaviate.client({
  scheme: "https",
  host: process.env.WEAVIATE_URL.replace("https://", ""),
  apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY), // ✅ add this line
});

module.exports = client;
