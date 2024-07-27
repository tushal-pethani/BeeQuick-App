import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const StatusPage = ({ route, navigation }) => {
//   const route = useRoute();
  const { rideId, username, bikeId, loc_pick, time_pick } = route.params;
  // console.log(time_pick);
  const [locDrop, setLocDrop] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [nameOfUser, setNameOfUser] = useState('');
  const [realBikeId, setRealBikeId] = useState('');

  const handleRidedata = async () => {
    try {
      const locRes = await axios.post('http://192.168.1.4:3000/api/locations/pickuplocid', { loc_pick });
      const loc = locRes.data;
      const userRes = await axios.post('http://192.168.1.4:3000/api/userid/get-username', { username });
      const user = userRes.data;
      const bikeRes = await axios.post('http://192.168.1.4:3000/api/bicycles/get-bikeid', { bikeId });
      const bike = bikeRes.data;

      // console.log(loc);

      if (!loc) {
        console.error('Invalid location ID.');
        return;
      }

      if (!user) {
        console.error('Invalid user ID.');
        return;
      }

      if (!bike) {
        console.error('Invalid bike ID.');
        return;
      }

      setPickUpLocation(loc.loc_name);
      setNameOfUser(user.username);
      setRealBikeId(bike.bikeId);
      
    } catch (error) {
      console.error('Error getting rideData:', error);
    }
  };

  const handleEndRide = async () => {
    try {
      const locationResponse = await axios.post('http://192.168.1.4:3000/api/locations/locid', { loc_id: locDrop });
      const location = locationResponse.data;

      if (!location) {
        console.error('Invalid location ID.');
        return;
      }

      const response = await axios.put('http://192.168.1.4:3000/api/rides/end', {
        rideId,
        loc_drop: location._id,
      });

      const rideData = response.data;

      navigation.navigate('Summary', rideData); // Or another relevant page
      
    } catch (error) {
      console.error('Error ending ride:', error);
    }
  };

  handleRidedata();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ride Details</Text>
      <Text style={styles.text}>Username: {nameOfUser}</Text>
      <Text style={styles.text}>Bike ID: {realBikeId}</Text>
      <Text style={styles.text}>Pickup Location: {pickUpLocation}</Text>
      <Text style={styles.text}>Pickup Time: {new Date(time_pick).toLocaleString()}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Drop-off Location"
        placeholderTextColor='#999'
        value={locDrop}
        onChangeText={setLocDrop}
      />
      <Button title="End Ride" onPress={handleEndRide} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  text: {
    color: '#333',
    marginBottom: 10,
  },
});

export default StatusPage;