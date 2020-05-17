import React, {Component} from 'react';
import {StyleSheet, Text, Button, TouchableOpacity, View, FlatList, Alert} from "react-native";
import {Header, Content, Container, Tab, Tabs, TabHeading} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';

let storeExamples = [
    { name: 'Safeway (Sawtelle)', key: '1' },
    { name: 'Target (Westwood)', key: '2' },
    { name: 'Whole Food (Westwood)', key: '3' },
    { name: 'Whole Food (Century City)', key: '4' },
    { name: 'Walmart (Sawtelle)', key: '5' },
]

let groceryExamples = [
    { name: 'Avocado', key: '1' },
    { name: 'Beef', key: '2' },
    { name: 'Cabbage', key: '3' },
    { name: 'Dorito', key: '4' },
    { name: 'Eggs', key: '5' },
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
                                data={storeExamples}
                                style={styles.list}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.storeButton}
                                        onPress={onButtonPress}
                                    >
                                         <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </Tab>
                        <Tab heading={<TabHeading><Text>Wish List</Text></TabHeading>}>
                            <FlatList
                                data={groceryExamples}
                                style={styles.list}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.groceryButton}
                                        onPress={onButtonPress}
                                    >
                                         <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
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
        marginTop: 0,
    },
    storeButton: {
        backgroundColor: "#5594FE",
        paddingVertical: 24,
        marginVertical: 10,
        padding: 0,
        paddingHorizontal: 0,
        borderRadius: 10,
    },
    groceryButton: {
        backgroundColor: "lightgreen",
        paddingVertical: 16,
        marginVertical: 10,
        padding: 0,
        paddingHorizontal: 0,
        borderRadius: 10,
    },
    text: {
        fontSize: 26,
        color: 'white',
        textAlign: 'center',
    }
});

export default ShoppingList;