import React, {useState} from 'react';
import {Text, TextInput, View} from "react-native";
import {styles} from "../Styles";

export default function AddExercise({workout}) {
  const [reps, setReps] = useState('');

  return (
    <View style={{flex:1}}>
      <Text style={{flex:1}}>{workout.name}</Text>
      <TextInput
        style={[
          styles.editText,
          styles.mediumTextInputFont,
          {flex: 1}
        ]}
        placeholder="5"
        onChangeText={(reps) => setReps(reps)}
        value={reps}
      />
    </View>
  );
}
