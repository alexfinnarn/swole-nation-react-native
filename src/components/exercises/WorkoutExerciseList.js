import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from "../Styles";
import ActionButton from "../utility/ActionButton";

export default function WorkoutExerciseList({ exercises, navigation, thing }) {
  // Add key that is needed for rendering the <FlatList /> component.
  exercises = exercises.map((exercise) => {
    exercise.key = exercise.id.toString();
    return exercise;
  });

  function WorkoutExerciseListItem({exercise}) {
    return (
      <View style={[home.sectionContainer]}>
        <View style={home.sectionLeft}>
          <Text style={[styles.mediumTextInputFont, {flex: 4, paddingBottom: 10}]}>{exercise.item.name}</Text>
          {exercise.item.sets.map(({reps, weight}, index) => {
            return (
              <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.bold}>Reps: {reps}</Text>
                <Text>Weight: {weight}</Text>
              </View>
            );
          })}
        </View>
        <ActionButton text="Edit" action={() =>
          navigation.navigate('AddExercise', {exerciseId: exercise.item.id, pickerEnabled: false})}/>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        extraData={thing}
        data={exercises}
        renderItem={(item) => <WorkoutExerciseListItem exercise={item} />}
      />
    </View>
  )
}
