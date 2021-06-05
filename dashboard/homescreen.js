/* eslint-disable react-native/no-inline-styles */
/**
 * Created by sunilkarthicksivabalan on 05/06/21.
 */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text, Button, FlatList} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';

import {getAllMeters, getMeterValues} from '../db/database';
var selectedid = 0;
const Homescreen = ({navigation, route}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [meterdata, setMeterData] = useState([]);

  async function loadmeterdata() {
    var temp = [];
    let results = getAllMeters();

    for (const data in results) {
      console.log('******', data);
      temp.push({
        id: results[data].meterid,
        value: results[data].metername,
      });
    }
    console.log('******', temp);
    setMeterData(temp);
  }
  useEffect(() => {
    loadmeterdata();
  }, []);

  useEffect(() => {
    loadmeterlistdata();
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  let listItemView = item => {
    return (
      <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
        <Text>Id: {item.meterid}</Text>
        <Text>
          ReadingDate:
          {moment(Date(item.readingdate)).format('MM/DD/YYYY hh:MM')}
        </Text>
        <Text>Reading Units: {item.reading}</Text>
      </View>
    );
  };

  async function loadmeterlistdata() {
    let results = getMeterValues(selectedid);
    console.log('______', results);
    setFlatListItems(results);
  }
  const selectedItem = (value, index, data) => {
    selectedid = data[index].id;
    loadmeterlistdata();
    console.log('++++++++', value);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'column'}}>
        <Dropdown
          label="Available Meters"
          data={meterdata}
          onChangeText={(value, index, data) =>
            selectedItem(value, index, data)
          }
        />
        <Button
          title="Capture Reading"
          onPress={() =>
            navigation.navigate('Data Capture', {meterId: selectedid})
          }
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </View>
    </View>
  );
};

export default Homescreen;
