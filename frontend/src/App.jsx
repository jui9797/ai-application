import { useState } from "react";
import { ingestDocument, askQuestion } from "./api";

function App() {
  const [docText, setDocText] = useState("");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleIngest = async () => {
    try {
      await ingestDocument(docText);
      alert("Document ingested successfully");
      setDocText("");
    } catch (err) {
      alert("Failed to ingest document");
    }
  };

  const handleAsk = async () => {
    try {
      const res = await askQuestion(query);
      setAnswer(res.data.answer);
    } catch (err) {
      alert("Failed to get answer");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>RAG App (Using JSX)🔥</h1>
      <textarea
        placeholder="Enter document text"
        value={docText}
        onChange={(e) => setDocText(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />
      <button onClick={handleIngest} style={{ marginTop: 10 }}>
        Ingest Document
      </button>

      <hr style={{ margin: "20px 0" }} />

      <input
        type="text"
        placeholder="Ask a question"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <button
        onClick={handleAsk}
        style={{
          marginTop: 10,
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: 5,
        }}
      >
        Ask
      </button>

      {answer && (
        <div style={{ marginTop: 20, padding: 10, backgroundColor: "#eee" }}>
          <strong>Answer:</strong> <br />
          {answer}
        </div>
      )}
    </div>
  );
}

export default App;
