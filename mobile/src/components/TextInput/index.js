/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Eye, EyeClosed } from 'phosphor-react-native';
import { THEME } from '@themes';

export function Input(props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.PlaceHolder}
        secureTextEntry={props.IsPassword && !isVisible}
        onChangeText={props.OnChangeText}
      />
      {props.IsPassword === true && (
        !isVisible ?
          <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(!isVisible)}>
            <Eye size={25} weight="regular" color={THEME.COLORS.CAPTION_400} />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(!isVisible)}>
            <EyeClosed size={25} weight="regular" color={THEME.COLORS.CAPTION_400} />
          </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: THEME.COLORS.CAPTION_400,
    backgroundColor: THEME.COLORS.BACKGROUND_200,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    color: THEME.COLORS.TEXT_BLACK,
  },
  icon: {
    right: 20,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});
