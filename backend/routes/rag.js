const express = require("express");
const router = express.Router();
const client = require("../weaviateClient");
const axios = require("axios");

router.get("/", (req, res) => {
  res.send("Hello Server");
});

router.post("/ingest", async (req, res) => {
  const { text } = req.body;

  try {
    const schemaRes = await client.schema.getter().do();
    const classes = schemaRes.classes || [];

    if (!classes.find((c) => c.class === "Document")) {
      await client.schema
        .classCreator()
        .withClass({
          class: "Document",
          vectorizer: "text2vec-openai",
          properties: [{ name: "content", dataType: ["text"] }],
        })
        .do();
    }

    await client.data
      .creator()
      .withClassName("Document")
      .withProperties({ content: text })
      .do();

    res.json({ message: "Document ingested successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/ask", async (req, res) => {
  const { query } = req.body;

  try {
    const result = await client.graphql
      .get()
      .withClassName("Document")
      .withFields("content _additional {certainty}")
      .withNearText({ concepts: [query], certainty: 0.7 })
      .withLimit(1)
      .do();

    const topDoc = result.data.Get.Document[0]?.content || "";

    const prompt = `Context: ${topDoc}\n\nQuestion: ${query}\nAnswer:`;

    const hfResponse = await axios.post(
      process.env.HUGGINGFACE_API,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        },
      }
    );

    const answer = hfResponse.data[0]?.generated_text || "No answer found";
    console.log("Answer from rag.js", answer);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
