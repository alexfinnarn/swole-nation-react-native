import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity} from "react-native";
import {styles, home} from "../Styles";

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
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity
          style={[{backgroundColor: '#21897E'}, home.actionButton]}
          onPress={() =>  navigation.navigate('AddExercise', {exerciseId: exercise.item.id, pickerEnabled: false})}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={home.actionButtonText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
