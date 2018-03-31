import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        };
        // this.scrolling = this.scrolling.bind(this);
    }

    render() {
        return (
            <ScrollView
                style={styles.scrollview}
                vertical={true}
                bounces={true}>
                <Content>
                  {this.state.images.map((item, index) => (
                    <CardComponent key={index} imageSource={item} likes="101" />
                  ))}
                </Content>
            </ScrollView>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        backgroundColor: 'white'
    }
});
