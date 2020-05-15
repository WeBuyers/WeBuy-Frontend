import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from "react-native"
import {Button} from "native-base";
import {Actions} from "react-native-router-flux"
import {TOKEN_KEY} from "../constant"

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
                <Text style={{paddingTop: 100, alignSelf: 'center'}}>This is Profile page.</Text>
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
    }
});

export default Profile;