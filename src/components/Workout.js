import React from 'react';
import { Text, View } from "react-native";

export default function Workout(props) {
  const { name, description } = props.navigation.getParam('workout', {name: 'Foo', description: 'Bar'});
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={(text) => this.setState({text})}
        value={name}
      />
      <Text>{description}</Text>
    </View>
  );
}
