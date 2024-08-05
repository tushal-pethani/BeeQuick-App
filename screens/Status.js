import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import imagePath from '../src/constants/imagePath';
import {locationPermission, getCurrentLoc} from '../helper/helperFunction';
import Geolocation from 'react-native-geolocation-service';
import {useRoute} from '@react-navigation/native';
import {IP} from '@env';
import {ScrollView} from 'react-native-gesture-handler';

const StatusPage = ({route, navigation}) => {
  const {rideId, username, bikeId, loc_pick, time_pick, token} = route.params;

  const [locDrop, setLocDrop] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [nameOfUser, setNameOfUser] = useState('');
  const [realBikeId, setRealBikeId] = useState('');
  const mapRef = useRef();

  // Separate state variables for curLoc and dropoffCoords
  const [curLoc, setCurLoc] = useState({
    latitude: 23.17533585988,
    longitude: 80.02260292768577,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const [dropoffCoords, setDropoffCoords] = useState({
    latitude: 23.17624126932023,
    longitude: 80.01965358099041,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLiveLocation = async () => {
    const locPermissionGranted = await locationPermission();
    if (locPermissionGranted) {
      const {latitude, longitude} = await getCurrentLoc();
      setCurLoc({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }
  };

  useEffect(() => {
    handleRidedata();
  }, []);

  const handleRidedata = async () => {
    try {
      const locRes = await axios.post(
        `http://${IP}:3000/api/locations/pickuplocid`,
        {loc_pick},
      );
      const loc = locRes.data;
      const userRes = await axios.post(
        `http://${IP}:3000/api/userid/get-username`,
        {username},
      );
      const user = userRes.data;
      const bikeRes = await axios.post(
        `http://${IP}:3000/api/bicycles/get-bikeid`,
        {bikeId},
      );
      const bike = bikeRes.data;

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

  const handleInputChange = async text => {
    setLocDrop(text);

    if (text.length > 0) {
      try {
        const response = await axios.post(
          `http://${IP}:3000/api/locations/search`,
          {
            query: text,
          },
        );
        setLocationSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSelectLocation = async () => {
    try {
      const locationResponse = await axios.post(
        `http://${IP}:3000/api/locations/locid`,
        {loc_id: locDrop},
      );
      const location = locationResponse.data;

      if (!location) {
        console.error('Location not found.');
        return;
      }

      setDropoffCoords({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        });
      }
    } catch (error) {
      if (error.response) {
        console.error(
          `Server Error: ${error.response.status} - ${error.response.data.message}`,
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  const getDistance = (loc1, loc2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // Distance in meters
    return d;
  };

  const handleEndRide = async () => {
    const distance = getDistance(curLoc, dropoffCoords);
    if (distance > 10) {
      Alert.alert('Warning', 'You are not in the 10m zone');
      return;
    }

    try {
      const locationResponse = await axios.post(
        `http://${IP}:3000/api/locations/locid`,
        {loc_id: locDrop},
      );
      const location = locationResponse.data;

      if (!location) {
        console.error('Invalid location ID.');
        return;
      }
      // const response = await axios.put(
      //   `http://${IP}:3000/api/rides/end',
      //   {
      //     rideId,
      //     loc_drop: location._id,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );

      // const rideData = response.data;

      // navigation.navigate('Summary', {rideData, token});
      const response = await axios.put(
        `http://${IP}:3000/api/rides/end`,
        {rideId, loc_drop: location._id},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const rideData = response.data;

      await AsyncStorage.removeItem('currentRide');

      navigation.navigate('Summary', {rideData, token});
    } catch (error) {
      console.error('Error ending ride:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={curLoc}
        region={curLoc} // Update the map with current location changes
      >
        <Marker coordinate={curLoc} image={imagePath.icCurLoc} />
        <Marker coordinate={dropoffCoords} image={imagePath.icGreenMarker} />
      </MapView>

      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.label}>Ride Details</Text>
        <Text style={styles.text}>Username: {nameOfUser}</Text>
        <Text style={styles.text}>Bike ID: {realBikeId}</Text>
        <Text style={styles.text}>Pickup Location: {pickUpLocation}</Text>
        <Text style={styles.text}>
          Pickup Time: {new Date(time_pick).toLocaleString()}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Drop-off Location"
          placeholderTextColor="#999"
          value={locDrop}
          onChangeText={handleInputChange}
        />

        {locationSuggestions.length > 0 && (
          <FlatList
            data={locationSuggestions}
            keyExtractor={item => item.loc_id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setLocDrop(item.loc_id);
                  setLocationSuggestions([]);
                }}>
                <View>
                  <Text style={styles.suggestionText}>{item.loc_name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
            nestedScrollEnabled={true}
          />
        )}
        <TouchableOpacity onPress={handleSelectLocation} style={styles.button}>
          <Text style={styles.buttonText}>SELECT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEndRide} style={styles.button}>
          <Text style={styles.buttonText}>END RIDE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '60%',
    backgroundColor: '#ffdd66',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffdd66',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    // backgroundColor: '#f8e90b',
    backgroundColor: '#424242', // black with shade 700
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionList: {
    width: '100%',
    maxHeight: 150,
    backgroundColor: '#FFFBD0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  suggestionText: {
    padding: 10,
    color: '#888',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#424242',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF9900',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  //   color: '#333',
  // },
  // suggestionList: {
  //   maxHeight: 100,
  // },
  // suggestionText: {
  //   paddingVertical: 5,
  //   color: '#333',
  // },
});

export default StatusPage;
