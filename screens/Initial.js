// import React, { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const Initial = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken');
//         if (token) {
//           // Token exists, navigate to home screen //
//           // navigation.navigate('Rental'); //

//           // await AsyncStorage.removeItem('authToken');
//           // navigation.navigate('Login');

//           const checkCurrentRide = async () => {
//             const rideData = await AsyncStorage.getItem('currentRide');
//             if (rideData) {
//               // await AsyncStorage.removeItem('currentRide');
//               // navigation.navigate('Rental');
//               const { rideId, username, bikeId, loc_pick, time_pick } = JSON.parse(rideData);
//               navigation.navigate('Status', { rideId, username, bikeId, loc_pick, time_pick });
//             }
//             else
//             {
//               navigation.navigate('MyDrawer', { screen: 'Home' });
//             }
//           };
        
//           checkCurrentRide();
//         } else {
//             // console.log(token);
//           // No token, navigate to login screen
//           navigation.navigate('Login');
//         }
//       } catch (error) {
//         console.error('Error checking token', error);
//         navigation.navigate('Login');
//       }
//     };

//     checkToken();
//   }, [navigation]);

//   // useEffect(() => {
//   //   const checkCurrentRide = async () => {
//   //     const rideData = await AsyncStorage.getItem('currentRide');
//   //     if (rideData) {
//   //       const { rideId, username, bikeId, loc_pick, time_pick } = JSON.parse(rideData);
//   //       navigation.navigate('Status', { rideId, username, bikeId, loc_pick, time_pick });
//   //     }
//   //   };
  
//   //   checkCurrentRide();
//   // }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// };

// export default Initial;




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
          // console.log(token);
          // No token, navigate to login screen
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