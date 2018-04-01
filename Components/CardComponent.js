import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

const LIKE_ICON = require('../assets/reacts/like.png')
const REALLY_LIKE_ICON = require('../assets/reacts/love.png')

class CardComponent extends Component {
  
    constructor(props){
      super(props)
      this.getReact = this.getReact.bind(this)
    }
  
    getReact(){
      if(this.props.liked){
        return this.props.icon == 'LIKE_ICON' ? LIKE_ICON : REALLY_LIKE_ICON
      }   
    }

    render() {
        const images = {
            "0": require('../assets/feed_images/0.jpg'),
            "1": require('../assets/feed_images/1.jpg'),
            "2": require('../assets/feed_images/2.jpg'),
            "3": require('../assets/feed_images/3.jpg'),
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
                            <Text note>April 1, 2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={images[this.props.imageSource]} style={{ height: 200, width: null, flex: 1 }} />
                    {
                      this.props.liked && 
                      <Image id={this.props.imageSource} source={this.getReact()}
                      style={{ position: 'absolute', height: 87, width: 100, left: '35%' }}/>
                    }
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

                <CardItem style={styles.likesText}>
                    <Text style={{ fontSize: 20 }}>{this.props.likes} likes</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>Tyler </Text>
                            Hello from LA Hacks! This is a typical Instagram post.
                            You could easily hit a button in order to like a page, or even
                            scroll down the page yourself, but we want to see you make funny expressions.
                            Hopefully, youll find it a lot easier than using your thumb to like messages.
                            #NoFilter #Extra #YouThought #EdgyTeens #FlavorFilled #TenOutOfTen
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    likesText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
