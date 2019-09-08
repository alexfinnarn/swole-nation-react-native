import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Keyboard} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import shortId from 'shortid';
import {styles} from "../Styles";
import {FlatList} from "react-navigation";
import AddExerciseSet from "./AddExerciseSet";

export default function AddExercise({workout, exercises}) {
  const [query, setQuery] = useState('');
  const [hideResults, setHideResults] = useState(false);
  const [exercise, setExercise] = useState({sets: []});
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
      <View style={{flex: 1}}>
        <Autocomplete
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
      </View>
      <View style={{flex: 7}}>
        {exercise.name && <Text>Sets</Text>}
        <FlatList
          data={exercise.sets}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <AddExerciseSet item={item}/>}
        />
      </View>
    </View>
  );
}
