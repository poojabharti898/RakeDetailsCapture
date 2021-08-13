import React, { useState,useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,TextInput
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';
import DynamicDropdown from './components/DynamicDropdown';
import NetInfo from '@react-native-community/netinfo';



import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterRakeDetails = ({ navigation }) => {
  let [loc,setLoc] = useState('Dhamra');
  let [indentNo, setIndentNo] = useState('');
  let [indentDate,setIndentDate] = useState('');
  
  let [trainNo, setTrainNo] = useState('');
  let [mode, setMode] = useState('Rail');
  let [gpwisNo, setGpwisNo] = useState('');
  
  let [commodity,setCommodity] = useState('Imported Coal');
 
  let [rakeTakeoverDate,setRakeTakeoverDate] = useState('');
  let [rthours, setRthours] = useState('00');
  let [rtminutes, setRtminutes] = useState('00');
  var rakeTakeoverTime=`${rthours}:${rtminutes}`;

  let [rakeHandoverDate,setRakeHandoverDate] = useState('');
  let [rhhours, setRhhours] = useState('00');
  let [rhminutes, setRhminutes] = useState('00');
  var rakeHandoverTime=`${rhhours}:${rhminutes}`;
  let [grade,setGrade]=useState('');
  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      state.isConnected && state.isInternetReachable?alert('Internet Connected...push data on server'):register_rake();
    });
  };

 
                 
  let register_rake = () => {
    console.log("hiii");
    console.log(loc,indentNo,indentDate,trainNo,mode, gpwisNo, commodity,grade,rakeTakeoverDate,rakeTakeoverTime,rakeHandoverDate,rakeHandoverTime);
    if (!loc) {
      alert('Please fill in the location!');
      return;
    }
    if (!indentNo) {
      alert('Please fill in the indent number!');
      return;
    }
    {/*if (!indentDate) {
      alert('Please fill in the indent date!');
    return;
  }
   if (!rakeTakeoverDate) {
    alert('Please fill in the rake takeover date!');
     return;
   }
   if (!rakeHandoverDate) {
    alert('Please fill in the rake handover date!');
    return;
   }*/}
    if (!trainNo) {
      alert('Please fill in the train number!');
      return;
    }
    if (!gpwisNo && mode=="GPWIS") {
      alert('Please fill in the gpwis number!');
      return;
    }
    if (mode!="GPWIS" && gpwisNo!='')
    {
      setGpwisNo('');
      Alert.alert(
        'Alert',
        'GPWIS Number Cleared....Press POST Button Again To Save The Data!!!',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('RegisterRakeDetails'),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    
    if (!commodity) {
      alert('Please fill in the commodity!');
      return;
    }
   if (!grade)
   {
    alert('Please fill in the grade!');
    return;
   }
    
   
    
    if (!rakeTakeoverTime) {
      alert('Please fill in the rake takeover time!');
      return;
    }
    
    
    if (!rakeHandoverTime) {
      alert('Please fill in the rake handover time!');
      return;
    }
    //Alert.alert(valueDD);
    console.log(grade);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO K (location,indent_no,indent_date,train_no,Mode,gpwis_no,Commodity,Grade,rake_takeover_date,rake_takeover_time,rake_handover_date,rake_handover_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [loc,indentNo,indentDate,trainNo,mode, gpwisNo,commodity,grade.toString(),rakeTakeoverDate,rakeTakeoverTime,rakeHandoverDate,rakeHandoverTime],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Rake Details Successfully Registered Locally!!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error trying to register the Rake !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>


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



              <Mytextinput
                placeholder="Enter Train Number"
                onChangeText={
                  (trainNo) => setTrainNo(trainNo)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
                
              />
              
              
              
              <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Mode:-</Text>
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
                <Picker
                 selectedValue={mode}
                 //selectedValue={selectedValue}
                 style={{ height: 50, width: '100%'}}
                 mode="dropdown"
                 //enabled={false}
                 onValueChange={(selectedValue, itemIndex) => {setMode(selectedValue)}}
                 >
                   <Picker.Item label="Rail" value="Rail" ></Picker.Item>
                   <Picker.Item label="Road" value="Road" ></Picker.Item>
                   <Picker.Item label="GPWIS" value="GPWIS"></Picker.Item>              
                 </Picker>
                 </View>  


                <Mytextinput
                 editable={mode==="GPWIS"}
                 selectTextOnFocus={mode==="GPWIS"}
                 placeholder="Enter GPWIS Number"
                 onChangeText={
                 (gpwisNo) => setGpwisNo(gpwisNo)
                 }
                 maxLength={10}
                 keyboardType="numeric"
                 style={{ padding: 10 }}
                />
                
               
            
                <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Commodity:-</Text>
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
                
            <Picker   
                 selectedValue={commodity}
                 style={{ height: 50, width: '100%'}}
                 //placeholder="Enter Commodity"
                 mode="dropdown"
                 onValueChange={(selectedValue, itemIndex) => {setCommodity(selectedValue)}}>
                   <Picker.Item label="Imported Coal" value="Imported Coal" />
                   <Picker.Item label="Flux" value="Flux" />
                   
                 </Picker>
              </View>


              <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Grade:-</Text>            
              <View><DynamicDropdown selectedVal={grade} ddfunc={setGrade}/></View>
                

              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
                
                <DatePicker
                   style={{width: 200,marginTop: 20}}   //check here if any mistake
                         
                date={rakeTakeoverDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Select Rake Takeover Date"
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
               onDateChange={(rakeTakeoverDate) => {
                setRakeTakeoverDate(rakeTakeoverDate);          //if error then check here also
             }}
            />
              </View>


              <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Rake Takeover Time:-</Text>
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
              <TimePicker
               selectedHours={rthours}
               //initial Hours value
               selectedMinutes={rtminutes}

               //initial Minutes value
                onChange={(rthours, rtminutes) => {  //if error check here
                  rthours==24?setRthours('00'): setRthours(rthours);
                  rtminutes==60?setRtminutes('00'):setRtminutes(rtminutes);
            
              }}
             />
              </View>

            
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
                
              }}>
                
                <DatePicker
                   style={{width: 200,marginTop: 20}}  
                         
                date={rakeHandoverDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Select Rake Handover Date"
              
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
               onDateChange={(rakeHandoverDate) => {
                setRakeHandoverDate(rakeHandoverDate);          
             }}
            />
              </View>
              <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Rake Handover Time:-</Text>
              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
              <TimePicker
               selectedHours={rhhours}
               //initial Hours value
               selectedMinutes={rhminutes}

               //initial Minutes value
                onChange={(rhhours, rhminutes) => {  //if error check here
                  rhhours==24?setRhhours('00'): setRhhours(rhhours);
                  rhminutes==60?setRhminutes('00'):setRhminutes(rhminutes);
            
              }}
             />
              </View>


  
              <Mybutton title="POST" customClick={()=>getNetInfo()} />
             {/** <Mybutton title="POST" customClick={()=>register_rake()} />*/} 
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterRakeDetails;