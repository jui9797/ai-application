const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/api/rag/ingest", (req, res) => {
  const { text } = req.body;
  console.log("Ingesting document:", text);

  res.json({ success: true });
});

app.post("/api/rag/ask", (req, res) => {
  const { query } = req.body;
  console.log("Answering question:", query);
  res.json({ answer: `You asked: "${query}", but I am not trained yet.` });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
