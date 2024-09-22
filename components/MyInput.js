import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors , colorList} from '../constants/colors';


export default function MyInput(props) {
  return (
    <View>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder= {props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
          />
          <TouchableOpacity
          onPress={props.onPress} 
          style={styles.addBtn} >
            <Text style={styles.buttonText}>{props.buttonTitle}</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        gap: 10,
        marginVertical: 15
      },
      input: {
        height: 50,
        flex: 1,
        // width: 280,
        borderColor: colors.myBlack,
        borderWidth: 1,
        // marginBottom: 10,
        paddingHorizontal: 12,
        borderRadius: 5
      },
      addBtn:{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        height: 50,
        backgroundColor: colors.myBlue,
        padding: 14,
        borderRadius: 5,
        borderColor: colors.myBlack
      },
      buttonText:{
        color: colors.myWhite,
        fontWeight: 'bold'
      },
})