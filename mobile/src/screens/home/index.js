import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ButtonMenu } from "../../components/buttonMenu";
import { Map } from "../../components/Map";
import { THEME } from "../../theme";

export function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Map />
      </View>
      <ButtonMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: THEME.COLORS.BACKGROUND_800 },
});
