import React, {useState} from 'react';
import {Text, View, Button} from "react-native";
import {styles} from "../Styles";

export default function WorkoutExerciseListItem({exercise, updater, workout, navigation}) {
  const [switchValue, setSwitchValue] = useState(workout.exercises.includes(exercise.item.name));

  function updateIt(value) {
    setSwitchValue(value);
    updater(value, workout, exercise.item);
  }

  return (
    <View style={{marginTop: 10, padding: 10, flex: 1, borderWidth: 1, borderColor: '#d6d7da', borderRadius: 4, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
        <Text style={[styles.mediumTextInputFont, {flex: 4}]}>{exercise.item.name}</Text>
        <Button style={{flex: 1}} onPress={() => {navigation.navigate('AddExercise', { exerciseId: exercise.id })}} title="Edit" />
      </View>
      {exercise.item.sets.map(({ reps, weight }, index) => {
        return (
          <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.bold}>Reps: {reps}</Text>
            <Text>Weight: {weight}</Text>
          </View>
        );
      })}
    </View>
  );
}
