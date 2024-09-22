import React, { useState, useEffect } from 'react';
import { View, Alert, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveData, loadData } from '../utils/storage';
import TodoList from '../components/TodoList';
import { colors , colorList} from '../constants/colors';
import MyInput from '../components/MyInput';

import CustomInputDialog from '../components/CustomInputDialog';

export default function TodoListScreen({ route }) {
  const { listId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [listName, setListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentName, setCurrentName] = useState('');

  const addTask = async () => {
    if (taskName.trim() === '') return;
    const newTask = { name: taskName, id: Date.now().toString(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskName('');
    await saveData(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  const loadTasks = async () => {
    const savedTasks = await loadData(`tasks_${listId}`);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  useEffect(() => {
    loadTasks();
    loadListName();
  }, []);

  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveData(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await saveData(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTask(taskId),
        },
      ]
    );
  };

  const loadListName = async () => {
    const lists = await loadData('lists');
    const savedListName = JSON.parse(lists).find(list => list.id == listId)?.name;
    if (savedListName) setListName(savedListName);
  };

  const handleEdit = (id, name) => {
    setCurrentTaskId(id);
    setCurrentName(name);
    setModalVisible(true);
  };

  const handleSaveEdit = async (newName) => {
    if (newName.trim() === '') return; // Avoid saving empty names

    const updatedLists = tasks.map(task => {
      if (task.id === currentTaskId) {
        return { ...task, name: newName };
      }
      return task;
    });

    setTasks(updatedLists);
    await saveData('tasks', JSON.stringify(updatedLists));
    setModalVisible(false);
    setCurrentTaskId(null);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{listName}</Text>
      <MyInput
        placeholder='New Task'
        value={taskName}
        onChangeText={setTaskName}
        buttonTitle = 'Add Task'
        onPress = {addTask}
      />
      <TodoList 
        tasks={tasks} 
        onToggle={toggleTask} 
        onDelete={handleDeleteTask} 
        onEdit={handleEdit}
      />
      <CustomInputDialog
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEdit}
        initialValue={currentName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.myWhite,
  },
  listTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.myBlack,
    paddingHorizontal: 12
  }
});
