import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BikeCard from '../components/BikeCard';
import { useAuth } from '../context/AuthContext';
import CookieManager from '@react-native-cookies/cookies';

const Rental = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch the token from cookies
    CookieManager.get('http://192.168.1.4:3000')
      .then((cookies) => {
        if (cookies.token) {
          setToken(cookies.token.value);
        }
      })
      .catch((error) => {
        console.error('Error fetching token from cookies:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      loc_id: '',
    },
    validationSchema: Yup.object({
      loc_id: Yup.string().required('Location is required.'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!token) {
        setErrors({ submit: 'No token available. Please login again.' });
        setSubmitting(false);
        return;
      }

      try {
        const response = await axios.post(
          'http://192.168.1.4:3000/api/bicycles/available',
          values
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        setBikes(response.data);
      } catch (error) {
        console.error(error);
        setErrors({ submit: 'An error occurred while fetching bikes.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rental Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pickup Location"
        placeholderTextColor="#999"
        value={formik.values.loc_id}
        onChangeText={formik.handleChange('loc_id')}
        onBlur={formik.handleBlur('loc_id')}
      />
      {formik.touched.loc_id && formik.errors.loc_id ? (
        <Text style={styles.error}>{formik.errors.loc_id}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit} disabled={formik.isSubmitting}>
        <Text style={styles.buttonText}>Search Bikes</Text>
      </TouchableOpacity>
      {formik.errors.submit && <Text style={styles.error}>{formik.errors.submit}</Text>}

      {bikes.length === 0 ? (
        <Text style={styles.noBikesText}>No Bicycles available right now</Text>
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={item => item.bikeId.toString()}
          renderItem={({ item }) => (
            <BikeCard bike={item} onBook={() => navigation.navigate('Status', { bikeId: item.bikeId })} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  noBikesText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Rental;
