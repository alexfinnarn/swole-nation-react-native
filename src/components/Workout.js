import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Button} from "react-native";
import WorkoutExerciseListProvider from "./WorkoutExerciseListProvider";
import { styles } from './Styles';


export default function Workout({workout, handleUpdate, navigation}) {
  function update(action) {
    let newWorkout = workout;
    newWorkout.name = name;
    newWorkout.description = description;
    handleUpdate(newWorkout, action);
    navigation.goBack();
  }

  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={{flex: 9}}>
        <Text style={styles.bold}>Workout Name</Text>
        <TextInput
          style={[
            styles.editText,
            styles.mediumTextInputFont
          ]}
          placeholder="Workout A"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.bold}>Workout Description</Text>
        <TextInput
          style={[
            styles.editText,
            styles.smallTextInputFont,
            styles.multiline
          ]}
          multiline
          placeholder="Workout Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <Text style={[styles.bold, {marginTop: 15, fontSize: 20}]}>Exercises</Text>
        <WorkoutExerciseListProvider workout={workout}/>
      </View>
      <View style={{marginTop: 20, flex: 1, width: 125, flexDirection: 'row-reverse', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        {workout.id !== 0
          ? <Button style={{ backgroundColor: 'red'}} onPress={() => update('DELETE_WORKOUT')} title="Delete"/>
          : <Text></Text>
        }
        {workout.id !== 0
          ? <Button  onPress={() => update('UPDATE_WORKOUT')} title="Save"/>
          : <Button  onPress={() => update('CREATE_WORKOUT')} title="Add"/>
        }
      </View>
    </View>

  );
}
