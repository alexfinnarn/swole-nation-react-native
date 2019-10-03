import React, {useState} from 'react';
import {Text, View, Picker} from "react-native";
import {home} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function AddExerciseSet({item = {item: {reps: 0, weight: 100}, index: 0}, toAdd, updater}) {
  const [reps, setReps] = useState(item.item.reps.toString());
  const [weight, setWeight] = useState(item.item.weight.toString());

  function updatePicker(value, type) {
    let newReps = reps;
    let newWeight = weight;

    if (type === 'reps') {
      setReps(value);
      newReps = value;
    } else {
      setWeight(value);
      newWeight = value;
    }

    if (!toAdd) {
      updater({reps: newReps, weight: newWeight}, item.index, 'UPDATE_SET');
    }
  }

  return (
    <View style={[home.sectionContainer, {alignItems: 'center', justifyContent: 'space-between'}]} testID="add-exercise-set-root">
      <View style={{flex: 6, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1, paddingLeft: 5}}>Reps</Text>
        <Picker
          selectedValue={reps}
          testID="reps-picker"
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'reps')}>
          {[...Array(12)].map((e, index) =>
            <Picker.Item key={index.toString()} label={index.toString()} value={index.toString()}/>)}
        </Picker>
        <Text style={{flex: 1}}>Weight</Text>
        <Picker
          selectedValue={weight}
          testID="weight-picker"
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'weight')}>
          {[...Array(75)].map((e, index) =>
            <Picker.Item key={(index * 5).toString()} label={(index * 5).toString()} value={(index * 5).toString()}/>)}
        </Picker>
      </View>
      <View style={{flex: 1}}>
        {toAdd
          ? <ActionButton text="+"
                          label="Add set to exercise"
                          action={() => updater({reps: reps, weight: weight}, item.index, 'ADD_SET')}/>
          : <ActionButton text="X"
                          label={`Remove set at index of ${item.index} from exercise`}
                          action={() => updater({reps: reps, weight: weight}, item.index, 'REMOVE_SET')}/>
        }
      </View>
    </View>
  );
}

