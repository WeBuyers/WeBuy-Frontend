import React, {Component} from 'react';
import { StyleSheet, Text, View , AsyncStorage} from 'react-native';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import store from "./stores"
import {Provider} from "react-redux"
import {Scene, Router} from "react-native-router-flux";
import {TOKEN_KEY, API_URL} from "./constant";


export default class App extends Component{
    state = {
        init: true
    }
    async componentDidMount() {
       await AsyncStorage.getItem(TOKEN_KEY)
           .then((accessToken)=>{
               accessToken = "Bearer " + accessToken;
               console.log(accessToken);
               if(accessToken !== null){
                   fetch(`${API_URL}/auth/login`, {
                       method: 'POST',
                       headers: {
                           'Authorization': accessToken
                       }
                   }).then((response)=>{
                        if(response.status===200){
                            this.setState({init: false});
                        }else{
                            this.setState({init: true});
                        }
                   })
               }
           }).catch(error=>{
               console.log(`unable to fetch token --> ${error}`);
           })
    }

    render() {
      return (
          <Provider store={store}>
            <Router>
              <Scene key='root'>
                <Scene key="login" component={Login} hideNavBar={true} title="Login" initial={this.state.init}/>
                <Scene key="signup" component={SignUp} hideNavBar={true}/>
                <Scene key="home" component={Home} hideNavBar={true} initial={!this.state.init}/>
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
