import '../gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PaymentHistory from '../screens/PaymentHistory';
import Profile from '../screens/Profile';
import Rental from '../screens/Rental';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerContent} from './DrawerContent';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
    // drawerContent={props => <DrawerContent {...props} />}
    // screenOptions={{
    //   headerShown: false,
    //   headerStyle: {
    //     backgroundColor: '#f4511e',
    //   },
    //   cardStyle: {backgroundColor: 'white'},
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // }}
    >
      <Drawer.Screen
        name="Rental"
        component={Rental}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Payment history" component={PaymentHistory} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
