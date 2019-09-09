import React, {useState} from 'react';
import {Text, TextInput, View, Picker, Button} from "react-native";
import shortId from 'shortid';
import {styles} from "../Styles";

export default function AddExerciseSet({item = {key: "0", reps: 0, weight: 100}, exercise, toAdd, updater}) {
  // console.log(item);
  const [reps, setReps] = useState(item.reps.toString());
  const [weight, setWeight] = useState(item.weight.toString());

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, borderWidth: 1, borderColor: '#d6d7da', borderRadius: 4}}>
      <Text>Reps</Text>
      <Picker
        selectedValue={reps}
        style={{height: 60, width: 120}}
        onValueChange={(itemValue) => setReps(itemValue)}>
        {[...Array(12)].map((e, index) => <Picker.Item key={index.toString()} label={index.toString()} value={index.toString()}/>)}
      </Picker>
      <Text>Weight</Text>
      <Picker
        selectedValue={weight}
        style={{height: 60, width: 120}}
        onValueChange={(itemValue) => setWeight(itemValue)}>
        {[...Array(75)].map((e, index) => <Picker.Item key={(index * 5).toString()} label={(index * 5).toString()} value={(index * 5).toString()}/>)}
      </Picker>
      {toAdd
        ? <Button onPress={() => {
          updater({reps: reps, weight: weight}, exercise, shortId.generate(), 'ADD_SET')
        }} title="+"/>
        : <Button onPress={() => {
          updater({key: item.key, reps: reps, weight: weight}, exercise, shortId.generate(), 'REMOVE_SET')
        }} title="X"/>
      }
    </View>

  );
}

