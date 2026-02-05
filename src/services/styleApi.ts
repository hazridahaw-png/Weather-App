import axios from "axios";
import type { Style } from "../types";

const API_BASE_URL = '/api';

export async function fetchStyles(): Promise<Style[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/styles`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const response = await axios.get('/json/styles.json');
    return response.data;
  }
}

export async function fetchStyle(id: number): Promise<Style | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/styles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API failed, falling back to JSON:', error);
    const styles = await fetchStyles();
    return styles.find(s => s.id === id);
  }
}