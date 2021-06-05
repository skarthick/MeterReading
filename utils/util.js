/**
 * Created by sunilkarthicksivabalan on 05/06/21.
 */
import GetLocation from 'react-native-get-location';
import {getDistance, getPreciseDistance} from 'geolib';

export const getcurrentlocation = () =>
  new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        resolve(location);
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        reject(
          Object.assign(new Error(message), {name: 'PositionError', code}),
        );
        console.warn(code, message);
      });
  });

export const getdistance = (currentlocation, meterlocation) => {
  let distance = getDistance(
    {latitude: currentlocation.latitude, longitude: currentlocation.longitude},
    {latitude: meterlocation.latitude, longitude: meterlocation.longitude},
  );
  return distance;
};
