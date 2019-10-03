import React, {useState} from 'react';
import {Text, View, TextInput, Picker} from "react-native";
import WorkoutExerciseListProvider from "../exercises/WorkoutExerciseListProvider";
import {home, styles} from '../Styles';
import AddExercise from "../exercises/AddExercise";
import ActionButton from "../utility/ActionButton";

function Workout({workout, handle, navigation, transformers, actionType}) {
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const [transformerKey, setTransformerKey] = useState(transformers[0].key);

  function update(action) {
    let newWorkout = workout;
    newWorkout.name = name;
    newWorkout.description = description;
    handle.update(newWorkout, action, transformerKey);

    if (action === 'CREATE_SESSION') {
      navigation.navigate('Session', { title: new Date(Date.now()).toLocaleString('en-US')});
    } else {
      navigation.goBack();
    }
  }

  function ActionButtons(workout) {
    let add = '';
    if (actionType === 'go') {
      add = <ActionButton label="Start new session" key="add" text="Go" action={() => update('CREATE_SESSION')}/>;
    } else {
      add = <ActionButton label={`Update ${workout.name} workout`} key="add" text="Save" action={() => update('UPDATE_WORKOUT')}/>;
    }

    // Take this feature out for now. feature/123.
    // const button = <ActionButton label="Create new exercise" key="button" text="Add Exercise" action={() =>
    // navigation.navigate('AddExercise', {pickerEnabled: true, workout: workout})}/>;
    return (add);
  }

  return (
    <View style={{padding: 10, flex: 1}} testID="workout-root">
      <View style={{flex: 2}}>

        {/*<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*  <Text style={[styles.bold, styles.mediumTextInputFont, {flex: 1}]}>Name</Text>*/}
        {/*  <TextInput*/}
        {/*    style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}*/}
        {/*    placeholder="Workout A"*/}
        {/*    onChangeText={(text) => setName(text)}*/}
        {/*    value={name}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.bold, styles.mediumTextInputFont, {flex: 1}]}>Info</Text>
          <TextInput
            style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}
            multiline
            placeholder="Workout Description"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', marginBottom: 15}}>
          <Text style={[styles.bold, styles.mediumTextInputFont, {flex: 1, paddingBottom: 15}]}>Mod</Text>
          <Picker
            selectedValue={transformerKey}
            testID="transformer-picker"
            style={{ flex: 4}}
            onValueChange={(value) => setTransformerKey(value)}>
            {transformers.map((tr) => <Picker.Item key={tr.key} label={tr.label} value={tr.key}/>)}
          </Picker>
        </View>
      </View>
      <View style={{flex: 8}}>
        <WorkoutExerciseListProvider workout={workout} navigation={navigation}/>
      </View>
      <View style={{marginTop: 20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <ActionButtons workout={workout}/>
      </View>
    </View>
  );
}

Workout.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Workout')
  };
};

export default Workout;
