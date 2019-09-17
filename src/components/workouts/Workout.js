import React, {useState} from 'react';
import {Text, View, TextInput, Picker} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import {home, styles} from '../Styles';
import AddExercise from "../exercises/AddExercise";
import ActionButton from "../utility/ActionButton";

function Workout({workout, handle, navigation, transformers}) {
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const [transformerKey, setTransformerKey] = useState(transformers[0].key);

  function update(action) {
    let newWorkout = workout;
    newWorkout.name = name;
    newWorkout.description = description;
    handle.update(newWorkout, action, transformerKey);

    if (action === 'CREATE_SESSION') {
      navigation.navigate('Session');
    } else {
      navigation.goBack();
    }
  }

  function ActionButtons(workout) {
    let add = '';
    if (navigation.getParam('action', '') === 'go') {
      add = <ActionButton styles={{ marginRight: 5 }} key="add" text="Go" action={() => update('CREATE_SESSION')}/>;
    } else {
      add = <ActionButton styles={{ marginRight: 5 }} key="add" text="Save" action={() => update('UPDATE_WORKOUT')}/>;
    }

    const button = <ActionButton key="button" text="Add Exercise" action={() =>
      navigation.navigate('AddExercise', {pickerEnabled: true, workout: workout})}/>;

    return ([add, button]);
  }

  return (
    <View style={{padding: 10, flex: 1}}>
      <View style={{flex: 3}}>
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
        <Picker
          selectedValue={transformerKey}
          style={{height: 70, width: 160, flex:1}}
          onValueChange={(value) => setTransformerKey(value)}>
          {transformers.map((tr) => <Picker.Item key={tr.key} label={tr.label} value={tr.key}/>)}
        </Picker>
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

Workout.navigationOptions = {
  title: 'Workout'
};

export default Workout;
