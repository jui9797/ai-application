import axios from "axios";

const API_URL = "http://localhost:5000/api/rag";

export const ingestDocument = (text) => {
  return axios.post(`${API_URL}/ingest`, { text });
};

export const askQuestion = (query) => {
  return axios.post(`${API_URL}/ask`, { query });
};
