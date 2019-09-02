import React from 'react';
import { Text } from "react-native";

export default function Workout({ name, description, exercises = <Text>No exercises.</Text> }) {
  return (
    <>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </>
  );
}
