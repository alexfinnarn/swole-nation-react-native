import React, {useState} from 'react';
import {Text, View, TextInput, Button} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import { styles } from '../Styles';
import AddExercise from "../exercises/AddExercise";


export default function Workout({workout = {id: 0, name: '', description: '', exercises: []}, handleUpdate, navigation}) {
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
      <View style={{flex: 9}}>
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
        <Text style={[styles.bold, {fontSize: 20}]}>Exercises</Text>
        <WorkoutExerciseListProvider style={{flex: 1}} workout={workout} navigation={navigation}/>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', }}>
          <Text style={{flex: 2, fontSize: 20}} >Add Exercise</Text>
          <Button style={{flex: 1}} onPress={() => {navigation.navigate('AddExercise')}} title="Plus Icon"/>
        </View>
      </View>
      <View style={{marginTop: 20, flex: 1, width: 125, flexDirection: 'row-reverse', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        {workout.id !== 0
          ? <Button style={{ backgroundColor: 'red'}} onPress={() => update('DELETE_WORKOUT')} title="Delete"/>
          : <Text></Text>
        }
        {workout.id !== 0
          ? <Button  onPress={() => update('UPDATE_WORKOUT')} title="Save"/>
          : <Button  onPress={() => update('CREATE_WORKOUT')} title="Go"/>
        }
      </View>
    </View>
  );
}
