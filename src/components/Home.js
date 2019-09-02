import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

export default function Home(props) {
  const workouts = [
    {
      id: 1,
      name: 'Stronglifts A',
      description: 'Squats, Overhead Press, Deadlifts'
    },
    {
      id: 2,
      name: 'Stronglifts B',
      description: 'Squats, Bench Press, Barbell Row'
    }
  ];

  return (
    <View style={styles.container}>
      <Text>Workouts</Text>
      <Button
        title="Edit"
        onPress={() => props.navigation.navigate('WorkoutsList', {workouts: workouts})}
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
