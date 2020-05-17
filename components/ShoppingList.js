import React, {Component} from 'react';
import {StyleSheet, Text, View, LayoutAnimation, ScrollView, TouchableOpacity, FlatList, Alert, UIManager, Platform,} from "react-native";
import {Header, Content, Container, Tab, Tabs, TabHeading} from 'native-base';


class ExpandableItemComponent extends Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
      }
      return false;
    }
    render() {
        return (
          <View>
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.props.onClickFunction}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
            </TouchableOpacity>
            <View
                style={{
                    height: this.state.layoutHeight,
                    overflow: 'hidden',
                 }}>
                {/*Content under the header of the Expandable List Item*/}
                {this.props.item.items.map((item, key) => (
                    <TouchableOpacity
                    key={key}
                    style={styles.content}
                    onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
                    <Text style={styles.contentText}>
                        {item.val}
                    </Text>
                    <View style={styles.separator} />
                    </TouchableOpacity>
                ))}
            </View>
          </View>
        );
      }
    
}
    

class ShoppingList extends Component {
    constructor() {
        super();
        this.state = {
            storeList: CONTENT,
            groceryList: CONTENT, 
        }
    };

    updateLayout = index => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...this.state.storeList];
        array.map((value, placeindex) =>
          placeindex === index
            ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
            : (array[placeindex]['isExpanded'] = false)
        );
        this.setState(() => {
          return {
            storeList: array,
          };
        });
      };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Header>
                        <Text style={{fontSize: 18}}>Shopping List</Text>
                    </Header>
                    <Tabs>
                        <Tab heading={ <TabHeading><Text>Current Plan</Text></TabHeading>}>                            
                            <View style={styles.listContainer}>
                                <ScrollView>
                                    {this.state.storeList.map((item, key) => (
                                        <ExpandableItemComponent
                                            key={item.category_name}
                                            onClickFunction={this.updateLayout.bind(this, key)}
                                            item={item}
                                        />
                                    ))}
                                </ScrollView>
                            </View>                                                      
                        </Tab>
                        <Tab heading={<TabHeading><Text>Wish List</Text></TabHeading>}>
                            {/* <FlatList
                                data={groceryExamples}
                                style={styles.list}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.groceryButton}
                                        onPress={() => Alert.alert('hi')}
                                    >
                                         <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            /> */}
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

    listContainer: {
        flex: 0,
        paddingTop: 8,
        backgroundColor: '#fff',
      },
      header: {
        backgroundColor: '#5594FE',
        paddingVertical: 24,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 10,
      },
      headerText: {
        fontSize: 26,
        color: 'white',
        textAlign: 'center',
      },
      separator: {
        height: 0.4,
        backgroundColor: 'white',
        width: '95%',
        marginLeft: 6,
        marginRight: 12,
      },
      content: {
        paddingLeft: 20,
        paddingRight: 20,
        padding: 5,
        marginVertical: 1,
        marginLeft: 26,
        marginRight: 26,
        borderRadius: 10,
        backgroundColor: 'lightblue',
      },
      contentText: {
            fontSize: 18,
            color: 'white',
            textAlign: 'left',
      }
});

export default ShoppingList;



/* example data */
const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Safeway (Sawtelle)',
      items: [{ id: 1, val: 'Avocado' }, { id: 3, val: 'Egg' }, {id: 5, val: 'Milk'}],
    },
    {
      isExpanded: false,
      category_name: 'Target (Westwood)',
      items: [{ id: 4, val: 'Oil' }, { id: 1, val: 'Avocado' }],
    },
    {
      isExpanded: false,
      category_name: 'Whole Food (Westwood)',
      items: [{ id: 7, val: 'Protein Powder' }],
    },
    {
      isExpanded: false,
      category_name: 'Whole Food (Century City)',
      items: [{ id: 8, val: 'Yogurt' }, { id: 2, val: 'Cabbage' },{ id: 6, val: 'Dorito' }],
    },
    {
      isExpanded: false,
      category_name: 'Walmart (Sawtelle)',
      items: [{ id: 9, val: 'Strawberry' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 6',
      items: [{ id: 17, val: 'Sub Cat 17' }, { id: 18, val: 'Sub Cat 8' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 7',
      items: [{ id: 20, val: 'Sub Cat 20' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 8',
      items: [{ id: 22, val: 'Sub Cat 22' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 9',
      items: [{ id: 26, val: 'Sub Cat 26' }, { id: 27, val: 'Sub Cat 7' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 10',
      items: [{ id: 28, val: 'Sub Cat 28' }, { id: 30, val: 'Sub Cat 0' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 11',
      items: [{ id: 31, val: 'Sub Cat 31' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 12',
      items: [{ id: 34, val: 'Sub Cat 34' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 13',
      items: [{ id: 38, val: 'Sub Cat 38' }, { id: 39, val: 'Sub Cat 9' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 14',
      items: [{ id: 40, val: 'Sub Cat 40' }, { id: 42, val: 'Sub Cat 2' }],
    },
    {
      isExpanded: false,
      category_name: 'Item 15',
      items: [{ id: 43, val: 'Sub Cat 43' }, { id: 44, val: 'Sub Cat 44' }],
    },
  ];
  