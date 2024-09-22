import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import { colors , colorList} from '../constants/colors';

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            onToggle={() => onToggle(item.id)}
            onDelete={() => onDelete(item.id)}
            index = {tasks.indexOf(item)}
            onEdit = {() => onEdit(item.id, item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.myWhite
  },
});
