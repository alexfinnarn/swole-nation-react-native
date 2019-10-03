import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {home} from "../Styles";

export default function ActionButton({text, action, label, styles, disabled = false}) {
  const bgColor = disabled ? '#bababa' : '#21897E';

  return (
    <View style={[{flex: 1, flexDirection: 'column'}, styles]}>
      <TouchableOpacity
        disabled={disabled}
        accessible={true}
        accessibilityLabel={label}
        activeOpacity={0.6}
        style={[{backgroundColor: bgColor}, home.actionButton]}
        onPress={action}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={home.actionButtonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
