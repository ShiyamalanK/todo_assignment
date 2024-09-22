import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors , colorList} from '../constants/colors';


const colorKeys = Object.keys(colorList);
const colorArray = colorKeys.map(key => colorList[key]);
export default function MyListItem(props) {
  return (
    <View style={[styles.MyListItemContainer, {backgroundColor: getBackgroundColor(props.index)}]}>
        <TouchableOpacity
            style = {styles.MyListItem}
            onPress = {props.onPress}
            onLongPress={props.onEdit}
        >
            <Text style={styles.MyListItemText}>
                {props.title.length > 50 ? `${props.title.substring(0,48)}...` : props.title}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
           onPress={props.onDelete}>
            <Icon name="delete" size={24} color={colors.myWhite} />
        </TouchableOpacity>
    </View>
  )
}

const getBackgroundColor = (index) => {
    return colorArray[index % colorArray.length];
  };

const styles = StyleSheet.create({
    MyListItemContainer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      minHeight: 100,
      backgroundColor: colors.myBlue,
      borderRadius: 10,
      paddingHorizontal: 25,
      marginVertical: 5
    },
    MyListItem:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'left',
        width: '70%',
        marginVertical: 5,        
    },
    MyListItemText:{
        fontSize: 16,
        color: colors.myWhite,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: colors.myRed, // Adjust color as needed
        borderRadius: 20,
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      deleteButtonText: {
        color: colors.myWhite,
        fontWeight: 'bold',
      },
})