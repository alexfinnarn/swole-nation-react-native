import React, {useState} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import {home, styles} from '../Styles';
import AddExercise from "../exercises/AddExercise";

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
    let add, remove, button = '';
    if (workout.id !== '') {
      add = (
        <View key="add" style={{flex: 1, flexDirection: 'column', padding: 2}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => update('UPDATE_WORKOUT')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>Go</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
      remove = (
        <View key="remove" style={{flex: 1, flexDirection: 'column', padding: 2}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => update('DELETE_WORKOUT')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      add = <Button key='add' style={{flex: 1}} onPress={() => update('CREATE_WORKOUT')} title="Save"/>;
      remove = <Text key='remove'></Text>;
    }

    button = (
      <View key="action" style={{flex: 1, flexDirection: 'column', padding: 2}}>
        <TouchableOpacity
          style={[{backgroundColor: '#21897E'}, home.actionButton]}
          onPress={() => navigation.navigate('AddExercise', {pickerEnabled: true, workout: workout})}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={home.actionButtonText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

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
