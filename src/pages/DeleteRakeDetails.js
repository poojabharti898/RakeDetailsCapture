import React, { useState } from 'react';
import { View, Alert, SafeAreaView,Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';

const db = DatabaseConnection.getConnection();

const DeleteRakeDetails = ({ navigation }) => {
  let [loc,setLoc] = useState('Dhamra');
  let [indentNo, setIndentNo] = useState('');
  let [indentDate,setIndentDate] = useState('');

  let deleteRake = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  K where location=? and indent_no=? and indent_date=?',
        [loc,indentNo,indentDate],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Rake Details Deleted Successfully !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please enter a valid location, indent number and indent date!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Location:-</Text>
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
                <Picker
                 selectedValue={loc}
                 //selectedValue={selectedValue}
                 style={{ height: 50, width: '100%'}}
                 mode="dropdown"
                 //enabled={false}
                 onValueChange={(selectedValue, itemIndex) => {setLoc(selectedValue)}}
                 >
                   <Picker.Item label="Dhamra" value="Dhamra" ></Picker.Item>
                   <Picker.Item label="Haldia" value="Haldia" ></Picker.Item>
                   <Picker.Item label="Paradip" value="Paradip"></Picker.Item>              
                 </Picker>
                 </View>  

                 <Mytextinput
                placeholder="Enter Indent Number"
                onChangeText={
                  (indentNo) => setIndentNo(indentNo)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />


           <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1
              }}>
                
                <DatePicker
                   //style={width= 200,marginTop= 20}   //check here if any mistake
                         
                date={indentDate} //initial date from state
                
                mode="date" //The enum of date, datetime and time
                placeholder="Select Indent Date"
                
                format="DD-MM-YYYY"
                minDate="01-01-2000"
                maxDate="01-01-2050"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{width: '100%'}}
                customStyles={{
                    dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 8,
                        top: 4,
                        marginLeft: 0,
                },
               dateInput: {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
                  flex: 1,
                  borderWidth: 0,
                
                  
                },
                dateText: {
                  fontSize: 16,
                  color: 'black'
              },
              placeholderText: {
                fontSize: 16,
                color: '#00AD98'
            }
               }}
               onDateChange={(indentDate) => {
                setIndentDate(indentDate);          //if error then check here also
             }}
            />
              </View>

          <Mybutton title="Delete Rake Details" customClick={deleteRake} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteRakeDetails;