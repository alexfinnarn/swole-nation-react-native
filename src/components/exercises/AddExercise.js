import React, {useState, useEffect} from 'react';
import {Text, View, Switch, TextInput, Button, FlatList, Picker, TouchableOpacity} from "react-native";
import {home, styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";
import shortId from "shortid";

export default function AddExercise({exercises, thing, handleUpdate, addExercise, navigation, theExercise, pickerEnabled}) {
  const exerciseSelected = theExercise.name !== '';
  const [choice, setChoice] = useState(theExercise.id);
  const [name, setName] = useState(theExercise.name);
  const [exercise, setExercise] = useState(theExercise);

  function updateExercisePicker(id) {
    setChoice(id);
    setExercise(exercises.find(exercise => exercise.id === id));
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
        {exerciseSelected
          ? <Picker
            enabled={pickerEnabled}
            selectedValue={choice}
            style={{height: 70, width: 300}}
            onValueChange={(itemValue) => updateExercisePicker(itemValue)}>
            {exercises.map((exercise) => <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id}/>)}
          </Picker>
          : <TextInput
            style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}
            placeholder="Enter Exercise"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        }
      </View>
      <View style={{flex: 8}}>
        <Text style={{fontSize: 16}}>Sets</Text>
        <FlatList
          data={exercise.sets}
          extraData={thing}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => <AddExerciseSet updater={handleUpdate} exercise={exercise} item={item}/>}
        />
      </View>
      <View style={{flex: 2, marginTop: 5}}>
        <Text style={{fontSize: 16}}>Add Exercise:</Text>
        <AddExerciseSet updater={handleUpdate} exercise={exercise} toAdd={true}/>
      </View>
      <View key="remove" style={{flex: 1, flexDirection: 'column', padding: 2}}>
        <TouchableOpacity
          style={[{backgroundColor: '#21897E'}, home.actionButton]}
          onPress={() => {
            addExercise(exercise);
            navigation.goBack();
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={home.actionButtonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
