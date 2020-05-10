import React, {Component} from 'react';
import {View} from "react-native";
import { Container, Icon, Text, Button, Footer, FooterTab } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import SearchPage from "./SearchPage";
import AppealForum from "./AppealForum";
import Profile from "./Profile"
import ShoppingList from "./ShoppingList"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            page: "store",
        }
    }

    render() {
        let view = <SearchPage/>;
        switch (this.state.page) {
            case "store":
                view = <SearchPage/>;
                break;
            case "appeal":
                view = <AppealForum/>;
                break;
            case "wishlist":
                view = <ShoppingList/>;
                break;
            case "profile":
                view = <Profile/>;
                break;
            default:
                break;
        }
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {view}
                <Footer style={{
                    position: "absolute",
                    left: 0,
                    top: hp('89%'),
                    height: 95,
                    alignSelf: "flex-end",
                }}>
                    <FooterTab style={{paddingBottom: 20}}>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "store"){
                                this.setState({page: "store"});
                            }
                        }}>
                            <Icon name="compass"/>
                            <Text style = {{fontSize: 12}}>Find Store</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "appeal"){
                                this.setState({page: "appeal"});
                            }}}>
                            <Icon type='MaterialIcons' name="store"/>
                            <Text style = {{fontSize: 12}}>Forum</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "wishlist"){
                                this.setState({page: "wishlist"});
                            }}}>
                            <Icon type='MaterialIcons' name="apps"/>
                            <Text style = {{fontSize: 12, textAlign: "center"}}>Shopping List</Text>
                        </Button>
                        <Button vertical onPress = {()=>{
                            if(this.state.page != "profile"){
                                this.setState({page: "profile"});
                            }}}>
                            <Icon type='MaterialIcons' name="person"/>
                            <Text style = {{fontSize: 12}}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

export default Home;