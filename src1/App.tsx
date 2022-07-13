import React from "react";
import {View,Text,StyleSheet} from 'react-native'
import ReactHlsPlayer from 'react-hls-player';
import Video from 'react-native-video';
import { useState } from "react/cjs/react.production.min";
import JWPlayer, { JWPlayerState } from 'react-native-jw-media-player';
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ScreenA from "./screens/ScreenA";
// import ScreenB from "./screens/ScreenB";
// import ScreenC from "./screens/ScreenC";
// import LinkingScreen from "./screens/LinkingScreen";

// const Stack = createNativeStackNavigator();

// function MyStack() {
//   return (
//     <View>
//       <Text>xjdjdjdjj</Text>
//     </View>
//     // <Stack.Navigator>
//     //   <Stack.Screen name="ScreenA" component={ScreenA} />
//     //   <Stack.Screen name="ScreenB" component={ScreenB} />
//     //   <Stack.Screen name="ScreenC" component={ScreenC} />
//     //   <Stack.Screen name="LinkingScreen" component={LinkingScreen} />
//     // </Stack.Navigator>
//   );
// }

const config = {
  screens: {
    ScreenA: "a",
    ScreenB: {
      path: "b/:message",
      parse: {
        message: (message) => `${message}`
      }
    },
    ScreenC: "c",
  }
}

export default function App() {
  // const [ref,setRef]=useState()
  return (
  <View style={{flex:1,backgroundColor:'red',}}>

      <Video
        
          source={{
            description: '(mp4) big buck bunny',
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          controls={true}
          resizeMode='contain'
      style={{
       flex:1,
        backgroundColor:'yellow',
        transform : [{rotate : '90deg'}] ,
     
         left : -500/2 ,
      width : 700,
        //  backgroundColor : 'teal' 
      }}
        />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    flex: 1,
  },
});