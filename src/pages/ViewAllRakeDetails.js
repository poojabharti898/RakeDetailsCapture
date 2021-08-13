import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllRakeDetails = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM K',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            //console.log(results.rows.item(i));
            temp.push(results.rows.item(i));
            //console.log(temp);
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.rake_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
          
        <Text style={styles.textheader}>Location</Text>
        <Text style={styles.textbottom}>{item.location}</Text>

        <Text style={styles.textheader}>Indent Number</Text>
        <Text style={styles.textbottom}>{item.indent_no}</Text>

        <Text style={styles.textheader}>Indent Date</Text>
        <Text style={styles.textbottom}>{item.indent_date}</Text>

        <Text style={styles.textheader}>Train Number</Text>
        <Text style={styles.textbottom}>{item.train_no}</Text>

        <Text style={styles.textheader}>Mode</Text>
        <Text style={styles.textbottom}>{item.Mode}</Text>

        <Text style={styles.textheader}>GPWIS Number</Text>
        <Text style={styles.textbottom}>{item.gpwis_no}</Text>

        <Text style={styles.textheader}>Commodity</Text>
        <Text style={styles.textbottom}>{item.Commodity}</Text>

        <Text style={styles.textheader}>Grade</Text>
        <Text style={styles.textbottom}>{item.Grade}</Text>

        <Text style={styles.textheader}>Rake Takeover Date</Text>
        <Text style={styles.textbottom}>{item.rake_takeover_date}</Text>

        <Text style={styles.textheader}>Rake Takeover Time</Text>
        <Text style={styles.textbottom}>{item.rake_takeover_time}</Text>

        <Text style={styles.textheader}>Rake Handover Date</Text>
        <Text style={styles.textbottom}>{item.rake_handover_date}</Text>

        <Text style={styles.textheader}>Rake Handover Time</Text>
        <Text style={styles.textbottom}>{item.rake_handover_time}</Text>


      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllRakeDetails;