import axios from 'axios';

export const API_URL = 'http://localhost:5000'; // Update to use JSON Server

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${API_URL}/restaurants`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewRestaurant = async (restaurant) => {
  try {
    const response = await axios.post(`${API_URL}/restaurants`, restaurant);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRestaurantDetails = async (restaurant) => {
  try {
    const response = await axios.put(`${API_URL}/restaurants/${restaurant.id}`, restaurant);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRestaurantById = async (id) => {
  try {
    await axios.delete(`${API_URL}/restaurants/${id}`);
  } catch (error) {
    throw error;
  }
};
