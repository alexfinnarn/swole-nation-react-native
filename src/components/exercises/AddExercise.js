import React, {useState} from 'react';
import {Text, View, TextInput, FlatList, Picker} from "react-native";
import {styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";
import ActionButton from "../utility/ActionButton";
import Workout from "../workouts/Workout";

function AddExercise({exercises, handle, navigation, theExercise, pickerEnabled, thing}) {
  const exerciseSelected = theExercise.name !== '';
  const [choice, setChoice] = useState(theExercise.key);
  const [name, setName] = useState(theExercise.name);
  const [exercise, setExercise] = useState(theExercise);

  function updateExercisePicker(key) {
    setChoice(key);
    setExercise(exercises.find(exercise => exercise.key === key));
  }

  return (
    <View style={{flex: 1, flexDirection: 'column', padding: 5}} testID="add-exercise-root">
      {/*<View style={{flex: 1, flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>*/}
      {/*  <Text style={[styles.bold, styles.mediumTextInputFont, {flex: 1}]}>Exercise:</Text>*/}
      {/*  {exerciseSelected*/}
      {/*    ? <Picker*/}
      {/*      testID="exercise-picker"*/}
      {/*      enabled={pickerEnabled}*/}
      {/*      selectedValue={choice}*/}
      {/*      style={{height: 70, width: 300, flex: 3}}*/}
      {/*      onValueChange={(itemValue) => updateExercisePicker(itemValue)}>*/}
      {/*      {Object.keys(exercises).map((key) => <Picker.Item key={key} label={exercises[key].name} value={key}/>)}*/}
      {/*    </Picker>*/}
      {/*    : <TextInput*/}
      {/*      style={[styles.editText, styles.smallTextInputFont, {flex: 4}]}*/}
      {/*      placeholder="Enter Exercise"*/}
      {/*      onChangeText={text => setName(text)}*/}
      {/*      value={name}*/}
      {/*    />*/}
      {/*  }*/}
      {/*</View>*/}
      <View style={{flex: 8}}>
        <Text style={[styles.bold, styles.mediumTextInputFont, {paddingBottom: 5}]}>Sets</Text>
        <FlatList
          data={exercise.sets}
          extraData={thing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => <AddExerciseSet updater={handle.update} exercise={exercise} item={item}/>}
        />
      </View>
      <View style={{flex: 2, marginTop: 5}}>
        <Text style={[styles.bold, styles.mediumTextInputFont, {paddingBottom: 5}]}>Add Set</Text>
        <AddExerciseSet updater={handle.update} exercise={exercise} toAdd={true}/>
      </View>
      <ActionButton text={exercise.connectedWorkout ? 'Add' : 'Save'}
                    label={exercise.connectedWorkout ? 'Add exercise' : 'Save exercise'}
                    action={() => {
                      if (!exerciseSelected) {
                        exercise.name = name;
                      }
                      handle.save(exercise);
                      navigation.goBack();
                    }}/>
    </View>
  );
}

AddExercise.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Exercise')
  };
};

export default AddExercise;
