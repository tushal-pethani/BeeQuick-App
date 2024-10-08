import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {UserContext} from '../context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {IP} from '@env';
const IPa = process.env.IP;
const Login = ({navigation}) => {
  const {setUser} = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Email or Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        // const response = await axios.post(
        //   'http://192.168.29.20:3000/api/auth/login',
        //   values,
        // );
        const response = await axios.post(
          `http://${IPa}:3000/api/auth/login`,
          values,
        );
        const {token} = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        // console.log(response.data);
        Alert.alert('Success', 'Login successful!');
        setUser(response.data);
        navigation.navigate('MyDrawer', {
          screen: 'Rental',
        });
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          console.error('Error Response:', error.response.data);
        } else if (error.request) {
          console.error('Error Request:', error.request);
        } else {
          console.error('Error Message:', error.message);
        }
        Alert.alert('Error', error.response?.data?.message || 'Login failed');
      }
    },
  });
  //
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#999"
        value={formik.values.login}
        onChangeText={formik.handleChange('login')}
        onBlur={formik.handleBlur('login')}
      />
      {formik.touched.login && formik.errors.login ? (
        <Text style={styles.error}>{formik.errors.login}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.error}>{formik.errors.password}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>
          Don't have an account? <Text style={styles.span}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#ffdd66', // lighter shade of #ffcc31
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    // color: '#333',
    color: '#424242', // same black color used for button
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
    // backgroundColor: '#4CAF50',
    backgroundColor: '#424242', // black with shade 700
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    // color: '#333',
    color: '#424242', // same black color used for button
  },
  span: {
    color: 'blue',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

// const Login = ({ navigation }) => {
//   const formik = useFormik({
//     initialValues: {
//       login: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       login: Yup.string().required('Email or Username is required'),
//       password: Yup.string().required('Password is required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post('http://192.168.29.20:3000/api/auth/login', values);
//         console.log('Response:', response.data);
//         Alert.alert('Success', 'Login successful!');
//         navigation.navigate('Rental');
//       } catch (error) {
//         console.log('Error:', error);
//         console.log('Error Response:', error.response);
//         Alert.alert('Error', error.response?.data?.message || 'Login failed');
//       }
//     },

//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email or Username"
//         placeholderTextColor="#999"
//         value={formik.values.login}
//         onChangeText={formik.handleChange('login')}
//         onBlur={formik.handleBlur('login')}
//       />
//       {formik.touched.login && formik.errors.login ? (
//         <Text style={styles.error}>{formik.errors.login}</Text>
//       ) : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={formik.values.password}
//         onChangeText={formik.handleChange('password')}
//         onBlur={formik.handleBlur('password')}
//       />
//       {formik.touched.password && formik.errors.password ? (
//         <Text style={styles.error}>{formik.errors.password}</Text>
//       ) : null}
//       <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.switchText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 40,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     color: '#333',
//   },
//   button: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#4CAF50',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   switchText: {
//     marginTop: 20,
//     color: '#333',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 12,
//   },
// });

// export default Login;
