import React from 'react';
import {StyleSheet, FlatList, View} from "react-native";
import WorkoutListItem from "./WorkoutListItem";

export default function WorkoutsList(props) {
  const workouts = [
    {
      id: 1,
      name: 'No workouts',
      description: ''
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={(item) => <WorkoutListItem props={item} />}
      />
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
