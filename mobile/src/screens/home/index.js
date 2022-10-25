import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ButtonMenu } from "../../components/buttonMenu";
import { Map } from "../../components/Map";
import { ModalRegister } from "../../components/ModalRegisterHole";
import { THEME } from "../../theme";

export function Home() {
  const [modal, setModal] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Map />
        <ButtonMenu onPressed={() => setModal(!modal)} />
        <ModalRegister openChildren={modal} openParent={() => setModal(!modal)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
