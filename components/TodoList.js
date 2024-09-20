import React, { useState } from 'react';
import { View, TextInput,Text, TouchableOpacity,  ScrollView, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import TabViewComp from './TabView';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      // backgroundColor: '#f2f2f2',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 15,
      marginHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      padding: 10,
      color: '#333',
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold'
    },
    tabContainer:{
      flex: 1,
      padding: 10,
    }
  });
  

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true },
    { id: 2, text: 'Meeting at School', completed: false },
  ]);
  const [text, setText] = useState('');
  // Function to Add Task
  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }
  const CustomTabContent1 = () => (
    <View style={styles.tabContainer}>
      <ScrollView>

      {tasks.filter(task => task.completed != true).map( task =>
        <TodoItem 
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      )}
      </ScrollView>
    </View>
  );
  
  const CustomTabContent2 = () => (
    <View style={styles.tabContainer}>
      <ScrollView>
        {tasks.filter(task => task.completed == true).map( task =>
        <TodoItem 
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      )}
      </ScrollView>
    </View>
  );
  // Render TodoList Component
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <TabViewComp 
        tabTitles={['Tasks', 'Completed']}
        tabContent={[CustomTabContent1, CustomTabContent2]}
      />
      {/* <ScrollView>
      {tasks.map(task => (
        <TodoItem
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        toggleCompleted={toggleCompleted}
        />
      ))}
      </ScrollView> */}
    </View>
  
  );
}