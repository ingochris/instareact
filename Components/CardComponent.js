import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {

    render() {
        const images = {
            "0": require('../assets/feed_images/20.jpg'),
            "1": require('../assets/feed_images/1.jpg'),
            "2": require('../assets/feed_images/2.jpg'),
            "3": require('../assets/feed_images/3.png'),
            "4": require('../assets/feed_images/4.jpg'),
            "5": require('../assets/feed_images/5.jpg'),
            "6": require('../assets/feed_images/6.jpg'),
            "7": require('../assets/feed_images/7.jpg'),
            "8": require('../assets/feed_images/8.jpg'),
            "9": require('../assets/feed_images/9.jpg'),
            "10": require('../assets/feed_images/10.jpg'),
            "11": require('../assets/feed_images/11.jpg'),
            "12": require('../assets/feed_images/12.jpg'),
            "13": require('../assets/feed_images/13.jpg'),
            "14": require('../assets/feed_images/14.jpg'),
            "15": require('../assets/feed_images/15.jpg'),
            "16": require('../assets/feed_images/16.jpg'),
            "17": require('../assets/feed_images/17.jpg'),
            "18": require('../assets/feed_images/18.jpg'),
            "19": require('../assets/feed_images/19.jpg'),
            "20": require('../assets/feed_images/20.jpg')
        }
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.png')} />
                        <Body>
                            <Text style={{ fontWeight: "900" }}>Tyler </Text>
                            <Text note>Jan 15, 2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={images[this.props.imageSource]} style={{ height: 200, width: null, flex: 1 }} />
                    <Image source={require('../assets/heart.png')} style={{ position: 'absolute', height: 100, width: 115, left: '35%' }}/>
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="ios-heart-outline" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles-outline" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send-outline" style={{ color: 'black' }} />
                        </Button>
                    </Left>
                </CardItem>

                <CardItem style={{ height: 20 }}>
                    <Text>{this.props.likes} likes</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>Tyler </Text>
                            Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
