import React from 'react';
import {Image, TouchableOpacity} from "react-native";
import NavigationService from "../../services/NavigationService";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function HeaderRight() {
  return (
    <>
      <TouchableOpacity style={{flex: 1, marginRight: 10}}
                        accessible={true}
                        accessibilityLabel="Navigate to user guide"
                        onPress={() => NavigationService.navigate('WebView', {
                          url: 'https://github.com/alexfinnarn/swole-nation-react-native/wiki/User-Guide'
                        })}>
        <FontAwesome5 style={{fontSize: 30, color: '#ffffff'}} name="question"/>
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1}}
                        accessible={true}
                        accessibilityLabel="Navigate to home screen"
                        onPress={() => NavigationService.navigate('Home')}>
        <Image resizeMode="contain" style={{height: 56, width: 80}}
               source={require('../../../assets/sn-logo.png')}/>
      </TouchableOpacity>
    </>
  );
}
