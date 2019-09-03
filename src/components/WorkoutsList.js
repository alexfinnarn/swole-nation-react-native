import React from 'react';
import {StyleSheet, FlatList, View} from "react-native";
import WorkoutListItem from "./WorkoutListItem";
import {styles} from './Styles';

export default function WorkoutsList({ navigation, workouts }) {
  // Add key that is needed for rendering the <FlatList /> component.
  workouts = workouts.map((workout) => {
    workout.key = workout.id.toString();
    return workout;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={(item) => <WorkoutListItem workout={item} navigation={navigation}/>}
      />
    </View>
  )
}

