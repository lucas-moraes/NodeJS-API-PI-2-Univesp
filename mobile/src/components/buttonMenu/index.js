import React, { useState, useRef } from "react";
import { StyleSheet, Animated, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Plus } from "phosphor-react-native";
import { THEME } from "../../theme";

export function ButtonMenu() {
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

      setButtonColor(THEME.COLORS.BACKGROUND_800);
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
    outputRange: ["0deg", "45deg"],
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
      <Animated.View style={{ opacity: fade }}>
        <View style={styles.containerItems}>
          <TouchableOpacity>
            <Text style={styles.items}>Registrar buraco</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View>
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPressIn={() => HandleClick()}>
          <Animated.View style={animatedStyle}>
            <Plus color={THEME.COLORS.PRIMARY} size={32} weight={"bold"} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    alignItems: "flex-end",
  },
  containerItems: {
    width: 250,
    height: 55,
    justifyContent: "center",
    backgroundColor: THEME.COLORS.BACKGROUND_700,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    margin: 30,
  },
  items: {
    fontSize: THEME.FONT_SIZE.MD,
    textAlignVertical: "center",
    paddingLeft: 10,
    color: THEME.COLORS.PRIMARY,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    margin: 32,
    bottom: 0,
    right: 0,
    borderRadius: 100,
  },
});
