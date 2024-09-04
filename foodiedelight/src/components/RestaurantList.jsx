import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurants, setStatus, setError, deleteRestaurant } from '../store/restaurantSlice';
import { fetchRestaurants, deleteRestaurantById } from '../services/api';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RestaurantList = () => {
  const { restaurants, status, error } = useSelector(state => state.restaurants);
  const dispatch = useDispatch();
console.log(restaurants)
  useEffect(() => {
    const loadRestaurants = async () => {
      dispatch(setStatus('loading'));
      try {
        const data = await fetchRestaurants();
        dispatch(setRestaurants(data));
        dispatch(setStatus('succeeded'));
      } catch (err) {
        dispatch(setError(err.toString()));
        dispatch(setStatus('failed'));
      }
    };

    loadRestaurants();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteRestaurantById(id);
      dispatch(deleteRestaurant(id));
    } catch (error) {
      console.error('Failed to delete the restaurant:', error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Restaurants</h1>  
      <List>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <ListItemText primary={restaurant.name} secondary={restaurant.location} />
            <Link to={`/edit/${restaurant.id}`}>
              <EditIcon />
            </Link>
            <IconButton onClick={() => handleDelete(restaurant.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Link to='/add'>
      <Button variant="contained" >
        Add Restaurant
      </Button>
      </Link>
    </div>
  );
};

export default RestaurantList;
