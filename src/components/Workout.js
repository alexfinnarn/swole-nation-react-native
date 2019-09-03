import React, { useState } from 'react';
import {Text, View, TextInput, StyleSheet, Button} from "react-native";

export default function Workout({ navigation }) {
  const workout =   {
    id: 1,
    name: 'Stronglifts A',
    description: 'Squats, Overhead Press, Deadlifts'
  };

  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);

  function handleSave() {

  }

  return (
    <View style={{padding: 20}}>
      <Text style={styles.bold}>Workout Name</Text>
      <TextInput
        style={[
          styles.editText,
          styles.mediumTextInputFont
        ]}
        placeholder="Workout A"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text style={styles.bold}>Workout Description</Text>
      <TextInput
        style={[
          styles.editText,
          styles.smallTextInputFont,
          styles.multiline
        ]}
        multiline
        placeholder="Workout Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Text style={[styles.bold, {marginTop: 15, fontSize: 20}]}>Exercises</Text>
      <View style={{alignItems: 'flex-end', marginTop: 20}}>
        <Button onPress={handleSave} title="Save" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  editText: {
    // alignSelf: 'flex-start',
    color: 'black',
    marginBottom: 20,
    marginTop: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  mediumTextInputFont: {
    fontSize: 18
  },
  smallTextInputFont: {
    fontSize: 16
  },
  multiline: {
    textAlignVertical: 'top'
  },
  bold: {
    fontWeight: 'bold'
  }
});
