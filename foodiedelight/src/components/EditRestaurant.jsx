import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRestaurantDetails } from '../services/api';
import { updateRestaurant } from '../store/restaurantSlice';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Enter restaurant name').required('Name is required'),
  description: yup.string('Enter description').required('Description is required'),
  location: yup.string('Enter location').required('Location is required'),
});

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurant = useSelector(state =>
    state.restaurants.restaurants.find(r => r.id === parseInt(id))
  );
// console.log(restaurant)
//   useEffect(() => {
//     if (!restaurant) {
//       navigate(to='/');
//     }
//   }, [restaurant]);
console.log(restaurant)
  const formik = useFormik({
    initialValues: {
      name: restaurant?.name || '',
      description: restaurant?.description || '',
      location: restaurant?.location || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedRestaurant = await updateRestaurantDetails({ ...restaurant, ...values });
        dispatch(updateRestaurant(updatedRestaurant));
        navigate(to='/');
      } catch (error) {
        console.error('Failed to update restaurant:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        margin="normal"
      />
      <TextField
        fullWidth
        id="location"
        name="location"
        label="Location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
        margin="normal"
      />
      <Button color="primary" variant="contained" type="submit">
        Update Restaurant
      </Button>
    </form>
  );
};

export default EditRestaurant;
