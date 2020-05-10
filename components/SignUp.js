import {
    Header,
    Container,
    Left,
    Button,
    Icon,
    Content,
    Text,
    List,
    ListItem,
    InputGroup,
    Item,
    Label, Input,
    Toast, Root
} from 'native-base';
import React, {Component} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Actions} from "react-native-router-flux";
import {View, KeyboardAvoidingView, Keyboard} from "react-native";
import {API_URL} from "../constant"

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handlerSignUp() {
        Keyboard.dismiss();
        console.log(this.state.password);
        if(this.state.password!==this.state.confirmPassword){
            Toast.show({
                text: "Password does not match confirm password",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }else if(this.state.password===""){
            Toast.show({
                text: "Please enter your password",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }
        else if(this.state.username===""||this.state.email===""){
            Toast.show({
                text: "Please enter your username and email",
                textStyle: {fontSize: 13},
                buttonText: "Got it!",
                duration: 3000,
                position: "top"
            })
        }
        else {
            let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if (pattern.test(this.state.email)) {
                console.log(this.state.password);
                fetch(`${API_URL}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "password": this.state.password,
                        "email": this.state.email,
                        "username": this.state.username,
                    })
                }).then((response) => {
                    if (response.status == "200") {
                        alert('Register successfully');
                        console.log('Register successfully');
                        Actions.pop();
                    } else if (response.status == "201") {
                        alert('User has existed');
                        console.log('The username has existed')
                    }
                    //throw new Error(response.statusText)
                }).catch((error) => {
                    console.log('Exist Error: ' + error);
                })
            }else {
                Toast.show({
                    text: "Invalid email address!",
                    textStyle: {fontSize: 13},
                    buttonText: "Got it!",
                    duration: 3000,
                    position: "top"
                })
            }
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {Actions.pop()}}>
                            <Icon name='arrow-back' style={{color: '#00BBF2', paddingLeft: 15}}/>
                        </Button>
                    </Left>
                </Header>
                {
                    <Content>
                        <Text style={{fontSize: 28, paddingLeft: 20, paddingTop: 30, fontFamily: "Ubuntu-Medium"}}> Sign Up</Text>
                        <Text style={{fontSize: 17, paddingTop: 17, paddingLeft: 25, color: "grey", fontFamily: "Jost"}}>
                            Search stores where you can buy what you need
                        </Text>
                        <Root>
                            <KeyboardAvoidingView behavior='padding' style={{flex: 1}} >
                                <List style={{
                                    paddingTop: hp("10%"),
                                    paddingBottom: hp("3%"),
                                    width: wp("90%"),
                                    justifyContent: "center"
                                }}>
                                    <ListItem style={{borderColor: 'white', width: wp("85%")}}>
                                        <InputGroup>
                                            <Icon name="ios-person" style={{color: '#2cabfe', marginLeft: 3}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey", fontFamily: "Ubuntu-Medium"}}> Username </Label>
                                                <Input
                                                    style={{fontSize: 17, paddingLeft:10, fontFamily: "Ubuntu-Regular"}}
                                                    onChangeText={(text)=>this.setState({username:text})}
                                                    value = {this.state.username}
                                                    onBlur={()=>{
                                                        if(this.state.username===""){
                                                            Toast.show({
                                                                text: "Please enter your username",
                                                                textStyle: {fontSize: 13},
                                                                buttonText: "Got it!",
                                                                duration: 2500,
                                                                position: "top"
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem style={{borderColor: 'white', paddingTop: hp("3%"), width: wp("85%")}}>
                                        <InputGroup>
                                            <Icon type="MaterialIcons" name="mail" style={{color: '#2cabfe'}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey", fontFamily: "Ubuntu-Medium"}}> Email </Label>
                                                <Input
                                                    style={{fontSize: 17, paddingLeft:10, fontFamily: "Ubuntu-Regular"}}
                                                    onChangeText={(text)=>this.setState({email:text})}
                                                    value = {this.state.email}
                                                    onBlur={()=>{
                                                        let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
                                                        if(!pattern.test(this.state.email)){
                                                            Toast.show({
                                                                text: "Please enter valid email address",
                                                                textStyle: {fontSize: 13},
                                                                buttonText: "Got it!",
                                                                duration: 2500,
                                                                position: "top"
                                                            })

                                                        }
                                                    }}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem style={{borderColor: 'white',paddingTop: hp("3%"), width: wp("85%")}}>
                                        <InputGroup>
                                            <Icon name="ios-unlock" style={{color: '#2cabfe', marginLeft: 4}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey", fontFamily: "Ubuntu-Medium"}}> Password </Label>
                                                <Input
                                                    style={{fontSize: 17, paddingLeft:10, fontFamily: "Ubuntu-Regular"}}
                                                    onChangeText={(text)=>this.setState({password:text})}
                                                    value = {this.state.password}
                                                    secureTextEntry = {true}
                                                    onBlur={()=>{
                                                        console.log(this.state.password);
                                                        if(this.state.password===""){
                                                            Toast.show({
                                                                text: "Please enter your password",
                                                                textStyle: {fontSize: 13},
                                                                buttonText: "Got it!",
                                                                duration: 2500,
                                                                position: "top"
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem style={{borderColor: 'white', paddingTop: hp("3%"), width: wp("85%")}}>
                                        <InputGroup>
                                            <Icon type="MaterialIcons" name="done" style={{color: '#2cabfe'}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey", fontFamily: "Ubuntu-Medium"}}>Confirm Password </Label>
                                                <Input
                                                    style={{fontSize: 17, paddingLeft:10, fontFamily: "Ubuntu-Regular"}}
                                                    onChangeText={(text)=>this.setState({confirmPassword:text})}
                                                    value = {this.state.confirmPassword}
                                                    secureTextEntry = {true}
                                                    onBlur={()=>{
                                                        if(this.state.password!==this.state.confirmPassword){
                                                            Toast.show({
                                                                text: "Password does not match confirm password",
                                                                textStyle: {fontSize: 13},
                                                                buttonText: "Got it!",
                                                                duration: 2500,
                                                                position: "top"
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Item>
                                        </InputGroup>
                                    </ListItem>
                                </List>
                                <Button rounded info style={{borderRadius: 25,
                                    width: wp("80%"),
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("5%")
                                }}
                                        onPress={
                                            this.handlerSignUp.bind(this)
                                        }
                                >
                                    <Text style={{fontWeight: "500", fontSize: 17, fontFamily: "Ubuntu-Medium"}}>Sign Up</Text>
                                </Button>
                            </KeyboardAvoidingView>
                        </Root>
                    </Content>
                }
            </Container>
        );
    }
}

export default SignUp;