import React, {useState} from 'react';
import {Text, View, TextInput, FlatList, Picker} from "react-native";
import {styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";
import ActionButton from "../utility/ActionButton";

export default function AddExercise({exercises, thing, handleUpdate, saveExercise, navigation, theExercise, pickerEnabled}) {
  const exerciseSelected = theExercise.name !== '';
  const [choice, setChoice] = useState(theExercise.key);
  const [name, setName] = useState(theExercise.name);
  const [exercise, setExercise] = useState(theExercise);

  function updateExercisePicker(key) {
    setChoice(key);
    setExercise(exercises.find(exercise => exercise.key === key));
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
            {Object.keys(exercises).map((key) => <Picker.Item key={key} label={exercises[key].name} value={key}/>)}
          </Picker>
          : <TextInput
            style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}
            placeholder="Enter Exercise"
            onChangeText={text => setName(text)}
            value={name}
          />
        }
      </View>
      <View style={{flex: 8}}>
        <Text style={{fontSize: 16}}>Sets</Text>
        <FlatList
          data={exercise.sets}
          extraData={thing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => <AddExerciseSet updater={handleUpdate} exercise={exercise} item={item}/>}
        />
      </View>
      <View style={{flex: 2, marginTop: 5}}>
        <Text style={{fontSize: 16}}>Add Exercise:</Text>
        <AddExerciseSet updater={handleUpdate} exercise={exercise} toAdd={true}/>
      </View>
      <ActionButton text={exercise.connectedWorkout ? 'Add' : 'Save'}
                    action={() => {
                      if (!exerciseSelected) {
                        exercise.name = name;
                      }
                      saveExercise(exercise);
                      navigation.goBack();
                    }}/>
    </View>
  );
}
