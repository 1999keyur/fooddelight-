import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurants: [],
  status: 'idle',
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      state.restaurants.push(action.payload);
    },
    updateRestaurant: (state, action) => {
      const index = state.restaurants.findIndex(restaurant => restaurant.id === action.payload.id);
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload);
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  setRestaurants,
  setStatus,
  setError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
