import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function WorkoutsList(props) {
  const name = props.navigation.getParam('name', 'Foo');
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
