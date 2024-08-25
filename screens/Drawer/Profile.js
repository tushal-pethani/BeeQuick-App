import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
// import { IP } from '@env';
const IPa = process.env.IP;

const ProfileScreen = () => {
  const {user} = useContext(UserContext);
  const [rides, setRides] = useState([]);
  const userData = user.user;
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await axios.post(
        `http://${IPa}:3000/api/auth/getBalance`,
        {user_id: userData._id},
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const getRides = async () => {
    const userId = userData._id;
    try {
      const response = await axios.post(
        `http://${IPa}:3000/api/rides/user/id`,
        {id: userId},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides data:', error);
    }
  };

  useEffect(() => {
    getRides();
    fetchBalance();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchBalance();
    }, []),
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./bgimage.jpg')}
        style={styles.mainImage}>
        <View style={styles.profileContainer}>
          <Image
            source={require('./profile-modified.png')}
            style={styles.profilePic}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.description}>Rider</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>
          {rides.length}
          {'\n'}Past Rides
        </Text>
        <Text style={styles.stat}>
          {balance}₹{'\n'}Balance
        </Text>
      </View>
      <View style={styles.bottomline}></View>
      <ScrollView style={styles.ride}>
        {rides.map(ride => (
          <View key={ride._id} style={styles.rideContainer}>
            <Text style={styles.rideText}>
              <Text style={styles.span}>Ride ID:</Text> {ride._id}
            </Text>
            <Text style={styles.rideText}>
              <Text style={styles.span}>Charges:</Text> {ride.amount}
            </Text>
            <Text style={styles.rideText}>
              <Text style={styles.span}>Pickup Time:</Text>{' '}
              {new Date(ride.time_pick).toLocaleString()}
            </Text>
            <Text style={styles.rideText}>
              <Text style={styles.span}>Drop Time:</Text>{' '}
              {new Date(ride.time_drop).toLocaleString()}
            </Text>
            <Text style={styles.rideText}>
              <Text style={styles.span}>Bike No:</Text> {ride.bikeId.bikeId}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFBD0',
    backgroundColor: '#ffdd66',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    color: '#000',
  },
  profileContainer: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 30,
    marginLeft: 20,
    borderWidth: 5,

    borderColor: '#FFFBD0',
  },
  bottomline: {
    backgroundColor: '#FFFBD0',
    paddingTop: 10,
  },
  rideContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: '#FF6F61',
    backgroundColor: '#ffdd66',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileDetails: {
    color: 'white',
    marginTop: -35,
    marginRight: '35%',
  },
  mainImage: {
    width: 'full',
    height: 200,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    marginLeft: 120,
  },
  stat: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  ride: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#fff',
    backgroundColor: '#FFFBD0',
  },
  rideText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 7,
  },
  span: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

// import React, {useContext, useState, useEffect, useCallback} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import {UserContext} from '../../context/UserProvider';
// import axios from 'axios';
// import {useFocusEffect} from '@react-navigation/native';

// const ProfileScreen = () => {
//   const {user} = useContext(UserContext);
//   const [rides, setRides] = useState([]);
//   const userData = user.user;
// const [balance, setBalance] = useState(0);
// const fetchBalance = async () => {
//   try {
//     const response = await axios.post(
//       `http://${IP}:3000/api/auth/getBalance',
//       {user_id: userData._id},
//     );
//     setBalance(response.data.balance);
//   } catch (error) {
//     console.error('Error fetching balance:', error);
//   }
// };
//   const getRides = async () => {
//     const userId = userData._id;
//     try {
//       const response = await axios.post(
//        `http://${IP}:3000/api/rides/user/id,
//         {id: userId},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       setRides(response.data);
//     } catch (error) {
//       console.error('Error fetching rides data:', error);
//     }
//   };

//   useEffect(() => {
//     getRides();
//   }, []);
// useFocusEffect(
//   useCallback(() => {
//     fetchBalance();
//   }, []),
// );
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('./bgimage.jpg')}
//         style={styles.mainImage}>
//         <View style={styles.profileContainer}>
//           <Image
//             source={require('./profile-modified.png')}
//             style={styles.profilePic}
//           />
//           <View style={styles.profileDetails}>
//             <Text style={styles.username}>{userData.username}</Text>
//             <Text style={styles.description}>Rider</Text>
//           </View>
//         </View>
//       </ImageBackground>
//       <View style={styles.statsContainer}>
//         <Text style={styles.stat}>
//           {rides.length}
//           {'\n'}Past Rides
//         </Text>
//         <Text style={styles.stat}>
//           {balance}₹{'\n'}Balance
//         </Text>
//       </View>
//       <ScrollView style={styles.ride}>
//         {rides.map(ride => (
//           <View key={ride._id} style={styles.rideContainer}>
//             <Text style={styles.rideText}>Ride ID: {ride._id}</Text>
//             <Text style={styles.rideText}>Charges: {ride.amount}</Text>
//             <Text style={styles.rideText}>Pickup Time: {ride.time_pick}</Text>
//             <Text style={styles.rideText}>Drop Time: {ride.time_drop}</Text>
//             <Text style={styles.rideText}>Bike No: {ride.bikeId.bikeId}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFBD0',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 16,
//     color: '#000',
//   },
//   profileContainer: {
//     marginTop: 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//     justifyContent: 'space-between',
//   },
//   profilePic: {
//     width: 130,
//     height: 130,
//     borderRadius: 100,
//     marginTop: 30,
//     marginLeft: 20,
//     borderWidth: 5,

//     borderColor: '#FFFBD0',
//   },
//   rideContainer: {
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: '#FF6F61',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   profileDetails: {
//     color: 'white',
//     marginTop: -35,
//     marginRight: '35%',
//   },
//   mainImage: {
//     width: 'full',
//     height: 200,
//   },
//   username: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   description: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginVertical: 15,
//     marginLeft: 120,
//   },
//   stat: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#000',
//   },
//   ride: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   rideText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default ProfileScreen;
