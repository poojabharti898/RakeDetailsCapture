import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';



const db = DatabaseConnection.getConnection();

const ViewRakeDetails = () => {
  let [loc, setLoc] = useState('Dhamra');
  let [indentNo, setIndentNo] = useState('');
  let [indentDate,setIndentDate] = useState('');

  let [rakeData, setRakeData] = useState({});

  let searchRake = () => {
    console.log(loc);
    console.log(indentNo);
    console.log(indentDate);
    setRakeData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM K where location=? and indent_no=? and indent_date=?',
        [loc,indentNo,indentDate],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setRakeData(results.rows.item(0));
          } else {
            alert('Rake not found !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Rake Filter" />
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
          <Mybutton title="Search Rake" customClick={searchRake} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Location : {rakeData.location}</Text>
            <Text>Indent Number : {rakeData.indent_no}</Text>
            <Text>Indent Date : {rakeData.indent_date}</Text>
            <Text>Train Number : {rakeData.train_no}</Text>
            <Text>Mode : {rakeData.Mode}</Text>
            <Text>GPWIS Number : {rakeData.gpwis_no}</Text>
            <Text>Commodity : {rakeData.Commodity}</Text>
            <Text>Grade : {rakeData.Grade}</Text>            
            <Text>Rake Takeover Date : {rakeData.rake_takeover_date}</Text>
            <Text>Rake Takeover Time : {rakeData.rake_takeover_time}</Text>
            <Text>Rake Handover Date : {rakeData.rake_handover_date}</Text>
            <Text>Rake Handover Time : {rakeData.rake_handover_time}</Text>


          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewRakeDetails;