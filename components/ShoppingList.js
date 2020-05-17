import React, {Component} from 'react';
import {StyleSheet, Text, Button, TouchableOpacity, View, FlatList, Alert} from "react-native";
import {Header, Content, Container, Tab, Tabs, TabHeading} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';

let testData = [
    { name: 'store 1', key: '1' },
    { name: 'store 2', key: '2' },
    { name: 'store 3', key: '3' },
    { name: 'store 4', key: '4' },
    { name: 'store 5', key: '5' },
]

const onButtonPress = () => Alert.alert('button pressed');

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
                            <FlatList
                                data={testData}
                                style={styles.list}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={onButtonPress}
                                    >
                                         <Text>{item.name}</Text>
                                    </TouchableOpacity>

                                    // <Button
                                    //     title={item.name}
                                    //     color="gray"
                                    //     onPress={() => Alert.alert('hello')}
                                    // />
                                )}
                            />
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
        right: 0,
    },
    list: {
        marginTop: 0,
        padding: 0,
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 24,
    },
    button: {
        backgroundColor: "lightblue",
        paddingVertical: 24,
        marginVertical: 10,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10
    },
});

export default ShoppingList;