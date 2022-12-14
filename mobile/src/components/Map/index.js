/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions} from 'react-native';
import {MapPin} from '../svg/index';

export const Map = props => {
  const defaultRegion = {
    latitude: -23.5810435,
    longitude: -46.5218548,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };
  const [locale, setLocale] = useState(defaultRegion);
  const [newHole, setNewHole] = useState(false);

  useEffect(() => {
    if (props.newLocale) {
      setLocale({
        latitude: Number(props.newLocale.lat),
        longitude: Number(props.newLocale.lng),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      setNewHole(true);
    }
  }, [props.newLocale]);

  useEffect(() => {
    setNewHole(false);
    setLocale(defaultRegion);
  }, [props.resetMap]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} key={props.newLocale} region={locale}>
        {props.locales?.map((item, index) => {
          return (
            <Marker
              key={index + 1}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}>
              <MapPin stroke={'#000'} fill={'#ff3232'} />
            </Marker>
          );
        })}
        {newHole && (
          <Marker
            coordinate={{
              latitude: Number(locale.latitude),
              longitude: Number(locale.longitude),
            }}>
            <MapPin stroke={'#000'} fill={'#3aff32'} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
  },
});
