import React, { useContext, useState } from 'react';

import { StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Components/Screens/HomeScreen';
import MapScreen from '../Components/Screens/MapScreen';
import ListScreen from '../Components/Screens/ListScreen';
import ProfileScreen from '../Components/Screens/ProfileScreen';
import DetailsScreen from '../Components/Screens/DetailsScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

const ListsContext = React.createContext()
export const useListContent = () => useContext(ListsContext)
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigate}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

const MapStack = ({navigate}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

const ListStack = ({navigate}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'List' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

const ProfileStack = ({navigate}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [list, setList] = useState([])
  return (
    <NavigationContainer>
    <StatusBar barStyle="dark-content" />
      <ListsContext.Provider value={{
        list,
        setList
      }}>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Map" component={MapStack} />
          <Tab.Screen name="List" component={ListStack} listeners={({ navigation, route }) => ({ })} />
          <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
      </ListsContext.Provider>
    </NavigationContainer>
  );
}

export default App