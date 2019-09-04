import React from 'react';
import {Button, FlatList, View} from "react-native";
import WorkoutListItem from "./WorkoutListItem";
import {styles} from './Styles';

export default function WorkoutsList({ workouts, navigation }) {
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
      <Button onPress={() => navigation.navigate('Workout')} title="Add" />
    </View>
  )
}

