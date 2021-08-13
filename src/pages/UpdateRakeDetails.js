import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';
import DynamicDropdown from './components/DynamicDropdown';


const db = DatabaseConnection.getConnection();

const UpdateRakeDetails = ({ navigation }) => {
  let [loc, setLoc] = useState('Dhamra');
  let [indentNo, setIndentNo] = useState('');
  let [indentDate,setIndentDate] = useState('');

  let [trainNo, setTrainNo] = useState('');
  let [mode,setMode] = useState('Rail');
  let [gpwisNo, setGpwisNo] = useState('');
  
  
  let [commodity,setCommodity] = useState('Imported Coal');
  let [enableGrade,setEnableGrade] = useState(false);
  let [grade,setGrade] = useState('');
  
  let [rakeTakeoverDate,setRakeTakeoverDate]=useState('');
  let [rthours, setRthours] = useState('00');  
  let [rtminutes, setRtminutes] = useState('00'); 
  let [rakeTakeoverTime,setRakeTakeoverTime] = useState('00:00');
  rakeTakeoverTime=`${rthours}:${rtminutes}`;
 let [rttimeFetched,setRTTimeFetched]=useState(false);
 let [rhtimeFetched,setRHTimeFetched]=useState(false);
 let [timeFetched,setTimeFetched]=useState(false);

  let [rakeHandoverDate,setRakeHandoverDate]=useState('');
  let [rhhours, setRhhours] = useState('00');  
  let [rhminutes, setRhminutes] = useState('00'); 
  let [rakeHandoverTime,setRakeHandoverTime] = useState('00:00');
  rakeHandoverTime=`${rhhours}:${rhminutes}`;
  
  
  

  function twoDigit(number) {
    var twodigit = number >= 10 ? number : "0"+number.toString();
    return twodigit;
  }
  

  let updateAllStates = (loca,indentno,indentdate,trainno,mod,gpwisno,comm,grad,raketakeoverdate,raketakeovertime,rakehandoverdate,rakehandovertime) => {
    setLoc(loca);
    setIndentNo(indentno);
    setIndentDate(indentdate);

    setTrainNo(trainno);
    setMode(mod);
    setGpwisNo(gpwisno);

    setCommodity(comm);
    
    setGrade(grad);
    setEnableGrade(true);

    
    setRakeTakeoverDate(raketakeoverdate);


    rthours=parseInt(raketakeovertime.split(":")[0]);
    rtminutes=parseInt(raketakeovertime.split(":")[1]);
    rthours=twoDigit(rthours);
    rtminutes=twoDigit(rtminutes);
    

    setRthours(rthours);
    setRtminutes(rtminutes);
    setTimeFetched(true);
    raketakeovertime=`${rthours}:${rtminutes}`;
    setRakeTakeoverTime(raketakeovertime);



    setRakeHandoverDate(rakehandoverdate);

    
    rhhours=parseInt(rakehandovertime.split(":")[0]);
    rhminutes=parseInt(rakehandovertime.split(":")[1]);
    rhhours=twoDigit(rhhours);
    rhminutes=twoDigit(rhminutes);
    

    setRhhours(rhhours);
    setRhminutes(rhminutes);
    setRHTimeFetched(true);
    rakehandovertime=`${rhhours}:${rhminutes}`;
    setRakeHandoverTime(rakehandovertime);
    
  };
  
  let searchRake = () => {
    console.log(loc);
    console.log(indentNo);
    console.log(indentDate);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM K where location=? and indent_no=? and indent_date=?',
        [loc,indentNo,indentDate],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.location,
              res.indent_no,
              res.indent_date,
              res.train_no,
              res.Mode,
              res.gpwis_no,
              res.Commodity,
              res.Grade,              
              res.rake_takeover_date,
              res.rake_takeover_time,
              res.rake_handover_date,
              res.rake_handover_time
              
            );
          } else {            
            alert('Rake not found!');
            //updateAllStates('', '', '','','','','','','','','','');
          }
        }
      );
    });
  };
  let updateRake = () => {
    console.log(loc,indentNo,indentDate,trainNo,mode,gpwisNo,commodity,grade,rakeTakeoverDate,rakeTakeoverTime,rakeHandoverDate,rakeHandoverTime);

    if (!loc) {
      alert('Please enter the location!');
      return;
    }
    if (!indentNo) {
      alert('Please enter the indent number!');
      return;
    }
    {/**if (!indentDate) {
      alert('Please enter the indent date!');
      return;
    } 
  if (!rakeTakeoverDate) {
      alert('Please enter the rake takeover date!');
      return;
    }
  if (!rakeHandoverDate) {
      alert('Please enter the rake handover date!');
      return;
    }*/}
    
    if (!trainNo) {
      alert('Please enter the train number!');
      return;
    }
    
    if (!gpwisNo && mode=="GPWIS") {
      alert('Please enter the gpwis number!');
      return;
    }
    if (mode!="GPWIS" && gpwisNo!='')
    {
      setGpwisNo('');
      Alert.alert(
        'Alert',
        'GPWIS Number Cleared....Press UPDATE Button Again To Update The Data!!!',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('UpdateRakeDetails'),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (!grade)
    {
      alert('Please enter the grade!');
      return;
    }

    if (!rakeTakeoverTime) {
      alert('Please enter the rake takeover time!');
      return;
    }
    
    if (!rakeHandoverTime) {
      alert('Please enter the rake handover time!');
      return;
    }
    

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE K set train_no=?, Mode=?,gpwis_no=? ,Commodity=?,Grade=?,rake_takeover_date=?,rake_takeover_time=?,rake_handover_date=?, rake_handover_time=? where location=? and indent_no=? and indent_date=?',
        [trainNo,mode, gpwisNo,commodity,grade,rakeTakeoverDate,rakeTakeoverTime,rakeHandoverDate,rakeHandoverTime,loc,indentNo,indentDate],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Rake Details Updated Successfully!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error updating rake details');
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
             {/**<Mytext text="Rake Filter" /> */} 


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
             
              <Mybutton
                title="Search Rake Details"
                customClick={()=>searchRake()}
              />

              <Mytextinput
                placeholder="Enter Train Number"
                value={'' + trainNo}
                style={{ padding: 10 }}
                onChangeText={
                  (trainNo) => setTrainNo(trainNo)
                }
                maxLength={10}
                keyboardType="numeric"
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
                 style={{ height: 50, width: '100%' }}
                 mode="dropdown"                 
                 onValueChange={(selectedValue, itemIndex) => setMode(selectedValue)}>
                   <Picker.Item label="Rail" value="Rail" />
                   <Picker.Item label="Road" value="Road" />
                   <Picker.Item label="GPWIS" value="GPWIS" />
                 </Picker>
              </View>
              
              <Mytextinput
              editable={mode==="GPWIS"}
              selectTextOnFocus={mode==="GPWIS"}
              
                placeholder="Enter GPWIS Number"
                value={'' + gpwisNo}
                onChangeText={
                  (gpwisNo) => setGpwisNo(gpwisNo)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
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
                 placeholder="Enter Commodity"
                 style={{ height: 50, width: '100%' }}
                 mode="dropdown"
                 onValueChange={(selectedValue, itemIndex) => setCommodity(selectedValue)}>
                   <Picker.Item label="Imported Coal" value="Imported Coal" />
                   <Picker.Item label="Flux" value="Flux" />
                </Picker>
              </View>

              <Text style={{marginLeft:35,marginRight:35,marginTop: 10,fontSize:16,color: '#00AD98'}}>Enter Grade:-</Text>            
                <View>
                  {enableGrade && <DynamicDropdown selectedVal={grade} ddfunc={setGrade}/>}</View>
              


              <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
                borderColor: '#00AD98',
                borderWidth: 1,
              }}>
                
                <DatePicker
                   style={{width: 200,marginTop: 20}}  //check here if any mistake
                         
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
                {timeFetched &&
              <TimePicker
               selectedHours={rthours}
               
               //initial Hours value
               selectedMinutes={rtminutes}
               //hourPlaceholder="hh"  //=---------------------------
               //minutePlaceholder="mm" //-------------------------------------
               //format="HH:MM"
               //initial Minutes value
                onChange={(rthours, rtminutes) => {  //if error check here
                  rthours==24?setRthours('00'): setRthours(rthours);
                  rtminutes==60?setRtminutes('00'):setRtminutes(rtminutes);
                  //zeroPadding:true
            
              }}
             />}
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
                {rhtimeFetched &&
              <TimePicker
               selectedHours={rhhours}
               
               //initial Hours value
               selectedMinutes={rhminutes}
               //hourPlaceholder="hh"  //=---------------------------
               //minutePlaceholder="mm" //-------------------------------------
               //format="HH:MM"
               //initial Minutes value
                onChange={(rhhours, rhminutes) => {  //if error check here
                  rhhours==24?setRhhours('00'): setRhhours(rhhours);
                  rhminutes==60?setRhminutes('00'):setRhminutes(rhminutes);
                  //zeroPadding:true
            
              }}
             />}
              </View>

              
              <Mybutton
                title="Update Rake Details"
                customClick={()=>updateRake()}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateRakeDetails;