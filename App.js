import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './Components/MainScreen'
import Camera from './Components/Camera.js'

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStackNavigator />
        {/* <Camera /> */}
      </View>
    );
  }
}

const AppStackNavigator = StackNavigator({
  Main: {
    screen: MainScreen
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
