import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Plus} from 'phosphor-react-native';
import {THEME} from '@themes';

export function ButtonMenu(props) {
  const [buttonColor, setButtonColor] = useState(THEME.COLORS.BACKGROUND_700);
  const [isOpen, setIsOpen] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const xRoll = useRef(new Animated.Value(0)).current;

  function HandleClick() {
    if (!isOpen) {
      setIsOpen(true);
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(xRoll, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setButtonColor(THEME.COLORS.BACKGROUND_900);
    }
    if (isOpen) {
      setIsOpen(false);
      Animated.timing(fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(xRoll, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setButtonColor(THEME.COLORS.BACKGROUND_700);
    }
  }

  const interpolateRotating = xRoll.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{opacity: fade}}>
        <View style={styles.containerItems}>
          <TouchableOpacity onPress={() => props.onPressed()}>
            <Text style={styles.items}>Registrar buraco</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonColor}]}
        onPressIn={() => HandleClick()}>
        <Animated.View style={animatedStyle}>
          <Plus color={THEME.COLORS.PRIMARY} size={32} weight={'bold'} />
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 20,
    marginBottom: 20,
  },
  containerItems: {
    width: 250,
    height: 60,
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND_700,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  items: {
    fontSize: THEME.FONT_SIZE.MD,
    textAlignVertical: 'center',
    paddingLeft: 10,
    color: THEME.COLORS.PRIMARY,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    marginRight: 6,
    marginBottom: 5,
    bottom: 0,
    right: 0,
  },
});
