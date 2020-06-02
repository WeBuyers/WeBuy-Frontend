import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import {Container, Content, Text, List, ListItem, Header, Button, Icon, Right, Body} from "native-base"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"

class AppealForum extends Component {

    constructor (props) {
        super(props);
        this.state = {
            options: [{
                like: 0, name: "Go to Target Westwood Today",
            },{like: 0, name: "Need Help for Buying Noodles", 
            },{like: 0, name: "Buy Rice, Need help? ",
            },{like: 0, name: "Go Shopping on Jun. 1st"}]
        };
    }

    onLike(index) {
        this.setState((state) => {
            let newOptions = state.options.slice();
            newOptions[index].like++;
            return {
                options: newOptions
            };
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Header>
                        <Text style={{fontSize: 18}}>Forum</Text>
                    </Header>
                    <ScrollView style={styles.scroll}>
                        <List>
                            {this.state.options.map((dict, index) =><ListItem key={dict.name}>
                                <Body>
                                    <Text>{dict.name}</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => this.onLike(index)}>
                                        <Icon name="thumbs-up" />
                                        <Text>{(dict.like <= 1) ? (dict.like + ' like') : (dict.like + ' likes')}</Text>
                                    </Button>
                                </Right>
                            </ListItem>)}
                        </List>
                    </ScrollView>
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
    },
    scroll: {
        height: hp("75%"),
        margin: 10
    }
});

export default AppealForum;