import React, { useState } from 'react';
import {Text, View, Switch, TextInput} from "react-native";
import {styles} from "../Styles";

export default function WorkoutExerciseListItem({ exercise, updater, workout }) {
  const [switchValue, setSwitchValue] = useState(workout.exercises.includes(exercise.item.name));
  const [weight, setWeight] = useState(exercise.index.toString());

  function updateIt(value) {
    setSwitchValue(value);
    updater(value, weight, workout, exercise.item);
  }

  return (
    <View style={{marginTop: 10, padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={[styles.mediumTextInputFont,{ flex: 4 }]}>{ exercise.item.name }</Text>
      <TextInput
        style={[
          styles.editText,
          styles.mediumTextInputFont,
          { flex: 1 }
        ]}
        placeholder="Workout A"
        onChangeText={(weight) => setWeight(weight)}
        value={weight}
      />
      <Switch style={{ flex: 1 }} onValueChange={(value) => updateIt(value)} value={switchValue}/>
    </View>
  );
}
