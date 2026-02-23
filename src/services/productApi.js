import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/products.json');
    return response.data;
  }
}

export async function fetchProduct(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/products.json');
    const products = response.data;
    return products.find((p) => p.id === id);
  }
}