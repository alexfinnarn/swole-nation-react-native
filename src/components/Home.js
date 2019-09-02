import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Text>Workouts</Text>
      <Button
        title="Edit"
        onPress={() => props.navigation.navigate('WorkoutsList', {name: 'Jane'})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
