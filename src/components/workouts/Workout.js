import React, {useState} from 'react';
import {Text, View, TextInput} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import {home, styles} from '../Styles';
import AddExercise from "../exercises/AddExercise";
import ActionButton from "../utility/ActionButton";

export default function Workout({workout = {id: '', name: '', description: '', exercises: []}, handle, navigation}) {
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);

  function update(action) {
    let newWorkout = workout;
    newWorkout.name = name;
    newWorkout.description = description;
    handle.update(newWorkout, action);

    if (action !== 'CREATE_WORKOUT') {
      handle.createSession();
      navigation.navigate('Session');
    } else {
      navigation.goBack();
    }
  }

  function ActionButtons(workout) {
    let add, remove = '';
    if (workout.id !== '') {
      add = <ActionButton styles={{ paddingRight: 5 }} key="add" text="Go" action={() => update('UPDATE_WORKOUT')}/>;
      remove = <ActionButton styles={{ paddingRight: 5 }} key="remove" text="Delete" action={() => update('DELETE_WORKOUT')}/>;
    } else {
      add = <ActionButton key="add" text="Save" action={() => update('CREATE_WORKOUT')}/>;
      remove = <Text key="remove"></Text>;
    }

    const button = <ActionButton key="button" text="Add" action={() =>
      navigation.navigate('AddExercise', {pickerEnabled: true, workout: workout})}/>;

    return ([add, remove, button]);
  }

  return (
    <View style={{padding: 10, flex: 1}}>
      <View style={{flex: 2}}>
        <Text style={styles.bold}>Workout Name</Text>
        <TextInput
          style={[styles.editText, styles.mediumTextInputFont]}
          placeholder="Workout A"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.bold, {paddingTop: 10}]}>Workout Description</Text>
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
      <View style={{marginTop: 20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <ActionButtons workout={workout}/>
      </View>
    </View>
  );
}
