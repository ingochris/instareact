import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
import Camera from '../Camera'

const { width, height } = Dimensions.get('window');
const GCPkey = 'AIzaSyDU-d27bN7qDBezYH22grPUYs8xfV0bgKE';

const NUM_IMAGES = 20;
const MAX_LIKES = 300;

class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            currentPosition: 0,
            images: Array.apply(null, {length: NUM_IMAGES}).map(Function.call, Number),
            likes: Array.apply(null, {length: NUM_IMAGES}).map(Function.call, this.generateRandomLikes),
            icon: null
        };
        this.scrollDown = this.scrollDown.bind(this);
        this.updateLikes = this.updateLikes.bind(this);
        this.nextImage = this.nextImage.bind(this);
    }

    componentDidMount(){
      setTimeout(this.scrollDown, 2000); //Start scrolling
    }
    
    generateRandomLikes(){
      return Math.floor(Math.random() * MAX_LIKES) + 1;
    }

    nextImage() {
      if (this.state.images.length > 1) {
          this.setState({
            currentIndex: this.state.currentIndex + 1,
            liked: false,
            icon: null //Reset
          });
          
          // Increment position with each new interval
          let position = this.state.currentPosition + height * 0.93;
          this.ticker.scrollTo({ y: position, animated: true });

          // After position passes this value, snaps back to beginning
          let maxOffset = 10000;
          
          // Set animation to repeat at end of scroll
          if (this.state.currentPosition > maxOffset) {
               this.ticker.scrollTo({ x: 0, animated: false })
               this.setState({ currentPosition: 0 });
          }
          else {
              this.setState({ currentPosition: position });
          }
      }
      
      this.scrollDown();
    }

    async analyzeImage(base64) {
        const body = {
          requests:[
            {
              image:{
                content: base64,
              },
              features:[{
                  type: 'FACE_DETECTION',
                  maxResults: 1,
              }]
            },
          ],
        };

        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GCPkey}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

    	  const parsed = await response.json();

        if (parsed.responses && parsed.responses[0].faceAnnotations) {
          const face = parsed.responses[0].faceAnnotations[0];
          return face.joyLikelihood;
        } else {
          console.log('NO FACE DETECTED');
          return null;
        }
        /*
         * Possible Enums this function returns:
         * UNKNOWN +0
         * VERY_UNLIKELY +0
         * UNLIKELY +0
         * POSSIBLE +1
         * LIKELY +1
         * VERY_LIKELY +2
         */
    }

    // Infinite Scroll
    scrollDown() {

      // Take a picture and send to GCP before moving on to next image
      this.refs.camera.takePicture().then((data) => {
        const image = data.base64;
        this.analyzeImage(image).then((likelihood) => {
          // Update value and increment
          console.log('LIKELIHOOD: ', likelihood)          
          this.updateLikes(likelihood);
          
          setTimeout(this.nextImage, 300)
        });
      });
      
    }
    
    updateLikes(likelihood) {
      let like = 0;
      switch(likelihood){
        case 'VERY_LIKELY': 
          like = 10; 
          this.setState({ icon: 'REALLY_LIKE_ICON', liked: true })
          break;
        case 'LIKELY':
        case 'POSSIBLE':
          like = 5; 
          this.setState({ icon: 'LIKE_ICON', liked: true })
          break;
        default: //Does not like
          this.setState({ icon: 'NEUTRAL_ICON', liked: false })
          break;
      }
      
      let arr = this.state.likes;
      arr[this.state.currentIndex] += like;
      
      this.setState({ likes: arr });
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
                    <CardComponent key={index} imageSource={item}
                      likes={this.state.likes[item % 20]} liked={this.state.liked} icon={this.state.icon}/>
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
