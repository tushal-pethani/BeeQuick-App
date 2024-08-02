import React, {useEffect, useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../context/UserProvider';
const Initial = () => {
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem('user'));
        const token = userData.token;
        if (token) {
          const checkCurrentRide = async () => {
            const rideData = JSON.parse(
              await AsyncStorage.getItem('currentRide'),
            );
            if (rideData) {
              const {_id, username, bikeId, loc_pick, time_pick} = rideData;
              console.log(rideData);

              setUser(userData);
              navigation.navigate('Status', {
                rideId: _id,
                username,
                bikeId,
                loc_pick,
                time_pick,
              });
            } else {
              setUser(userData);
              navigation.navigate('MyDrawer');
            }
          };

          checkCurrentRide();
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        navigation.navigate('Login');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Initial;
