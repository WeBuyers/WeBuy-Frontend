import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, Image} from "react-native"
import {Button} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Actions} from "react-native-router-flux"
import {TOKEN_KEY} from "../constant"
import icon from "../assets/icon.png";

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
                <View style={styles.header}></View>
                <Image source={icon} style={styles.avatar}/>
                <Text style={{paddingTop: 70, alignSelf: 'center', fontSize: 27, fontFamily: "Ubuntu-Regular"}}>Oswald He</Text>
                <Text style={{fontSize: 16, paddingTop: 20, alignSelf: 'center', fontFamily: "Jost"}}>Address: 1000 Howard Street, San Francisco</Text>
                <Button info style={{alignSelf: "center", marginTop: 20, justifyContent:"center", width: 100}}
                        onPress={this.logoutHandler}
                >
                    <Text style={{color: "white"}}>Log Out</Text>
                </Button>
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