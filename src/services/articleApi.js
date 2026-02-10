import axios from "axios";

export async function fetchArticles() {
  const response = await axios.get("/json/articles.json");
  return response.data;
}