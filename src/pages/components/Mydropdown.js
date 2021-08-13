import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
const Mydropdown=(props)=>{
    return (
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
            borderColor: '#00AD98',
            borderWidth: 1,
          }}>
        <Picker>
          value={props.value}
          style={props.style}
          onValueChange={props.onValueChange}
          style={{ height: 50, width: 150 }}  
          mode="dropdown" 
          
        </Picker>

        </View>
    )}

export default Mydropdown;