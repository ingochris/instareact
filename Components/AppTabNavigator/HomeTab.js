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

const GCPkey = 'AIzaSyDU-d27bN7qDBezYH22grPUYs8xfV0bgKE';

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
            images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            likes: [0, 1, 2, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 1597, 2584, 4181, 6765, 10946],
            liked: false
        };
        this.scrolling = this.scrolling.bind(this);
        this.updateLikesValue = this.updateLikesValue.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
    }

    componentDidMount(){
      this.activeInterval = setInterval(this.scrolling, 4000);
    }

    componentWillUnmount(){
      clearInterval(this.activeInterval);
    }

    playAnimation() {
      // Start scrolling if there's more than one stock to display
      if (this.state.images.length > 1) {
          // Increment position with each new interval
          position = this.state.currentPosition + height -165;
          this.ticker.scrollTo({ y: position, animated: true });
          // After position passes this value, snaps back to beginning
          let maxOffset = 10000;

          // Set animation to repeat at end of scroll
          if (this.state.currentPosition > maxOffset) {
               this.ticker.scrollTo({ y: 0, animated: false })
               this.setState({ currentPosition: 0 });
          }
          else {
              this.setState({
                currentPosition: position,
                liked: false
              });
          }
        }
    }
    
    async analyzeImage(base64) {
      
        const body = {
          requests:[
            {
              image:{
                content: base64,
              },
              features:[
                {
                  type: 'FACE_DETECTION',
                  maxResults: 1,
                }
              ]
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
        
	try{
	  const parsed = await response.json()
          
	  const face = parsed.responses[0].faceAnnotations[0];        
          const happy = face.joyLikelihood;
          const sad = face.sorrowLikelihood;
        
	  console.log('HAPPINESS LIKELIHOOD: ', happy)
          console.log('SADNESS LIKELIHOOD: ', sad)
	}
	catch(err)
	{
	  console.log('NO FACE DETECTED')
	}  
    }

    // Scrolling Animation
    scrolling() {
      let VALUE_RETURNED_BY_GOOGLE = 5;
      this.updateLikesValue(this.state.currentIndex, VALUE_RETURNED_BY_GOOGLE);
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        liked: true
      });
      
    
      // Take a picture after scroll
      this.refs.camera.takePicture().then((data) => {
        const image = data.base64;
        this.analyzeImage(image);
      })
      setTimeout(this.playAnimation, 500);
    }

    updateLikesValue(index, reaction) {
      let arr = this.state.likes;
      arr[index] += reaction;
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
                    <CardComponent key={index} imageSource={item} likes={this.state.likes[item % 20]} liked={this.state.liked} />
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
