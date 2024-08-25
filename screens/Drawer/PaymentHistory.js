import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {UserContext} from '../../context/UserProvider'; // Adjust the import path as needed
// import { IP } from '@env';
const IPa = process.env.IP;

const PaymentHistoryScreen = () => {
  const {user} = useContext(UserContext);
  const [payments, setPayments] = useState([]);
  const userData = user.user;

  const getPayments = async () => {
    const userId = userData._id;
    try {
      const response = await axios.post(
        `http://${IPa}:3000/api/payment/getPayment`,
        {userId: userId},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments data:', error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {payments.map(payment => (
        <View key={payment._id} style={styles.paymentContainer}>
          <Text style={styles.paymentText}>
            <Text style={styles.span}>Payment ID:</Text> {payment._id}
          </Text>
          <Text style={styles.paymentText}>
            <Text style={styles.span}>Amount:</Text> {payment.payment_amount}
          </Text>
          <Text style={styles.paymentText}>
            <Text style={styles.span}>Date:</Text>{' '}
            {new Date(payment.createdAt).toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFBD0', // Light yellow background
  },
  paymentContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: '#FFFFFF', // White background for payment cards
    backgroundColor: '#ffdd66',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  span: {
    fontWeight: 'bold',
  },
  paymentText: {
    fontSize: 16,
    color: '#333', // Dark gray text
    marginBottom: 7,
  },
});

export default PaymentHistoryScreen;
