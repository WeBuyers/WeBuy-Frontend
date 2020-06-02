import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, Image} from "react-native"
import {Button} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Actions} from "react-native-router-flux"
import {TOKEN_KEY} from "../constant"
import icon from "../assets/icon.png";
import store from "../stores"

class Profile extends Component {
    async logoutHandler(){
        await AsyncStorage.removeItem(TOKEN_KEY)
            .then(()=>{
                console.log('Token Removed!');
                Actions.login();
            })
            .catch(error =>{
                console.log(`remove error --> ${error}`);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button transparent style={{
                        alignSelf: "flex-end",
                        marginTop: hp("7%"),
                        marginRight: 10,
                        justifyContent:"center",
                        width: 100,
                        borderColor: 'white',
                        borderWidth: 1
                    }}
                            onPress={this.logoutHandler}
                    >
                        <Text style={{color: "white", fontSize: 16}}>Log Out</Text>
                    </Button>
                </View>
                <Image source={icon} style={styles.avatar}/>
                <Text style={{paddingTop: 70, alignSelf: 'center', fontSize: 27, fontFamily: "Ubuntu-Regular"}}>{store.getState().login.username}</Text>
                <Text style={{fontSize: 16, paddingTop: 20, alignSelf: 'center', fontFamily: "Jost"}}>Address: 1000 Howard Street, San Francisco</Text>
                <Text style={{fontSize: 16, paddingTop: 20, alignSelf: 'center', fontFamily: "Jost"}}>Email: {store.getState().login.email}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
    header: {
        backgroundColor: "rgba(83,126,254,0.84)",
        height:hp("30%"),
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: "white",
        marginBottom: 10,
        alignSelf:'center',
        position: 'absolute',
        marginTop: hp("20%")
    },
});

export default Profile;