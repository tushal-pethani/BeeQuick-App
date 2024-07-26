import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { styles } from '../styles/styles';
import BikeCard from '../components/BikeCard';
import { useAuth } from '../context/AuthContext';

const Rental = ({ navigation }) => {
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);

  const formik = useFormik({
    initialValues: {
      loc_avail: '',
    },
    validationSchema: Yup.object({
      loc_avail: Yup.string().required('Location is required.'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          'http://192.168.1.4:3000/api/bicycles/available',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup Location"
          onChangeText={formik.handleChange('loc_avail')}
          onBlur={formik.handleBlur('loc_avail')}
          value={formik.values.loc_avail}
        />
        {formik.errors.loc_avail && <Text style={styles.errorText}>{formik.errors.loc_avail}</Text>}
        {formik.errors.submit && <Text style={styles.errorText}>{formik.errors.submit}</Text>}
        <Button
          title="Search Bikes"
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting}
        />
      </View>

      <FlatList
        data={bikes}
        keyExtractor={item => item.bikeId}
        renderItem={({ item }) => (
          <BikeCard bike={item} onBook={() => navigation.navigate('Status', { bikeId: item.bikeId })} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Rental;
