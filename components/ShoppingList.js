import React, {Component} from 'react';
import {StyleSheet, Text, View, LayoutAnimation, ScrollView, TouchableOpacity, FlatList, Alert, UIManager, Platform,} from "react-native";
import {Header, Content, Container, Tab, Tabs, TabHeading, Item, Input, Icon, Button, Row, Right, Body} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import {API_URL} from "../constant"
import store from "../stores"

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
    constructor(props) {
        super(props);
        this.state = {
            storeList: STORES,
            groceryList: store.getState().wishlist.wishlist,
            addItem: "",
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

    async componentDidMount() {
        await fetch(`${API_URL}/wishlist/listall?user_id=${store.getState().login.user_id}`, {
            method: 'GET',
        }).then((response)=>{
            return response.json();
        })
            .then(responseData=>{
                console.log(JSON.stringify(responseData));
                this.setState({groceryList: responseData});
            })
            .catch(error=>{console.log(`Unable to fetch wishlist --> ${error}`)})
    }

    handleDelete(item){
        fetch(`${API_URL}/wishlist/deleteitem`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: store.getState().user_id,
                item_id: item.id
            }),
        }).then((response)=>{
            if(response.status===204){
                console.log("delete successfully!")
            }else{
                console.log("not in the wishlist");
            }
        }).catch(error=>{`Error --> ${error}`});
    }

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
                            <Item rounded={true} style={{width: wp("90%"), alignSelf: "center", marginTop: 15, marginBottom: 15}}>
                                <Icon name="search"/>
                                <Input placeholder="Add to Wishlist..."
                                       value={this.state.addItem}
                                       onChangeText={(text)=>{this.setState({addItem: text})}}
                                       style={{width: wp("50%")}}/>
                                <Button
                                    transparent={true}
                                    onPress={()=>{
                                        if(this.state.addItem.length!==0){
                                            let list = this.state.groceryList;
                                            let itemId =list.length+1;
                                            list.push({name: this.state.addItem, id: itemId});
                                            this.setState({groceryList: list, addItem: ""});
                                        }else{
                                            alert("please enter item name");
                                        }
                                    }}
                                >
                                    <Icon name="add"/>
                                </Button>
                            </Item>
                            <FlatList
                                data={this.state.groceryList}
                                style={styles.listContainer}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.wishHeader}
                                    >
                                        <Row>
                                            <Body style={{width: wp("60%")}}>
                                                <Text style={styles.wishText}>{item.name}</Text>
                                            </Body>
                                            <Right>
                                                <Button
                                                    style={{backgroundColor:'red', width: 50, height: 60}}
                                                    onPress={()=>{
                                                        let list = this.state.groceryList.filter(element=>element.name!==item.name);
                                                        this.setState({groceryList: list});
                                                        this.handleDelete(item);
                                                    }}
                                                >
                                                    <Icon name="trash"/>
                                                </Button>
                                            </Right>
                                        </Row>
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
      wishHeader: {
        backgroundColor: 'mediumaquamarine',
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 10,
      },
      separator: {
        height: 0.5,
        backgroundColor: 'white',
        width: '95%',
        marginLeft: 0,
        marginRight: 0,
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
      },
      wishText: {
            fontSize: 22,
          width: wp("40%"),
            color: 'white',
            textAlign: 'center',
          marginLeft: 20
      }
});

export default ShoppingList;



/* example data */
const STORES = [
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
  ];
  

