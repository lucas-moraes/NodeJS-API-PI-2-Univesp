import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ButtonMenu } from '@components/ButtonMenu';
import { Map } from '@components/Map';
import { ModalRegister } from '@components/ModalRegisterHole';
import { FindAll } from '@services';

export default function Home() {
  const [modal, setModal] = useState(false);
  const [locales, setLocales] = useState(null);
  const [newLocale, setNewLocale] = useState(null);
  const [resetMap, setResetMap] = useState(true);

  function ResetMap() {
    setNewLocale(null);
    FindAll().then(res => setLocales(res.data));
  }

  useEffect(() => {
    ResetMap();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Map locales={locales} newLocale={newLocale} resetMap={resetMap} />
      <ButtonMenu onPressed={() => setModal(!modal)} />
      <ModalRegister
        openChildren={modal}
        openParent={() => setModal(!modal)}
        resLocale={locale => setNewLocale(locale)}
        resetMap={() => {
          ResetMap();
          setResetMap(!resetMap);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  position: 'relative',
});
