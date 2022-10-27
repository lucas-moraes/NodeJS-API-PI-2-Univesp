import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { GetLocal } from "../../services";

export function ModalRegister(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [locales, setLocales] = useState("");
  const [showFlat, setShowFlat] = useState(false);
  const [formData, setFormaData] = useState({ endereco: "", estado: "", cidade: "" });
  const bottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setModalVisible(props.openChildren);
  }, [props.openChildren]);

  function HandleChangeInput(word) {
    const address = word
      .split(" ")
      .map((word) => word)
      .join(" ");
    if (address.length > 7) {
      GetLocal(address).then((res) => {
        setLocales(res.data.features);
        setShowFlat(true);
      });
    }
  }

  function HandleSelectedLocale(index) {
    props.resLocale(locales[index]);
    Animated.timing(bottom, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(false);
    setShowFlat(false);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: bottom.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 600],
                }),
              },
            ],
          }}
        >
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
                onChangeText={(text) => {
                  HandleChangeInput(
                    text
                      .split(" ")
                      .map((word) => word)
                      .join(" ")
                  );
                  setFormaData({
                    ...formData,
                    endereco: text
                      .split(" ")
                      .map((word) => word)
                      .join(" "),
                  });
                }}
                value={formData.endereco}
                placeholder="Rua Alfa 333 São Paulo"
                keyboardType="default"
              />
            </View>
          </View>
        </Animated.View>
        {showFlat && (
          <View style={{ height: 350 }}>
            <FlatList
              data={locales}
              keyExtractor={(item) => item.id}
              style={styles.responseContainer}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => HandleSelectedLocale(index)}>
                  <Text style={styles.buttonSelect}>{item.place_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  modal: {
    padding: 15,
    position: "relative",
    width: 350,
    height: 150,
    marginTop: 20,
    marginBottom: 10,
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
  responseContainer: {
    width: 300,
    position: "relative",
    alignSelf: "center",
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
  buttonSelect: {
    margin: 10,
  },
});
