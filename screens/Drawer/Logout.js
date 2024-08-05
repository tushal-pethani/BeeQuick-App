import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = async () => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
  });

  await AsyncStorage.removeItem('user');

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
