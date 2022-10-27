import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ButtonMenu } from "../../components/buttonMenu";
import { Map } from "../../components/Map";
import { ModalRegister } from "../../components/ModalRegisterHole";
import { FindAll } from "../../services";

export function Home() {
  const [modal, setModal] = useState(false);
  const [locales, setLocales] = useState(null);
  const [newLocale, setNewLocale] = useState(null);

  useEffect(() => {
    FindAll().then((res) => setLocales(res.data));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Map locales={locales} newLocale={newLocale} />
        <ButtonMenu onPressed={() => setModal(!modal)} />
        <ModalRegister
          openChildren={modal}
          openParent={() => setModal(!modal)}
          resLocale={(locale) => setNewLocale(locale)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
