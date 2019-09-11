import React, {useState} from 'react';
import {Text, TextInput, View, Picker, Button, TouchableOpacity} from "react-native";
import shortId from 'shortid';
import {home} from '../Styles';

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

  function ActionButton(workout) {
    let button = '';
    if (toAdd) {
      button = (
        <View key="add" style={{flex: 1, flexDirection: 'column', padding: 2}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => updater({reps: reps, weight: weight}, exercise, shortId.generate(), 'ADD_SET')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      button = (
        <View key="remove" style={{flex: 1, flexDirection: 'column', padding: 2}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => updater({key: item.key, reps: reps, weight: weight}, exercise, shortId.generate(), 'REMOVE_SET')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return ([button]);
  }

  return (
    <View style={[ home.sectionContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
      <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex:1}}>Reps</Text>
        <Picker
          selectedValue={reps}
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'reps')}>
          {[...Array(12)].map((e, index) =>
            <Picker.Item key={index.toString()} label={index.toString()} value={index.toString()}/>)}
        </Picker>
        <Text style={{flex:1}}>Weight</Text>
        <Picker
          selectedValue={weight}
          style={{height: 60, width: 120, flex: 2}}
          onValueChange={(itemValue) => updatePicker(itemValue, 'weight')}>
          {[...Array(75)].map((e, index) =>
            <Picker.Item key={(index * 5).toString()} label={(index * 5).toString()} value={(index * 5).toString()}/>)}
        </Picker>
      </View>
      <View style={{flex:1}}>
        <ActionButton/>
      </View>
    </View>

  );
}

