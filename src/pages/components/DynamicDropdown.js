import React,{Component} from "react";
import {View,Text,AsyncStorage} from "react-native";
import {Picker} from "@react-native-community/picker";
//import { AsyncStorage } from '@react-native-async-storage/async-storage';


class DynamicDropdown extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            userValues:[],
            selectedValue:''
            }
    }
    
       displayData=async()=>{
       let collection=await AsyncStorage.getItem("users")
        this.setState({
            userValues:JSON.parse(collection)
            })}
        GetFakeData = async() => {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
           console.log(json)
            AsyncStorage.setItem("users",JSON.stringify(json))
            this.setState({
            userValues:json
            
            })
            }).catch(err=>{this.displayData()}
               // alert("catch block")
               
               )
            }
            
            
            componentDidMount() {
                try {
                    this.setState({selectedValue:this.props.selectedVal})
                } catch (error) {
                    console.log("error");
                }
                //console.log("In Component did mount",this.props);
                this.GetFakeData()
                }
         render() {
        let myUsers = this.state.userValues.map((myValue,myIndex)=>{
            //console.log('myValue: ' + myValue.name)
            return(
                <Picker.Item label={myValue.name + ' - ' + myValue.username} value={myValue.name} key={myIndex}></Picker.Item>
            )
            });
    return (
        <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
        <Picker mode="dropdown" selectedValue={this.state.selectedValue} onValueChange={(value)=>{this.setState({selectedValue:value},()=>this.props.ddfunc(this.state.selectedValue))}} >
        {myUsers}
        </Picker>
    </View>    
    )
    }
    }
export default DynamicDropdown;