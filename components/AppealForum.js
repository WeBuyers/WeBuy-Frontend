import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {Container, Content, Text} from "native-base"

class AppealForum extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={{paddingTop: 100, alignSelf: 'center'}}> This is forum page! </Text>
                </Content>
            </Container>
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

export default AppealForum;