import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import {Container, Content, Text, List, ListItem, Header, Button, Right, Body, InputGroup, Input} from "native-base"
import {Icon} from 'react-native-elements';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"

class AppealForum extends Component {

    constructor (props) {
        super(props);
        this.state = {
            posttext: "",
            options: [
                {
                    id: 1,
                    like: false,
                    name: "Go to Target Westwood Today",
                    num: 30
                },
                {
                    id: 2,
                    like: false,
                    name: "Need Help for Buying Noodles",
                    num: 45
                },
                {
                    id: 3,
                    like: false,
                    name: "Buy Rice, Need help? ",
                    num: 38
                },
                {
                    id: 4,
                    like: false,
                    name: "Go Shopping on Jun. 1st",
                    num: 6
                }
                ]
        };
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
                            {this.state.options.map((item) =><ListItem key={item.id}>
                                <Body>
                                    <Text style={{fontFamily: 'Ubuntu-Regular'}}>{item.name}</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() =>{
                                        let array = this.state.options;
                                        array.forEach(e =>{
                                            if(e.id === item.id){
                                                e.like = !e.like;
                                            }
                                        });
                                        this.setState({options: array});
                                    }}>
                                        {
                                            item.like?
                                                <Icon name="thumbs-up" type="font-awesome" color='#47C1FE'/>
                                                : <Icon name="thumbs-o-up" type="font-awesome" color='#47C1FE'/>
                                        }
                                        <Text>{item.like?(item.num+1):(item.num)} likes</Text>
                                    </Button>
                                </Right>
                            </ListItem>)}

                            <ListItem>
                                <InputGroup>
                                    <Input
                                        style={{paddingLeft: 10, fontFamily: 'Ubuntu-Regular'}}
                                        onChangeText={(text) => this.setState({posttext: text})}
                                        value={this.state.posttext}
                                    />
                                </InputGroup>
                                <Button textAlign="center" 
                                    onPress={() =>{
                                        let newItem = {
                                            id: this.state.options.length+1,
                                            like: false,
                                            name: this.state.posttext,
                                            num: 0
                                        };
                                        let newOptions = this.state.options.concat(newItem);
                                        this.setState({
                                            options : newOptions
                                        });
                                    }}
                                    >
                                    <Text style={{color : "white"}}>Post</Text>
                                </Button>
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
    }
});

export default AppealForum;