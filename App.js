import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import store from "./stores"
import {Provider} from "react-redux"
import {Scene, Router} from "react-native-router-flux";


export default class App extends Component{
  render() {
      return (
          <Provider store={store}>
            <Router>
              <Scene key='root'>
                <Scene key="login" component={Login} hideNavBar={true} title="Login" initial={true}/>
                <Scene key="signup" component={SignUp} hideNavBar={true}/>
                <Scene key="home" component={Home} hideNavBar={true}/>
              </Scene>
            </Router>
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
