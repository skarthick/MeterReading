/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
 * Created by sunilkarthicksivabalan on 05/06/21.
 */

import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import _ from 'lodash';
import {getcurrentlocation, getdistance} from '../utils/util';
import {
  getMeterDeatails,
  getLatestMeterValues,
  saveMeterValue,
} from '../db/database';

const Datacapture = props => {
  const getcurrentLocation = async () => {
    const coord = await getcurrentlocation();
    console.log('Coord', coord);
    const meter = getMeterDeatails(props.route.params.meterId);
    console.log('meter', meter);
    const dist = getdistance(coord, meter);
    if (dist > 10) {
      //   alert('You are not nearer to the meter');
    }
  };
  getcurrentLocation();

  const [meterReading, setMeterReading] = useState('0');
  const [consumption, setconsumption] = useState('0');
  const [previousReading, setpreviousReading] = useState('0');

  //   useEffect(() => {
  //     const lastmetervalue = getLatestMeterValues();
  //   }, []);

  useEffect(() => {
    const lastmetervalue = getLatestMeterValues(props.route.params.meterId);
    // if (meterReading > lastmetervalue.reading) {
    setconsumption(meterReading - lastmetervalue.reading);
    // }
    setpreviousReading(lastmetervalue.reading);
  }, []);

  const validateReading = () => {
    const lastmetervalue = getLatestMeterValues(props.route.params.meterId);
    if (meterReading < lastmetervalue.reading) {
      setMeterReading('0');
      alert('Invalid Meter Reading');
    }
  };

  const handlePress = () => {
    if (consumption < 1) {
      alert('Invalid Meter Reading');
      return;
    }
    let object = {
      meterid: props.route.params.meterId,
      readingdate: new Date().getTime(),
      reading: _.toNumber(meterReading),
      unit: consumption,
    };
    const {navigation, route} = props;
    // navigation.goBack(null);
    navigation.navigate('Dashboard', {reload: true});
    // route.params.reload = true;
    // navigation.navigate('Dashboard');
    saveMeterValue(object);
  };

  const handleMeterReading = text => {
    setMeterReading(text);
    const lastmetervalue = getLatestMeterValues(props.route.params.meterId);
    // if (meterReading > lastmetervalue.reading) {
    setconsumption(text - lastmetervalue.reading);
    // }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Text> Previous Reading : {previousReading}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{width: 150, height: 40}}>Current Reading</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            height: 40,
            width: 150,
            borderColor: 'black',
            borderWidth: 1.0,
            paddingLeft: 5,
          }}
          placeholder="Meter Reading"
          onChangeText={text => handleMeterReading(text)}
          onBlur={() => validateReading()}
          defaultValue={meterReading}
        />
      </View>
      <View>
        <Text> Consumption Units : {consumption}</Text>
      </View>
      <View>
        <Button onPress={handlePress} title="Submit" />
      </View>
    </View>
  );
};

export default Datacapture;
