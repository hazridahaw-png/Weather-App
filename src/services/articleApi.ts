import axios from "axios";
import type { Article } from "../types";

export async function fetchArticles(): Promise<Article[]> {
  const response = await axios.get("/json/articles.json");
  return response.data;
}