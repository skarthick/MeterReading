/**
 * Created by sunilkarthicksivabalan on 05/06/21.
 */

import SyncStorage from 'sync-storage';
import _ from 'lodash';

const version = SyncStorage.get('version');
if (!version) {
  SyncStorage.set('version', '0.0.1');
  //meterid INTEGER PRIMARY KEY, metername text, serialnumber text not null, installationdate timestamp default (strftime('%s', 'now')), outofservice timestamp )",
  const meters = {
    1: {
      meterid: 1,
      metername: 'test-1',
      serialnumber: '1',
      installationdate: 1622908766000,
      outofservice: 1630837766000,
      latitude: 11.020528,
      longitude: 76.952464,
    },
    2: {
      meterid: 2,
      metername: 'test-2',
      serialnumber: '2',
      installationdate: 1622908766000,
      outofservice: 1630837766000,
      latitude: 11.020528,
      longitude: 76.952464,
    },
  };
  SyncStorage.set('meters', meters);

  //id INTEGER PRIMARY KEY autoincrement, meterid INTEGER, readingdate timestamp default (strftime('%s', 'now')),
  //reading INTEGER, units INTEGER
  const metervalues = {
    1: [
      {
        meterid: 1,
        readingdate: 1622608766000,
        reading: 100,
        unit: 100,
      },
      {
        meterid: 1,
        readingdate: 1622708776000,
        reading: 200,
        unit: 100,
      },
      {
        meterid: 1,
        readingdate: 1622808786000,
        reading: 350,
        unit: 150,
      },
    ],
    2: [
      {
        meterid: 2,
        readingdate: 1622908766000,
        reading: 100,
        unit: 100,
      },
      {
        meterid: 2,
        readingdate: 1623008776000,
        reading: 200,
        unit: 100,
      },
      {
        meterid: 2,
        readingdate: 1623108786000,
        reading: 350,
        unit: 150,
      },
    ],
  };
  SyncStorage.set('metervalues', metervalues);
}

export const getAllMeters = () => {
  const meters = SyncStorage.get('meters');
  return meters;
};

export const getMeterValues = meterid => {
  const metervalues = SyncStorage.get('metervalues');
  let values = [];
  if (metervalues[meterid]) {
    values = _.orderBy(metervalues[meterid], ['reading'], ['desc']);
  }
  console.log('&&&&&&', values);
  return values;
};

export const getLatestMeterValues = meterid => {
  const metervalues = SyncStorage.get('metervalues');
  let values = [];
  if (metervalues[meterid]) {
    values = _.orderBy(metervalues[meterid], ['reading'], ['desc']);
  }
  return values[0];
};

export const saveMeterValue = obj => {
  let metervalues = SyncStorage.get('metervalues');
  let tarr = metervalues[obj.meterid];
  tarr.push(obj);
  metervalues[obj.meterid] = tarr;
  SyncStorage.set('metervalues', metervalues);
};

export const getMeterDeatails = meterid => {
  const meters = SyncStorage.get('meters');
  return meters[meterid];
};

/*
import SQLite from 'react-native-sqlite-storage';
// var db = openDatabase({name: 'MeterDatabase.db'});

var DatabaseName = 'MeterDatabase.db';
var DatabaseVersion = '0.0.1';
var DatabaseDisplayname = 'SQLite Meter Database';
var DatabaseSize = 200000;

// export const conn = SQLite.openDatabase(
//   DatabaseName,
//   DatabaseVersion,
//   DatabaseDisplayname,
//   DatabaseSize,
//   loadAndQueryDB,
//   errorconnection,
// );
// const errorconnection = err => {
//   console.log('error in DBConnection', err);
// };

export var Db = null;

export const loadAndQueryDB = () =>
  // Database Connection
  new Promise((resolve, reject) => {
    // Database Connection
    SQLite.enablePromise(true);
    SQLite.openDatabase(
      DatabaseName,
      DatabaseVersion,
      DatabaseDisplayname,
      DatabaseSize,
    ).then(DB => {
      Db = DB;

      Db.executeSql('VACUUM');
      Db.executeSql('CREATE TABLE IF NOT EXISTS meterversion (version text)');
      Db.executeSql(
        "CREATE TABLE IF NOT EXISTS meter (meterid INTEGER PRIMARY KEY, metername text, serialnumber text not null, installationdate timestamp default (strftime('%s', 'now')), outofservice timestamp )",
      );
      Db.executeSql(
        "CREATE TABLE IF NOT EXISTS meterreading (id INTEGER PRIMARY KEY autoincrement, meterid INTEGER, readingdate timestamp default (strftime('%s', 'now')), reading INTEGER, units INTEGER )",
      );
      //   loadtestdata();
      // Check whether install or upgrade or initialize
      Db.executeSql('SELECT max(version) as version from meterversion').then(
        ([results]) => {
          let version = results.rows.item(0).version;
          if (version == null) {
            Db.executeSql(
              'insert into meterversion (version) values ("' +
                DatabaseVersion +
                '"',
            );
            // loaddummydata();
            // loadtestdata();
          } else if (DatabaseVersion !== version) {
            //Update if you want to change any DB Scheme
          }
        },
      );
    });
  });

const loaddummydata = () => {
  Db.executeSql(
    'insert into meter (meterid, metername, serialnumber) values ("1","Test1","1")',
  );
  Db.executeSql(
    'insert into meter (meterid, metername, serialnumber) values ("2","Test2","2")',
  );
};

const loadtestdata = () => {
  Db.executeSql(
    'insert into meterreading (meterid, reading, units) values ("2",100,100)',
  );

  Db.executeSql(
    'insert into meterreading (meterid, reading, units) values ("2",200,100)',
  );
  Db.executeSql(
    'insert into meterreading (meterid, reading, units) values ("2",350,150)',
  );
};

loadAndQueryDB();
*/
