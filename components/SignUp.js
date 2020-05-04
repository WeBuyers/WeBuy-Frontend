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
import {View, KeyboardAvoidingView} from "react-native";
import {API_URL} from "../constant"

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handlerSignUp() {
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
                fetch(`${API_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "newPassword": this.state.password,
                        "email": this.state.email,
                        "newUsername": this.state.username,
                    })
                }).then((response) => {
                    if (response.status == "200") {
                        alert('Register successfully');
                        console.log('Register successfully');
                        Actions.pop();
                    } else if (response.status == "202") {
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
                        <Text style={{fontSize: 28, fontWeight: "bold", paddingLeft: 20, paddingTop: 30}}> Sign Up</Text>
                        <Text style={{fontSize: 15, paddingTop: 17, paddingLeft: 25, color: "grey"}}>
                            Search stores where you can buy what you need
                        </Text>
                        <Root>
                            <KeyboardAvoidingView behavior='position'>
                                <List style={{
                                    paddingTop: hp("10%"),
                                    paddingBottom: hp("3%"),
                                    width: wp("90%"),
                                    justifyContent: "center"
                                }}>
                                    <ListItem style={{borderColor: 'white'}}>
                                        <InputGroup>
                                            <Icon name="ios-person" style={{color: '#2cabfe', marginLeft: 3}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey"}}> Username </Label>
                                                <Input
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
                                    <ListItem style={{borderColor: 'white', paddingTop: hp("3%")}}>
                                        <InputGroup>
                                            <Icon type="MaterialIcons" name="mail" style={{color: '#2cabfe'}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey"}}> Email </Label>
                                                <Input
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
                                    <ListItem style={{borderColor: 'white',paddingTop: hp("3%")}}>
                                        <InputGroup>
                                            <Icon name="ios-unlock" style={{color: '#2cabfe', marginLeft: 4}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey"}}> Password </Label>
                                                <Input
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
                                    <ListItem style={{borderColor: 'white', paddingTop: hp("3%")}}>
                                        <InputGroup>
                                            <Icon type="MaterialIcons" name="done" style={{color: '#2cabfe'}}/>
                                            <Item floatingLabel>
                                                <Label style={{padding: 10, fontSize: 15, fontWeight: "bold", color: "grey"}}>Confirm Password </Label>
                                                <Input
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
                                    width: wp("90%"),
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("5%")
                                }}
                                        onPress={this.handlerSignUp.bind(this)}
                                >
                                    <Text style={{fontWeight: "500", fontSize: 16}}>Sign Up</Text>
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