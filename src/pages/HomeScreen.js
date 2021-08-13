import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='K'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS K', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS K(location varchar(20),indent_no INT(10),indent_date varchar(20), train_no INT(10), Mode varchar(20),gpwis_no INT(10),Commodity varchar(20),Grade varchar(20),rake_takeover_date varchar(20),rake_takeover_time varchar(20),rake_handover_date varchar(20),rake_handover_time varchar(20),primary key(location,indent_no,indent_date))',
              []
            );
          }
        }
      );
    });
  }, []);
  
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Register Rake Details"
              btnColor='#2992C4'
              btnIcon="train"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Update Rake Details"
              btnColor='#A45BB9'
              btnIcon="edit"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="View Rake Details"
              btnColor='#F9AD29'
              btnIcon="eye"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="View All Rake Details"
              btnColor='#384F62'
              btnIcon="search-plus"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Delete Rake Details"
              btnColor='#D1503A'
              btnIcon="trash"
              customClick={() => navigation.navigate('Delete')}
            />
            <MyImageButton
              title="Sync Rake Details"
              btnColor='#3AD156'
              btnIcon="upload"
              customClick={() => navigation.navigate('Sync')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;