import React from 'react';
import { View, Text, Button, Switch, TouchableOpacity, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 5,
      backgroundColor: '#044',
      borderRadius: 8,
      borderWidth: 0.3,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      maxHeight: 75
    },
    checkboxContainer: {
      marginRight: 10,
    },
    todoItemText: {
      flex: 1,
      fontSize: 16,
      color: '#eee',
    },
    completed: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
    deleteButton: {
      backgroundColor: '#f55',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      width: 70,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold'
    },
  });
  

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
    return (
        <View style={styles.todoItem}>
        <View style={styles.checkboxContainer}>
          <Switch 
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
          />
        </View>
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>
          {task.text}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(task.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }