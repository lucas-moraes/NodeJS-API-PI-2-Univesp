/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XCircle, CheckCircle} from 'phosphor-react-native';
import {THEME} from '@themes';
import {GetLocal, GetGeocode, SendFormData} from '@services';

export function ModalRegister(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [locales, setLocales] = useState('');
  const [showFlat, setShowFlat] = useState(false);
  const [formData, setFormData] = useState({
    endereco: '',
    latitude: '',
    longitude: '',
  });
  const [isSelectedLocale, setIsSelectedLocale] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  useEffect(() => {
    setModalVisible(props.openChildren);
  }, [props.openChildren]);

  function HandleChangeInput(word) {
    const address = word
      .split(' ')
      .map(item => item)
      .join(' ');
    if (address.length > 7) {
      GetLocal(address).then(res => {
        setLocales(res.data.predictions);
        setShowFlat(true);
      });
    }
  }

  function HandleSelectedLocale(index) {
    GetGeocode(locales[index].description).then(res => {
      props.resLocale(res.data.results[0].geometry.location);
      setFormData({
        ...formData,
        endereco: res.data.results[0].formatted_address,
        latitude: res.data.results[0].geometry.location.lat,
        longitude: res.data.results[0].geometry.location.lng,
      });
    });
    setShowFlat(false);
    setIsSelectedLocale(true);
  }

  function HandleSendFormData() {
    SendFormData(formData)
      .then(() => {
        setIsSelectedLocale(null);
        setRegSuccess(true);
        BackToInitialConfigs();
      })
      .catch(err => console.log(err));
  }

  function BackToInitialConfigs() {
    setTimeout(() => {
      setRegSuccess(false);
      setIsSelectedLocale(false);
      setFormData({
        endereco: '',
        latitude: '',
        longitude: '',
      });
      setShowFlat(false);
      setLocales('');
      setModalVisible(false);
      props.resetMap();
    }, 3000);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modal}>
          {isSelectedLocale === false && (
            <>
              <View style={[styles.header, {justifyContent: 'space-between'}]}>
                <Text style={styles.title}>Registrar buraco na via</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    props.openParent(modalVisible);
                  }}>
                  <XCircle
                    color={THEME.COLORS.CAPTION_500}
                    size={32}
                    weight={'bold'}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.body, {height: 80}]}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    HandleChangeInput(
                      text
                        .split(' ')
                        .map(word => word)
                        .join(' '),
                    );
                    setFormData({
                      ...formData,
                      endereco: text
                        .split(' ')
                        .map(word => word)
                        .join(' '),
                    });
                  }}
                  value={formData.endereco}
                  placeholder="Rua Alfa 333"
                  keyboardType="default"
                />
              </View>
            </>
          )}
          {isSelectedLocale === true && (
            <>
              <View style={[styles.header, {justifyContent: 'space-between'}]}>
                <Text style={styles.title}>Registrar buraco na via</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    props.openParent(modalVisible);
                  }}>
                  <XCircle
                    color={THEME.COLORS.CAPTION_500}
                    size={32}
                    weight={'bold'}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.body, {height: 150}]}>
                <View style={styles.newBodyItems}>
                  <Text style={styles.textLabel}>Endereço: </Text>
                  <Text style={{maxWidth: 300}}>{formData.endereco}</Text>
                </View>
                <TouchableOpacity onPress={() => HandleSendFormData()}>
                  <View style={styles.newView}>
                    <Text style={styles.textTitle}>Registrar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
          {regSuccess && (
            <>
              <View style={[styles.header, {justifyContent: 'center'}]}>
                <Text style={styles.title}>
                  Registro realizado com sucesso!
                </Text>
              </View>
              <View
                style={[
                  styles.body,
                  {height: 90, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <CheckCircle
                  size={50}
                  weight="bold"
                  color={THEME.COLORS.SUCCESS}
                />
              </View>
            </>
          )}
        </View>
        {showFlat && (
          <View style={{height: 350}}>
            <FlatList
              data={locales}
              style={styles.responseContainer}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => HandleSelectedLocale(index)}>
                    <Text style={styles.buttonSelect}>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
  modal: {
    padding: 15,
    position: 'relative',
    width: 350,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: THEME.COLORS.BACKGROUND_200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.CAPTION_500,
  },
  body: {
    justifyContent: 'flex-start',
  },
  newBodyItems: {
    flexDirection: 'row',
    marginBottom: 30,
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
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: THEME.COLORS.BACKGROUND_200,
    shadowColor: '#000',
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
