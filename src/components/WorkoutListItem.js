import React, {Fragment} from 'react';
import { Text, Button } from "react-native";

export default function WorkoutListItem({workout, navigation}) {

  return (
    <Fragment>
      <Text>{workout.item.name}</Text>
      <Button onPress={() => navigation.navigate('Workout', {workout: workout.item})} title="Edit" />
    </Fragment>
  );
}
