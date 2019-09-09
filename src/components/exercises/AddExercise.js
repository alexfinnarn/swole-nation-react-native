import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Keyboard, Switch, TextInput, Button, FlatList, Picker} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import shortId from 'shortid';
import {styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";

export default function AddExercise({exercises, thing, handleUpdate, addExercise, navigation, theExercise}) {
  const [query, setQuery] = useState(theExercise.name);
  const [exercise, setExercise] = useState(theExercise);
  const [switchValue, setSwitchValue] = useState(true);
  const [pickerEnabled, setPickerEnabled] = useState(theExercise.name === '');

  function updateExercisePicker(name) {
    setQuery(name);
    setExercise(exercises.find(exercise => exercise.name.toLowerCase().trim() === name.toLowerCase().trim()));
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {switchValue
          ? <Picker
            enabled={pickerEnabled}
            selectedValue={query}
            style={{height: 60, width: 120}}
            onValueChange={(itemValue) => updateExercisePicker(itemValue)}>
            {exercises.map((exer, index) => <Picker.Item key={exer.key} label={exer.name} value={exer.name}/>)}
          </Picker>
          : <TextInput
            style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}
            placeholder="Enter Exercise"
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
        }
        <Switch style={{flex: 1}} onValueChange={(value) => setSwitchValue(value)} value={switchValue}/>
      </View>
      <View style={{flex: 6}}>
        {exercise.name && <Text>Sets</Text>}
        <FlatList
          data={exercise.sets}
          extraData={thing}
          keyExtractor={(item, index) => item.key}
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
        }} title="Add"/>
      </View>
    </View>
  );
}
