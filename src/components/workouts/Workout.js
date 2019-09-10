import React, {useState} from 'react';
import {Text, View, TextInput, Button} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import {styles} from '../Styles';
import AddExercise from "../exercises/AddExercise";

export default function Workout({workout = {id: '', name: '', description: '', exercises: []}, handleUpdate, navigation}) {
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);

  function update(action) {
    let newWorkout = workout;
    newWorkout.name = name;
    newWorkout.description = description;
    handleUpdate(newWorkout, action);

    if (action === 'CREATE_WORKOUT') {
      navigation.navigate('Session');
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={{flex: 2}}>
        <Text style={styles.bold}>Workout Name</Text>
        <TextInput
          style={[styles.editText, styles.mediumTextInputFont]}
          placeholder="Workout A"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.bold}>Workout Description</Text>
        <TextInput
          style={[styles.editText, styles.smallTextInputFont]}
          multiline
          placeholder="Workout Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>
      <View style={{flex: 6}}>
        <WorkoutExerciseListProvider workout={workout} navigation={navigation}/>
      </View>
      <View style={{marginTop: 20, flex: 1, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
        {workout.id !== ''
          ? <Button style={{flex: 1}} onPress={() => update('UPDATE_WORKOUT')} title="Save"/>
          : <Button style={{flex: 1}} onPress={() => update('CREATE_WORKOUT')} title="Go"/>
        }
        {workout.id !== ''
          ? <Button style={{flex: 1}} onPress={() => update('DELETE_WORKOUT')} title="Delete"/>
          : <Text></Text>
        }
        <Button style={{flex: 1, alignSelf: "flex-end"}} onPress={() => {
          navigation.navigate('AddExercise', {pickerEnabled: true, workout: workout});
        }} title="Add Exercise"/>
      </View>
    </View>
  );
}
