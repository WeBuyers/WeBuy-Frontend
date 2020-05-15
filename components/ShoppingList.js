import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native"

class ShoppingList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{paddingTop: 100, alignSelf: 'center'}}>This is ShoppingList page.</Text>
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

export default ShoppingList;