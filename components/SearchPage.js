import React, {Component} from 'react';
import {Text, Item, Input, Container, Content, Card, CardItem, Right, Thumbnail} from 'native-base';
import {Button, Icon} from "react-native-elements"
import {View, StyleSheet, FlatList} from "react-native"
import MapView from "react-native-maps";
import {Marker, AnimatedRegion} from "react-native-maps";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import Autocomplete from "react-native-autocomplete-input"
import {PLACE_API, API_KEY, API_URL} from "../constant"
// import avocado from "../assets/avocado.jpg";
// import supermarket from "../assets/supermarket.jpg"

class SearchPage extends Component {
    state={
        latitude: 0.0,
        longitude: 0.0,
        searchItem: "",
        stores: [],
        searchResult: [],
        searched: false
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
                fetch(`${PLACE_API}/json?key=${API_KEY}&location=${position.coords.latitude},${position.coords.longitude}&radius=1000&type=supermarket,grocery_or_supermarket`,{
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
        // this.setState({searched: true});
        // fetch(`${API_URL}/api/resources/items?Name=${item}`,{
        //     method: "GET"
        // })
        //     .then((response)=>{
        //         console.log(response.status);
        //         if(response.status==200){
        //             return response.json();
        //         }else{
        //             alert("cannot fetch search result");
        //             return null;
        //         }
        //     })
        //     .then((responseData)=>{
        //         if(responseData && responseData.length!=0){
        //             console.log(responseData);
        //             this.setState({searchResult: responseData});
        //         }
        //     })
        //     .catch(error=>console.log(`error--> ${error}`))
    }

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
                        listContainerStyle={{width: wp("65%"), backgroundColor: "transparent", elevation:1, borderColor: "transparent"}}
                        renderItem={({item})=>(
                            <Item rounded style={{alignItems: 'center',
                                borderRadius: 10,
                                height: hp("5%"),
                                backgroundColor: '#fefefe',
                                paddingBottom: 10,
                                paddingTop: 5,
                                marginTop: 10,
                                justifyContent: "center"
                            }}
                                  onPress={() => {
                                      this.setState({ searchItem: item });

                                  }}
                            >
                                <Text>
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
                />
                {/*<View style={{marginTop: hp("65%")}}>*/}
                {/*    {*/}
                {/*        this.state.searched?*/}
                {/*            <FlatList*/}
                {/*                data={this.state.searchResult}*/}
                {/*                renderItem={({item})=>(*/}
                {/*                    <Card style={{*/}
                {/*                        alignItems: 'center',*/}
                {/*                        paddingTop: 30,*/}
                {/*                        paddingRight: 10,*/}
                {/*                        height: hp("22%"),*/}
                {/*                        width: wp("47%"),*/}
                {/*                        borderRadius: 25*/}
                {/*                    }}*/}
                {/*                    >*/}
                {/*                        <CardItem cardBody style={{alignItems: 'center'}}>*/}
                {/*                            <Button transparent style={{alignItems: 'center'}}*/}
                {/*                                    onPress={()=>{*/}
                {/*                                        let newStores = this.state.stores;*/}
                {/*                                        for (let i = 0; i < newStores.length; i++) {*/}
                {/*                                            if (item.LocationID == newStores[i].id) {*/}
                {/*                                                newStores[i].color = "red";*/}
                {/*                                            } else {*/}
                {/*                                                newStores[i].color = "lightblue";*/}
                {/*                                            }*/}
                {/*                                        }*/}
                {/*                                        this.setState({stores: newStores});*/}
                {/*                                    }}*/}
                {/*                            >*/}
                {/*                                <Thumbnail source={avocado} style ={{height: hp("15%"), width: wp("25%"), marginTop: 30}}/>*/}
                {/*                            </Button>*/}
                {/*                        </CardItem>*/}
                {/*                        <CardItem>*/}
                {/*                            <Text style={{fontSize: 13}}>{item.Name}</Text>*/}
                {/*                            <Text style={{fontSize: 13, fontWeight: "bold"}}>{item.Price}</Text>*/}
                {/*                        </CardItem>*/}
                {/*                    </Card>*/}
                {/*                )}*/}
                {/*                horizontal*/}
                {/*            />*/}
                {/*            :*/}
                {/*            <FlatList*/}
                {/*                data={this.state.stores}*/}
                {/*                renderItem={({item}) => (*/}
                {/*                    <Card style={{*/}
                {/*                        alignItems: 'center',*/}
                {/*                        paddingTop: 30,*/}
                {/*                        paddingRight: 10,*/}
                {/*                        height: hp("22%"),*/}
                {/*                        width: wp("47%"),*/}
                {/*                        borderRadius: 25*/}
                {/*                    }} key={item.id}>*/}
                {/*                        <CardItem cardBody style={{alignItems: 'center'}}>*/}
                {/*                            <Button*/}

                {/*                                transparent style={{margin: 10}}*/}
                {/*                                onPress={() => {*/}
                {/*                                    let newStores = this.state.stores;*/}
                {/*                                    for (let i = 0; i < newStores.length; i++) {*/}
                {/*                                        if (item.id == newStores[i].id) {*/}
                {/*                                            newStores[i].color = "red";*/}
                {/*                                        } else {*/}
                {/*                                            newStores[i].color = "lightblue";*/}
                {/*                                        }*/}
                {/*                                    }*/}
                {/*                                    this.setState({stores: newStores});*/}

                {/*                                }}*/}
                {/*                            >*/}

                {/*                                <Thumbnail source={supermarket} style ={{height: hp("10%"), width: wp("30%"), marginTop: 30}}/>*/}
                {/*                            </Button>*/}
                {/*                        </CardItem>*/}
                {/*                        <CardItem style={{marginTop: 20, backgroundColor: 'transparent'}}>*/}
                {/*                            <Text style={{*/}
                {/*                                fontWeight: "bold",*/}
                {/*                                fontSize: 13,*/}
                {/*                                paddingTop: 5,*/}
                {/*                                textAlign: 'center',*/}
                {/*                                width: 190*/}
                {/*                            }}>{item.name}</Text>*/}
                {/*                        </CardItem>*/}
                {/*                    </Card>*/}
                {/*                )}*/}
                {/*                horizontal*/}
                {/*            />*/}
                {/*    }*/}
                {/*</View>*/}

            </View>

        )
    }
}
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
});

export default SearchPage;