import axios from "axios";

const API_BASE_URL = '/api';

export async function fetchStyles() {
  try {
    const response = await axios.get(`${API_BASE_URL}/styles`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/styles.json');
    return response.data;
  }
}

export async function fetchStyle(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/styles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const styles = await fetchStyles();
    return styles.find(s => s.id === id);
  }
}