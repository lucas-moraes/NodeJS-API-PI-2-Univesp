import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { THEME } from '@themes';
import { SendPass } from '@services';
import { Loader } from '@components/Loader';
import { Input } from '@components/TextInput';

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function HandleSendlogin() {
    setIsLoading(true);
    SendPass(formData.email, formData.password).then(res => {
      if (res.data.isLogged) {
        setHasError(false);
        setIsLoading(false);
        navigation.navigate('Home');
      }
      if (!res.data.isLogged) {
        setIsLoading(false);
        setHasError(true);
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/adaptive-icon.png')}
      />
      <View style={styles.viewer}>
        {!isLoading ? (
          <>
            <Text style={styles.title}>Street Holes</Text>
            {hasError && (
              <Text style={styles.textError}>E-mail ou senha incorretos</Text>
            )}
            <Input
              PlaceHolder={'E-mail'}
              IsPassword={false}
              OnChangeText={text => {
                setFormData({
                  ...formData,
                  email: text
                    .split(' ')
                    .map(word => word)
                    .join(' '),
                });
              }}
            />
            <Input
              PlaceHolder={'Password'}
              IsPassword={true}
              OnChangeText={text => {
                setFormData({
                  ...formData,
                  password: text
                    .split(' ')
                    .map(word => word)
                    .join(' '),
                });
              }}
            />
            <TouchableOpacity onPress={() => HandleSendlogin()}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Entrar</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Carregando</Text>
            <Loader />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND_600,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignSelf: 'center',
  },
  viewer: {
    padding: 30,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.OVERLAY_LIGHT,
    borderRadius: 10,
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
    marginBottom: 10,
    color: THEME.COLORS.TEXT_BLACK,
  },
  button: {
    backgroundColor: THEME.COLORS.BACKGROUND_700,
    marginTop: 15,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: THEME.COLORS.TEXT,
  },
  textError: {
    color: THEME.COLORS.TEXT_ERROR,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 20,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.BACKGROUND_900,
  },
});
