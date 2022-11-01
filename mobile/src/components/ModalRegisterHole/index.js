import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { GetLocal, SendFormData } from "../../services";

export function ModalRegister(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [locales, setLocales] = useState("");
  const [showFlat, setShowFlat] = useState(false);
  const [formData, setFormData] = useState({ endereco: "", cidade: "", estado: "", latitude: "", longitude: "" });
  const [isSelectedLocale, setIsSelectedLocale] = useState(false);

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
    setFormData({
      ...formData,
      endereco: locales[index].text,
      cidade: locales[index].context[2].text,
      estado: locales[index].context[3].text,
      latitude: locales[index]["geometry"]["coordinates"][1],
      longitude: locales[index]["geometry"]["coordinates"][0],
    });
    setShowFlat(false);
    setIsSelectedLocale(true);
  }

  function HandleSendFormData() {
    SendFormData(formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

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
          {!isSelectedLocale ? (
            <View style={[styles.body, { height: 80 }]}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  HandleChangeInput(
                    text
                      .split(" ")
                      .map((word) => word)
                      .join(" ")
                  );
                  setFormData({
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
          ) : (
            <View style={[styles.body, { height: 150 }]}>
              <View style={styles.newBodyItems}>
                <Text style={styles.textLabel}>Endereço: </Text>
                <Text>{formData.endereco}</Text>
              </View>
              <View style={styles.newBodyItems}>
                <Text style={styles.textLabel}>Cidade: </Text>
                <Text>{formData.cidade}</Text>
              </View>
              <View style={styles.newBodyItems}>
                <Text style={styles.textLabel}>Estado: </Text>
                <Text>{formData.estado}</Text>
              </View>
              <TouchableOpacity onPress={() => HandleSendFormData()}>
                <View style={styles.newView}>
                  <Text style={styles.textTitle}>Registrar</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  newBodyItems: {
    flexDirection: "row",
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
  textLabel: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD,
  },
  textContext: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  textTitle: {
    color: THEME.COLORS.TEXT,
  },
  newView: {
    backgroundColor: THEME.COLORS.BACKGROUND_700,
    marginTop: 15,
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
