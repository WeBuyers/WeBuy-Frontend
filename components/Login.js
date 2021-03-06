import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Text, Label, Button, Item, Toast, Root, Thumbnail } from 'native-base';
import {Icon} from "react-native-elements"
import * as Font from "expo-font"
import React, {Component} from 'react';
import icon from "../assets/icon.png"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Actions} from "react-native-router-flux";
import {View, KeyboardAvoidingView, Keyboard, AsyncStorage} from "react-native";
import {WaveIndicator} from "react-native-indicators"
import {connect} from "react-redux"
import {setUsername, setPassword, setToken, setId, setEmail} from "../actions/LoginAction"
import {API_URL, TOKEN_KEY} from "../constant"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: "",
            password: "",
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Jost': require('../assets/fonts/Jost.ttf'),
            'Ubuntu-Medium': require('../assets/fonts/Ubuntu-Medium.ttf'),
            'Ubuntu-Regular': require('../assets/fonts/Ubuntu-Regular.ttf')
        });
        this.setState({fontLoaded: true});
    }

    async _onValueChange(accessToken){
        try{
            await AsyncStorage.setItem(TOKEN_KEY, accessToken);
            await AsyncStorage.getItem(TOKEN_KEY)
                .then(value =>{
                    if(value!==null) console.log(value);
                })
        }catch (error) {
            console.log(`Async Storage Error --> ${error}`);
        }
    }

    async loginHandler(){
        console.log(this.props.username);
        return fetch(`${API_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : this.props.username,
                password : this.props.password,
            }),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    return response.json();
                } else {
                    Toast.show({
                        text: "Invalid Username or Password",
                        textStyle: {fontSize: 13, fontFamily: "Jost"},
                        buttonText: "Got it!",
                        duration: 3000,
                        position: "top"
                    })
                    return null;
                }
            })
            .then((responseData)=>{
                if(responseData){
                   console.log(JSON.stringify(responseData));
                   this._onValueChange(responseData.token);
                   this.props.setToken(responseData.token);
                   this.props.setId(responseData.user_id);
                   this.props.setEmail(responseData.email);
                   Actions.home();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        if(this.state.fontLoaded) {
            return (
                <Container>
                    <Content>

                        <View style={{marginTop: hp("13%"), alignSelf: "center", alignItems: "center",}}>
                            <Thumbnail source={icon} style={{
                                height: hp("13%"),
                                width: hp("13%"),
                                marginBottom: hp("3%"),
                                borderRadius: 45
                            }}/>
                            <Text style={{fontSize: 40, fontWeight: 'bold', fontFamily: "Ubuntu-Medium"}}>
                                We
                                <Text style={{
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    color: 'rgba(232,44,37,0.87)',
                                    fontFamily: "Ubuntu-Medium"
                                }}> Buy </Text>
                            </Text>
                            <Text style={{color: '#C5CCD6', fontSize: 16, fontFamily: "Jost"}}>Find what you need nearby
                                immediately</Text>
                        </View>
                        <Root>
                            <KeyboardAvoidingView behavior='position'>
                                <List
                                    style={{marginTop: hp("8%"), paddingBottom: 15, width: wp("85%"), paddingLeft: 20}}>
                                    <ListItem style={{borderColor: "white"}}>
                                        <InputGroup>
                                            <Icon name='account-circle' type='material-community' color='#2cabfe'
                                                  size={30}/>
                                            <Item floatingLabel>
                                                <Label style={{
                                                    padding: 10,
                                                    fontSize: 15,
                                                    fontFamily: "Ubuntu-Medium"
                                                }}> Username </Label>
                                                <Input
                                                    style={{paddingLeft: 10, fontFamily: 'Ubuntu-Regular'}}
                                                    onChangeText={(text) => this.props.setUsername(text)}
                                                    value={this.props.username}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem style={{borderColor: 'white'}}>
                                        <InputGroup>
                                            <Icon name='lock' type='simple-line-icon' color='#2cabfe' size={25}/>
                                            <Item floatingLabel>
                                                <Label style={{
                                                    padding: 10,
                                                    fontSize: 15,
                                                    fontFamily: "Ubuntu-Medium"
                                                }}> Password </Label>
                                                <Input
                                                    style={{paddingLeft: 10, fontFamily: 'Ubuntu-Regular'}}
                                                    onChangeText={(text) => this.props.setPassword(text)}
                                                    value={this.props.password}
                                                    secureTextEntry={true}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                </List>

                                <Button
                                    style={{
                                        padding: 15,
                                        margin: 15,
                                        width: wp("80%"),
                                        backgroundColor: "deepskyblue",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderRadius: 20
                                    }}
                                    onPress={() => {
                                        console.log("Login...");
                                        this.loginHandler();
                                        Keyboard.dismiss();
                                    }}
                                >
                                    <Text style={{fontWeight: "bold", fontFamily: "Ubuntu-Medium", fontSize: 18}}>Log
                                        in</Text>
                                </Button>
                                <View style={{flexDirection: 'row', alignSelf: "center"}}>
                                    <Text style={{alignSelf: "center", fontSize: 18, fontFamily: "Jost"}}>
                                        Or new here?
                                    </Text>
                                    {
                                        <Button transparent
                                                onPress={() => Actions.signup()}
                                        >
                                            <Text style={{
                                                color: "deepskyblue",
                                                fontWeight: "bold",
                                                fontFamily: "Ubuntu-Medium"
                                            }}>Sign Up</Text>
                                        </Button>
                                    }

                                </View>
                            </KeyboardAvoidingView>
                        </Root>
                    </Content>
                </Container>
            );
        }else {
            return <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <WaveIndicator color="#2cabfe" />
            </View>
        }
    }
}

export default connect(state => ({
    username: state.login.username,
    password: state.login.password
}), {setUsername, setPassword, setToken, setId, setEmail})(Login);