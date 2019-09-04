import React from 'react';
import {FlatList, View} from "react-native";
import {styles} from "./Styles";
import WorkoutExerciseListItem from "./WorkoutExerciseListItem";

export default function WorkoutExerciseList({ exercises, workout, handleSelection }) {

  // Add key that is needed for rendering the <FlatList /> component.
  exercises = exercises.map((exercise) => {
    exercise.key = exercise.id.toString();
    return exercise;
  });

  return (
    <View>
      <FlatList
        data={exercises}
        renderItem={(item) => <WorkoutExerciseListItem exercise={item} updater={handleSelection} workout={workout}/>}
      />
    </View>
  )
}
