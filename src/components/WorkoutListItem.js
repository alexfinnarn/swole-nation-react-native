import React from 'react';
import { Text, Button } from "react-native";

export default function WorkoutListItem({ name, id, navigation }) {
  return (
    <>
      <Text>{name}</Text>
      <Button onPress={() => navigation.navigate('Workout', {id})}>Edit</Button>
    </>
  );
}
