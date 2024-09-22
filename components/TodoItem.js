import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, Switch} from 'react-native';
import { colors , colorList, listColors} from '../constants/colors';
// import { CheckBox } from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colorKeys = Object.keys(listColors);
const colorArray = colorKeys.map(key => listColors[key]);
export default function TodoItem({ task, onToggle, onDelete, index, onEdit }) {
  return (
    <View 
      style={[styles.container, {backgroundColor: getBackgroundColor(index)}]}    
    >
      <Switch
        value={task.completed}
        onValueChange={onToggle}
        trackColor={{false: colors.myTrackColor, true: colors.myTrackColor}}
        thumbColor={colors.mySwitchThumbColor}
      />
      <TouchableOpacity
        onLongPress={onEdit}
        onPress={onToggle}
        style={styles.textBtn}
      >
        <Text
          style={[styles.text, task.completed && styles.completed]}
          >
            {task.name.length > 50 ? `${task.name.substring(0,48)}...` : task.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        {/* <Text style={styles.delete}>DELETE</Text> */}
        <Icon name="delete" size={24} color={colors.myWhite} />
      </TouchableOpacity>
    </View>
  );
}

const getBackgroundColor = (index) => {
  return colorArray[index % colorArray.length];
};

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    height:80,
    marginVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.myWhite
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.5
  },
  delete: {
    color: 'red',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  textBtn:{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
});
