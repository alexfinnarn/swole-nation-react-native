import React from 'react';
import { Text } from "react-native";

export default function Workout(props) {
  // const doof = { name, description, exercises = <Text>No exercises.</Text> };
  const { name, description } = props.navigation.getParam('workout', {name: 'Foo', description: 'Bar'});
  return (
    <>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </>
  );
}
