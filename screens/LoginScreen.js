import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons for eye icons
import { saveData, loadData } from '../utils/storage';

import { colors } from '../constants/colors';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [storedUsername, setStoredUsername] = useState();
  const [storedPassword, setStoredPassword] = useState();

  const fetchStoredData = async () => {
    const storedUsername = await loadData('username');
    const storedPassword = await loadData('password');
    setStoredUsername(storedUsername);
    setStoredPassword(storedPassword);
  };

  // Fetch stored data on component mount
  useEffect(() => {
    fetchStoredData();
  }, []);

  useEffect(() => {
    console.log('storedUsername:', storedUsername);
    console.log('storedPassword:', storedPassword);
    if(storedUsername === null || storedPassword === null) {
      navigation.navigate('SignUp');
    }
  }, [storedUsername, storedPassword]);
    
  const handleLogin = async() => {
    // Temp user data
    if (username.trim() === storedUsername && password.trim() === storedPassword) {
      Alert.alert('Login Successful', 'You have logged in successfully.');
      await saveData('isLoggedIn', JSON.stringify(true));
      navigation.navigate('Home'); // Replace with actual screen name if available
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }

    setPassword('');
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subText}>Stay on top of your tasks effortlessly</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color= {colors.myBlue} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.myWhite,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.myBlue,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: colors.myBlue,
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
  },
});

export default LoginScreen;
