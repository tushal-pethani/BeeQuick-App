import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import emailjs, {EmailJSResponseStatus} from '@emailjs/react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const ContactUs = ({route}) => {
  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const onSubmit = async () => {
    if (!username || !query) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await emailjs.send(
        'service_3j3cn0c',
        'template_rkkeihu',
        {from_name: username, to_name: 'Bee-Quick', message: query},
        {
          publicKey: 'WVwwFIVpRJQsdJGeS',
        },
      );
      setUsername('');
      setQuery('');
      console.log('SUCCESS!');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', err);
        return;
      }

      console.log('ERROR', err);
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contact Us</Text>
      </View>
      {/* <View style={styles.innerContainer}> */}
      {/* <View style={styles.inputBox}> */}
      <View style={{alignSelf: 'center', width: '90%', marginLeft: 'auto'}}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#888"
        />
      </View>
      {/* </View> */}
      {/* <View style={styles.inputBox}> */}
      <View style={{alignSelf: 'center', width: '90%', marginLeft: 'auto'}}>
        <Text style={styles.label}>Query</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={query}
          onChangeText={setQuery}
          placeholder="Enter your query"
          placeholderTextColor="#888"
          multiline
        />
      </View>
      {/* </View> */}
      {/* </View> */}
      <View style={{alignSelf: 'center', width: '90%'}}>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// const styles = StyleSheet.create({
//   inputBox: {
//     alignSelf: 'center',
//   },
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#FFFBD0',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#fff',
//     textShadowColor: '#000',
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 5,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#fff',
//   },
//   input: {
//     width: 350,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     color: 'black',
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   button: {
//     width: 350,
//     alignSelf: 'center',
//     backgroundColor: '#FF5722',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//     transform: [{scale: 1}],
//     transition: 'transform 0.2s',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#ffdd66', // lighter shade of #ffcc31
  },
  titleContainer: {
    alignItems: 'center', // Center the title horizontally
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
    // color: '#333',
    color: '#424242', // same black color used for button
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    // color: '#333',
    color: '#424242', // same black color used for button
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    marginTop: 30,
    // backgroundColor: '#4CAF50',
    backgroundColor: '#424242', // black with shade 700
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactUs;
