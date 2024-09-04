import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addNewRestaurant } from '../services/api';
import { addRestaurant } from '../store/restaurantSlice';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string('Enter restaurant name').required('Name is required'),
  description: yup.string('Enter description').required('Description is required'),
  location: yup.string('Enter location').required('Location is required'),
});

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newRestaurant = await addNewRestaurant(values);
        dispatch(addRestaurant(newRestaurant));
        resetForm();
        navigate('/')
      } catch (error) {
        console.error('Failed to add restaurant:', error);
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
        Add Restaurant
      </Button>
    </form>
  );
};

export default AddRestaurant;
