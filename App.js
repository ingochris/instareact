import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Camera from './modules/Camera.js'

export default class App extends React.Component {
  
  render() {
    return(
      <View style={{ flex: 1 }}>
        <Camera></Camera>    
      </View>
    )
  }
}
