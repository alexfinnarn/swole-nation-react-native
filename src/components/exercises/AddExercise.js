import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Keyboard, Switch, TextInput, Button, FlatList} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import shortId from 'shortid';
import {styles} from "../Styles";
import AddExerciseSet from "./AddExerciseSet";

export default function AddExercise({exercises, thing, handleUpdate, addExercise, navigation, theExercise}) {
  console.log(theExercise);

  const [query, setQuery] = useState(theExercise.name);
  const [hideResults, setHideResults] = useState(false);
  const [exercise, setExercise] = useState(theExercise);
  const [switchValue, setSwitchValue] = useState(true);
  const exerciseList = findExercise(query);
  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  function findExercise(query) {
    if (query === '') {
      return [];
    }

    const regex = new RegExp(`${query.trim()}`, 'i');
    return exercises.filter(exercise => exercise.name.search(regex) >= 0);
  }

  function updateAutocompleteInput(name) {
    setQuery(name);
    setExercise(exercises.find(exercise => exercise.name.toLowerCase().trim() === name.toLowerCase().trim()));
    setHideResults(true);
    Keyboard.dismiss();
  }

  function changeTheText(text) {
    setQuery(text);
    setHideResults(false);
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {switchValue
          ? <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            hideResults={hideResults}
            data={exerciseList.length === 1 && comp(query, exerciseList[0].name) ? [] : exerciseList}
            defaultValue={query}
            onChangeText={text => changeTheText(text)}
            placeholder="Enter Exercise"
            renderItem={({item: {name}}) => (
              <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10}} key={shortId.generate()} onPress={() => updateAutocompleteInput(name)}>
                <Text style={styles.itemText}>{name}</Text>
              </TouchableOpacity>
            )}
          />
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
        }} title="Add" />
      </View>
    </View>
  );
}
