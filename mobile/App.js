import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Routes} from './src/routes/app.routes';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}
