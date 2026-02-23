import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchArticles() {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/articles.json');
    return response.data;
  }
}

export async function fetchArticle(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/articles.json');
    const articles = response.data;
    return articles.find((a) => a.id === parseInt(id));
  }
}