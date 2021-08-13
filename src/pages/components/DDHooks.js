import React,{useState,useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {Picker} from "@react-native-community/picker";

function DDHooks() {
    let [posts,setPosts]=useState([]);
    let [grade,setGrade]=useState('');
    useEffect(()=>
    {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setPosts(response.data)
            })
        .catch(err=>{
            console.log(err)
        })
    },[])
    let myUsers = posts.map((myValue,myIndex)=>{
        console.log('myValue: ' + myValue.name)
        return(
            <Picker.Item label={myValue.name + ' - ' + myValue.username} value={myIndex} key={myIndex}/>
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
        <Picker selectedValue={grade} onValueChange={(value)=>setGrade(value)} >
        {myUsers}
        </Picker>
    </View>
    )
}

export default DDHooks;
