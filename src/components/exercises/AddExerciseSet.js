import React, {useState} from 'react';
import {Text, View, Picker} from "react-native";
import shortId from 'shortid';
import {home} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function AddExerciseSet({item = {key: "0", reps: 0, weight: 100}, exercise, toAdd, updater}) {
  const [reps, setReps] = useState(item.reps.toString());
  const [weight, setWeight] = useState(item.weight.toString());

  function updatePicker(value, type) {
    if (type === 'reps') {
      setReps(value);
      updater({reps: value, weight: weight, key: item.key}, exercise, shortId.generate(), 'UPDATE_SET');
    } else {
      setWeight(value);
      updater({reps: reps, weight: value, key: item.key}, exercise, shortId.generate(), 'UPDATE_SET');
    }
  }

  return (
    <View style={[home.sectionContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
      <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1}}>Reps</Text>
        <Picker
          selectedValue={reps}
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'reps')}>
          {[...Array(12)].map((e, index) =>
            <Picker.Item key={index.toString()} label={index.toString()} value={index.toString()}/>)}
        </Picker>
        <Text style={{flex: 1}}>Weight</Text>
        <Picker
          selectedValue={weight}
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'weight')}>
          {[...Array(75)].map((e, index) =>
            <Picker.Item key={(index * 5).toString()} label={(index * 5).toString()} value={(index * 5).toString()}/>)}
        </Picker>
      </View>
      <View style={{flex: 1}}>
        {toAdd
          ? <ActionButton text="+" action={() =>
            updater({reps: reps, weight: weight}, exercise, shortId.generate(), 'ADD_SET')}/>
          : <ActionButton text="X" action={() =>
            updater({key: item.key, reps: reps, weight: weight}, exercise, shortId.generate(), 'REMOVE_SET')}/>
        }
      </View>
    </View>

  );
}

