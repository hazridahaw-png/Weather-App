import axios from "axios";
import type { Product } from "../types";

const API_BASE_URL = '/api';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/products.json');
    return response.data;
  }
}

export async function fetchProduct(id: number): Promise<Product | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/products.json');
    const products: Product[] = response.data;
    return products.find((p) => p.id === id);
  }
}