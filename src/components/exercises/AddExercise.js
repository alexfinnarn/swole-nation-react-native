import React, {useState, useEffect} from 'react';
import {Text, View, Switch, TextInput, Button, FlatList, Picker} from "react-native";
import {styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";

export default function AddExercise({exercises, thing, handleUpdate, addExercise, navigation, theExercise, pickerEnabled}) {
  const [choice, setChoice] = useState(theExercise.id);
  const [exercise, setExercise] = useState(theExercise);
  const [switchValue, setSwitchValue] = useState(true);

  function updateExercisePicker(id) {
    setChoice(id);
    setExercise(exercises.find(exercise => exercise.id === id));
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {switchValue
          ? <Picker
            enabled={pickerEnabled}
            selectedValue={choice}
            style={{height: 70, width: 300}}
            onValueChange={(itemValue) => updateExercisePicker(itemValue)}>
            {exercises.map((exer) => <Picker.Item key={exer.id} label={exer.name} value={exer.id}/>)}
          </Picker>
          : <TextInput
            style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}
            placeholder="Enter Exercise"
            onChangeText={(text) => setChoice(text)}
            value={choice}
          />
        }
        <Switch style={{flex: 1}} onValueChange={(value) => setSwitchValue(value)} value={switchValue}/>
      </View>
      <View style={{flex: 6}}>
        <Text>Sets</Text>
        <FlatList
          data={exercise.sets}
          extraData={thing}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => <AddExerciseSet updater={handleUpdate} exercise={exercise} item={item}/>}
        />
      </View>
      <View style={{flex: 1}}>
        <Text>Add Exercise:</Text>
        <AddExerciseSet updater={handleUpdate} exercise={exercise} toAdd={true}/>
      </View>
      <View style={{flex: 1, justifyContent: "flex-end"}}>
        <Button onPress={() => {
          addExercise(exercise);
          navigation.goBack();
        }} title="Save"/>
      </View>
    </View>
  );
}
