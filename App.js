import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, StatusBar, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import TodoListScreen from './screens/TodoListScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import { loadData, saveData, getAllKeys } from './utils/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from './constants/colors';

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    const setInitialData = async () => {
      console.log('isLoggedIn:', isLoggedIn);
      if (isLoggedIn === null) {
        // If no value exists, set it to false
        await saveData('isLoggedIn', JSON.stringify(false));
      }
    };

    setInitialData();
  }, []);

  // Add your navigation logic here
  const getInitialRoute = async() => {
    const isLoggedIn = await loadData('isLoggedIn');
    if(isLoggedIn) {
      return 'Home';
    }
    return 'Login';
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.myBgColor}/>
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{headerShown: false}}/>
        <Stack.Screen
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'To-do List', // Set the title of the header
            headerStyle: {
              backgroundColor: colors.myBgColor, // Change header background color
            },
            headerTintColor: colors.myWhite, // Change header text color
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Icon.Button 
                  name='help' 
                  backgroundColor="transparent" 
                  color="#fff" 
                  onPress={() => Alert.alert('Help','Add List to catergorise your tasks.\nTap on list to navigate inside.\nLong Press on list to edit.')}/>
                <Icon.Button
                  name="logout" // Replace with your desired icon
                  backgroundColor="transparent"
                  color="#fff" // Icon color
                  onPress={async () => {
                    await saveData('isLoggedIn', JSON.stringify(false));
                    navigation.navigate('Login');
                    // Add your button's action here
                    console.log('Settings pressed');
                  }}
                  />
              </View>
            ),
          })}/>
        <Stack.Screen 
          name="TodoList" 
          component={TodoListScreen} 
          options={({ navigation }) => ({
            title: 'Tasks', // Set the title of the header
            headerStyle: {
              backgroundColor: colors.myBgColor, // Change header background color
            },
            headerTintColor: colors.myWhite, // Change header text color
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
