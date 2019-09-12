import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function WorkoutsList({ exercises, navigation }) {
  // Add key that is needed for rendering the <FlatList /> component.
  exercises = exercises.map((exercise) => {
    exercise.key = exercise.id.toString();
    return exercise;
  });

  function ExercisesListItem({exercise}) {
    return (
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>{exercise.item.name}</Text>
          <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
        </View>
        <ActionButton text="Edit" action={() => navigation.navigate('AddExercise', {exerciseId: exercise.item.id})}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          data={exercises}
          renderItem={(item) => <ExercisesListItem exercise={item}/>}
        />
      </View>
      <ActionButton text="Add Exercise" action={() => navigation.navigate('AddExercise')} />
    </View>
  )
}



