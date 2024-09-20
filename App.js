// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <SafeAreaView 
      style={styles.safeAreaContainer}>
        <StatusBar
          barStyle = 'light-content'
          backgroundColor='#033'
        />
      <TodoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex: 1,
    paddingVertical: 1,
    backgroundColor: '#033'    ,
  },  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
