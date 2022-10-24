import React from "react";
import { StyleSheet, View } from "react-native";
import { MAPBOX_TOKEN } from "@env";
// import MapboxGL from "@rnmapbox/maps";

// MapboxGL.StyleURL.Street;
// MapboxGL.setAccessToken(MAPBOX_TOKEN);

export const Map = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>{/* <MapboxGL.MapView style={styles.map} styleURL={Street} /> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
