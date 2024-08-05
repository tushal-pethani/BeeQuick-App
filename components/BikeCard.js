import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const BikeCard = ({ bike, onBook }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.bikeId}>Bike ID: {bike.bikeId}</Text>
      {/* <Button style={styles.bookButton} title="Book" onPress={onBook} /> */}
      <TouchableOpacity style={styles.bookButton} onPress={onBook}>
        <Text style={styles.buttonText}>book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#f8f9fa',
    backgroundColor: '#FFFBD0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 2,
    width: Dimensions.get('window').width - 40, // Full width with margin
  },
  bikeId: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 3, // Take 3/4th of the space
    // color: '#333',
    color: '#424242',
  },
  bookButton: {
    flex: 1, // Take 1/4th of the space
    backgroundColor: '#424242',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BikeCard;
