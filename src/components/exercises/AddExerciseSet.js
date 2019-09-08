import React, {useState} from 'react';
import {Text, TextInput, View, Picker, Button} from "react-native";
import {styles} from "../Styles";

export default function AddExerciseSet({item}) {
  const [reps, setReps] = useState(item.reps.toString());
  const [weight, setWeight] = useState(item.weight.toString());

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderWidth: 1, borderColor: '#d6d7da', borderRadius: 4}}>
      <Text>Reps</Text>
      <Picker
        selectedValue={reps}
        style={{height: 60, width: 120}}
        onValueChange={(itemValue) => setReps(itemValue)}>
        {[...Array(12)].map((e, index) => <Picker.Item key={index} label={index.toString()} value={index.toString()}/>)}
      </Picker>
      <Text>Weight</Text>
      <TextInput
        style={[
          styles.editText,
          styles.smallTextInputFont,
        ]}
        onChangeText={(text) => setWeight(text)}
        value={weight}
      />
      <Button onPress={() => {
      }} title="X"/>
    </View>

  );
}

