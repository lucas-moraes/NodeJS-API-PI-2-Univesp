import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircle } from "phosphor-react-native";
import { THEME } from "../../theme";

export function ModalRegister(props) {
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    setModalVisible(props.openChildren);
  }, [props.openChildren]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Registrar buraco na via</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                props.openParent(modalVisible);
              }}
            >
              <XCircle color={THEME.COLORS.CAPTION_500} size={32} weight={"bold"} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <TextInput
              style={styles.input}
              //   onChangeText={onChangeNumber}
              value={"Endereço"}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              //   onChangeText={onChangeNumber}
              value={"Estado"}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              //   onChangeText={onChangeNumber}
              value={"Cidade"}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  modal: {
    padding: 15,
    width: 350,
    height: 500,
    borderRadius: 10,
    backgroundColor: THEME.COLORS.BACKGROUND_200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.CAPTION_500,
  },
  body: {
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    borderColor: THEME.COLORS.CAPTION_400,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});
