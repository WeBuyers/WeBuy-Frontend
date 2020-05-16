import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native"
import {Header, Content, Container, Tab, Tabs, TabHeading} from 'native-base'

class ShoppingList extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Header>
                        <Text style={{fontSize: 18}}>Shopping List</Text>
                    </Header>
                    <Tabs>
                        <Tab heading={ <TabHeading><Text>Planned List</Text></TabHeading>}>
                            <Text style={{fontFamily: 'Jost', fontSize: 18, paddingLeft: 20}}>this is planned list</Text>
                        </Tab>
                        <Tab heading={<TabHeading><Text>Wish List</Text></TabHeading>}>
                            <Text style={{fontFamily: 'Jost', fontSize: 18, paddingLeft: 20}}>this is wish list</Text>
                        </Tab>
                    </Tabs>
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

export default ShoppingList;