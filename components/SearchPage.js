import React, {Component} from 'react';
import {Text, Item, Input, Container, Content, Card, CardItem, Right, Thumbnail, Row, Body} from 'native-base';
import {Button, Icon, Overlay, ListItem, CheckBox} from "react-native-elements"
import {View, StyleSheet, FlatList, ScrollView, TouchableHighlight} from "react-native"
import MapView from "react-native-maps";
import {Marker, AnimatedRegion} from "react-native-maps";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import Autocomplete from "react-native-autocomplete-input"
import {PLACE_API, API_KEY, API_URL} from "../constant"
import BottomSheet from "reanimated-bottom-sheet"
import store from "../stores"
import {importWishlist} from "../actions/WishlistAction"
import {connect} from "react-redux"

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            latitude: 0.0,
            longitude: 0.0,
            searchItem: "",
            stores: [],
            searchResult: [],
            searched: false,
            modelvis: false,
            data: []
        }
        this.BottomRef = React.createRef();
    }


    findCoordinate(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                fetch(`${PLACE_API}/json?key=${API_KEY}&location=${position.coords.latitude},${position.coords.longitude}&radius=800&type=supermarket`,{
                    method: "GET"
                })
                    .then((response)=>{
                        console.log(response.status);
                        if(response.status=='200'){
                            console.log("haha");
                            return response.json();
                        }else return null;
                    })
                    .then((responseData)=>{
                        if(responseData){
                            let result = responseData.results;
                            let stores = [];
                            for(let i = 0; i < result.length; i++){
                                let store = {
                                    location: result[i].geometry.location,
                                    id: i,
                                    color: "lightblue",
                                    name: result[i].name,
                                    rating: result[i].rating,
                                    place: result[i].vicinity
                                }
                                console.log(store);
                                stores.push(store);
                            }
                            console.log(stores);
                            this.setState({stores: stores});
                        }
                    })
                    .catch(error=>alert(`error->${error}`))
            },
            error => {
                alert("cannot get location"),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            }
        );
    }
    componentDidMount() {
        this.findCoordinate();
        fetch(`${API_URL}/wishlist/listall?user_id=${store.getState().login.user_id}`, {
            method: 'GET',
        }).then((response)=>{
            return response.json();
        })
            .then(responseData=>{
                console.log(JSON.stringify(responseData));
               this.props.importWishlist(responseData);
                let newData = responseData;
                newData.forEach(element => {
                    element.check = false;
                });
                this.setState({data: newData});
            })
            .catch(error=>{console.log(`Unable to fetch wishlist --> ${error}`)})

    }

    findItem(query){
        let text = query.toLowerCase();
        let trucks = [
            "avocado",
            "Apples",
            "Broccoli",
            "Chicken",
            "Duck",
            "Eggs",
            "Fish",
            "Granola",
            "Hash Browns",
            "Paper",
            "juice"
        ];
        let filtered = trucks.filter((item)=>{
            return item.toLowerCase().match(text);
        });
        if(!text||text==""){
            return [];
        }else if(!Array.isArray(filtered) && !filtered.length){
            return [];
        }else if(Array.isArray(filtered)){
            return filtered;
        }
    }

    searchItem(item){
        this.setState({searched: true});
        fetch(`${API_URL}/search/item?name=${item}&latitude=${this.state.latitude}&longitude=${this.state.longitude}`,{
            method: "GET"
        })
            .then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    return response.json();
                }else{
                    alert("cannot fetch search result");
                    return null;
                }
            })
            .then((responseData)=>{
                if(responseData && responseData.length!==0){
                    console.log(responseData);
                    this.setState({searchResult: responseData});
                }
            })
            .catch(error=>console.log(`error--> ${error}`))
    }

    additem(item){
        fetch(`${API_URL}/wishlist/additem`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: store.getState().user_id,
                item_id: item.id
            }),
        })
            .then((response)=>{
                if(response.status===200){
                    alert("Item is successfully added to your wishlist!");
                }else{
                    alert("Item has already in your wishlist!");
                }
            }).catch(error => {console.log(`Error in add item api --> ${error}`)});

    }

    async itemList(){
        let array = [];
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].check){
                array.push(this.state.data[i].name);
            }
        }
        await fetch(`${API_URL}/search/itemlist`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: array,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }),
        })
            .then((response)=>{
                if(response.status===200){
                    return response.json();
                }else{
                    return null;
                }
            })
            .then((responseData)=>{
                if(responseData){
                    console.log(responseData);
                }else{
                    alert("cannot optimize the item list!");
                }
            }).catch(error => {console.log(`Error --> ${error}`)});
    }

    renderDrawer = () => (
        <View style={{backgroundColor: '#5594FE', height: hp("70%")}}>
            <Text style={{
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 17,
                fontFamily: "Ubuntu-Regular",
                alignSelf: "center",
                color: "white"
            }}>Search Grocery Stores Nearby!</Text>
            {
                !this.state.searched ?
                <FlatList data={this.state.stores}
                          renderItem={({item})=>(
                              <Card style={{
                                  alignItems: "center",
                                  padding: 30,
                                  height: hp("22%"),
                                  width: wp("47%"),
                                  borderRadius: 25
                              }}
                              >
                                  <CardItem cardBody={true}>
                                      <Button
                                          title={item.name}
                                          type="clear"
                                          size={60}
                                          onPress={()=>{
                                              let newStores = this.state.stores;
                                              for (let i = 0; i < newStores.length; i++) {
                                                  if (item.id === newStores[i].id) {
                                                      newStores[i].color = "red";
                                                  } else {
                                                      newStores[i].color = "lightblue";
                                                  }
                                              }
                                              console.log(newStores);
                                              this.setState({stores: newStores});
                                          }}
                                      />
                                  </CardItem>
                                  <CardItem>
                                      <Text style={{fontFamily: "Ubuntu-Regular", fontSize: 15}}>{item.place}</Text>
                                  </CardItem>
                              </Card>
                          )}
                          horizontal
                />
                :
                <FlatList data={this.state.searchResult}
                          renderItem={({item})=>(
                              <Card style={{
                                  alignItems: "center",
                                  padding: 30,
                                  height: hp("40%"),
                                  width: wp("47%"),
                                  borderRadius: 25
                              }}
                              >
                                  <CardItem>
                                     <Text style={{alignSelf: 'center', fontSize: 16, width:wp("30%")}}>{item.itemname}</Text>
                                  </CardItem>
                                  <CardItem cardBody={true}>
                                      <Thumbnail source={{uri: item.picturelink}} style ={{height: hp("10%"), width: wp("30%"), marginTop: 30}}/>
                                  </CardItem>
                                  <CardItem>
                                      <Button
                                          title={this.state.stores[item.storeid].name}
                                          type='clear'
                                          size={15}
                                          onPress={()=>{
                                              let newStores = this.state.stores;
                                              for (let i = 0; i < newStores.length; i++) {
                                                  if (item.storeid === i) {
                                                      newStores[i].color = "red";
                                                  } else {
                                                      newStores[i].color = "lightblue";
                                                  }
                                              }
                                              console.log(newStores);
                                              this.setState({stores: newStores});
                                          }}
                                      />
                                      <Text style={{fontFamily: "Ubuntu-Regular", fontSize: 15}}>$ {item.price}</Text>
                                  </CardItem>
                                  <CardItem>
                                      <Button
                                          type="solid"
                                          icon={<Icon name='add' size={15} color="lightblue"/>}
                                          size={30}
                                          buttonStyle={{
                                              height: 30,
                                              width: 30,
                                              borderRadius: 50,
                                          }}
                                          onPress={()=>{this.additem(item)}}
                                          />
                                  </CardItem>
                              </Card>
                          )}
                          horizontal
                />
            }

        </View>
    )

    render() {
        let data = this.findItem(this.state.searchItem);
        if(data.length===1&&data[0]===this.state.searchItem) data = [];
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    zoomEnabled={true}
                    ref={map=>this.map = map}
                    showsMyLocationButton
                    showsCompass
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    {
                        this.state.stores.map((item)=>{
                            return <Marker
                                coordinate={{
                                    latitude: item.location.lat,
                                    longitude: item.location.lng
                                }}
                                title={item.name}
                                key={item.id}
                                pinColor={item.color}
                            >
                            </Marker>
                        })
                    }
                </MapView>

                <Item rounded style={{
                    position: "absolute",
                    top: hp("7%"),
                    left: wp("5%"),
                    width: wp("90%"),
                    height: hp("6%"),
                    backgroundColor: "white",
                    alignSelf: "center"
                }}>
                    <Icon name="search" size={27} style={{marginLeft: 10}} color='#4899f2'/>
                    <Autocomplete
                        onChangeText={text=>this.setState({searchItem: text})}
                        value={this.state.searchItem}
                        placeholder="Search what you need..."
                        data = {data}
                        containerStyle={styles.autocompleteContainer}
                        listStyle={{borderColor: "transparent", backgroundColor: "transparent"}}
                        inputContainerStyle={{width: wp("65%"), borderColor: "white"}}
                        listContainerStyle={{width: wp("65%"), backgroundColor: "transparent", elevation:1, borderColor: "transparent", marginTop: 5}}
                        renderItem={({item})=>(
                            <Item rounded style={{alignItems: 'center',
                                borderRadius: 3,
                                height: hp("5%"),
                                backgroundColor: '#fefefe',
                                borderColor: "lightgrey",
                                flex: 1
                            }}
                                  onPress={() => {
                                      this.setState({ searchItem: item });

                                  }}
                            >
                                <Text style={{fontFamily: 'Jost', fontSize: 15, paddingLeft: 10}}>
                                    {item}
                                </Text>
                            </Item>
                        )}
                    />

                    <Button
                        type="clear"
                        icon={<Icon name='arrow-forward' color='#4899f2'/>}
                            style={{
                                marginRight: wp("10%"),
                                justifyContent:"center",
                            }}
                            size={15}
                            onPress={()=>{
                                this.BottomRef.current.snapTo(1)
                                this.searchItem(this.state.searchItem)
                            }}
                    />
                </Item>
                <Button
                    raised
                    type="solid"
                    icon={<Icon name='add' size={20} color="lightblue"/>}
                    size={50}
                    containerStyle={{
                        position: 'absolute',
                        top: hp("15%"),
                        right: wp("8%"),
                        height: 60,
                        width: 60,
                    }}
                    buttonStyle={{
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                        shadowRadius: 30
                    }}
                    onPress={()=>{this.setState({modelvis: !this.state.modelvis})}}
                />



                <BottomSheet
                    snapPoints={[700, 400, 100]}
                    initialSnap={1}
                    ref = {this.BottomRef}
                    renderContent={this.renderDrawer}
                    borderRadius={20}
                />

                <Overlay isVisible={this.state.modelvis} onBackdropPress={()=>{this.setState({modelvis: !this.state.modelvis})}}>
                    <Text style={{fontSize: 18, alignSelf: 'center', paddingTop: 10}}> Import Your Wish List </Text>
                    <View style={styles.modelContainer}>
                        <FlatList data={this.state.data}
                                  renderItem={({item})=>(
                                      <TouchableHighlight style={{padding: 10, width: wp("70%")}}>
                                          <Row>
                                              <Body>
                                                  <Text style={{fontSize: 15}}>{item.name}</Text>
                                              </Body>
                                              <Right>
                                                  <CheckBox checked={item.check}
                                                            wrapperStyle={{marginVertical: 5}}
                                                            onPress={()=>{
                                                                let array = this.state.data;
                                                                for(let i = 0; i < array.length; i++){
                                                                    if(array[i].name===item.name){
                                                                        array[i].check = !array[i].check;
                                                                        break;
                                                                    }
                                                                }
                                                                this.setState({data: array});
                                                            }}/>
                                              </Right>
                                          </Row>
                                      </TouchableHighlight>
                                  )}/>
                    </View>
                    <Button type="solid" size={30} title="Confirm" onPress={()=>{
                        this.setState({modelvis: !this.state.modelvis});
                        this.itemList();
                    }}/>
                </Overlay>


            </View>

        )
    }
}
/*TODO: Adjust the styles of this page*/
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    autocompleteContainer: {
        marginLeft: 5,
        marginRight: 10,
    },
    modelContainer: {
        height: hp("40%"),
        width: wp("70%"),
        padding: 20
    }
});


export default connect(state => ({
    wishlist: state.wishlist.wishlist
}), {importWishlist})(SearchPage);