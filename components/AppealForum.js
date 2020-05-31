import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import {Container, Content, Text, List, ListItem, Header, Button, Icon, Right, Body} from "native-base"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"

class AppealForum extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Header>
                        <Text style={{fontSize: 18}}>Forum</Text>
                    </Header>
                    <ScrollView style={styles.scroll}>
                        <List>
                            <ListItem>
                                <Body>
                                    <Text> Topic 1</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text> Topic 2</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text> Topic 3</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text> Topic 4</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text> Topic 5</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>
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