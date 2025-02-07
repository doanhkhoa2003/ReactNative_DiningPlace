

import Login from './components/Login';
import Home from './components/Home';
import FoodDetail from './components/FoodDetail';
import Cart from './components/Cart';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './components/Register';
import { Icon } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='FoodDetail' component={FoodDetail}/>
      
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={StackNavigator} options={{tabBarIcon: () => <Icon source="home-account" size={30} />}} />
      <Tab.Screen name='Account' component={Login} options={{tabBarIcon: () => <Icon source="login" size={30} />}} />
      <Tab.Screen name='Register' component={Register} options={{tabBarIcon: () => <Icon source="account-plus" size={30} />}} />
      <Tab.Screen name='Cart' component={Cart} options={{tabBarIcon: () => <Icon source="cart-outline" size={30} />}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

