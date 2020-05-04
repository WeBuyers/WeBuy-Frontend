import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font"
import Login from "./components/Login"
import store from "./stores"
import {Provider} from "react-redux"


export default class App extends Component{
  state={
      fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Jost': require('./assets/fonts/Jost.ttf'),
      'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    return (
        <Provider store={store}>
          <Login/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
