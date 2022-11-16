import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {THEME} from '../../theme';

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.BACKGROUND_800} size={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
