import React, {useState} from 'react';
import {Text, View} from "react-native";
import {styles, home} from "../Styles";
import ActionButton from "../utility/ActionButton";

export default function WorkoutExerciseListItem({exercise, updater, workout, navigation}) {
  const [switchValue, setSwitchValue] = useState(workout.exercises.includes(exercise.item.name));

  function updateIt(value) {
    setSwitchValue(value);
    updater(value, workout, exercise.item);
  }

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
