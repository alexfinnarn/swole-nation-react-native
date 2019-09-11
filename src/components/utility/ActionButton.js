import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {home} from "../Styles";

export default function ActionButton({text, action, styles}) {
  return (
    <View style={[{flex: 1, flexDirection: 'column'}, styles]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[{backgroundColor: '#21897E'}, home.actionButton]}
        onPress={action}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={home.actionButtonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
