import axios from 'axios';

const API_URL = 'http://localhost:5001/api';
const COCKTAIL_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const loginUser = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await api.post('/users', { name, email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Product APIs
export const getLiquors = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching liquors:', error);
    return [];
  }
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

// Order APIs
export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getDashboardSummary = async () => {
  const response = await api.get('/orders/summary');
  return response.data;
};

// Cocktail DB APIs (for supplementary data)
export const getCocktailsByLiquor = async (liquorName) => {
  try {
    const response = await axios.get(`${COCKTAIL_BASE_URL}/filter.php?i=${liquorName}`);
    return response.data.drinks;
  } catch (error) {
    console.error(`Error fetching cocktails for ${liquorName}:`, error);
    return [];
  }
};

export const getLiquorImageUrl = (liquorName) => {
  return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(liquorName)}.png`;
};

export default api;

