import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
import Camera from '../Camera'

const { width, height } = Dimensions.get('window');

class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    // TODO: get data from memory instead
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            likes: [0, 1, 2, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 1597, 2584, 4181, 6765, 10946]
            //likes: [10946, 6765, 4181, 2584, 1597, 377, 233, 144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 2, 1, 0] //reverse-sorted
        };
        };
        this.scrolling = this.scrolling.bind(this);
    }

    componentDidMount(){
      this.activeInterval = setInterval(this.scrolling, 4000);
    }

    componentWillUnmount(){
      clearInterval(this.activeInterval);
    }
    
    triggerCamera() {
      this.refs.camera.takePicture()
    }

    // Scrolling Animation
    scrolling() {
      // Start scrolling if there's more than one stock to display
      if (this.state.images.length > 1) {
          // Increment position with each new interval
          position = this.state.currentPosition + height;
          this.ticker.scrollTo({ y: position, animated: true });
          // After position passes this value, snaps back to beginning
          let maxOffset = 10000;

          // Set animation to repeat at end of scroll
          if (this.state.currentPosition > maxOffset) {
               this.ticker.scrollTo({ y: 0, animated: false })
               this.setState({ currentPosition: 0 });
          }
          else {
              this.setState({ currentPosition: position });
          }
          
          //Take a picture after scroll
          this.triggerCamera()        
      }
    }

    render() {
        return (
            <ScrollView
                style={styles.scrollview}
                vertical={true}
                ref={(ref) => this.ticker = ref}
                bounces={true}>
                <Content>
                  {this.state.images.map((item, index) => (
                    <CardComponent key={index} imageSource={item} likes={this.state.likes[item % 10]} />
                  ))}
                  <Camera ref="camera"/>
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
