import React from 'react';
import {Text, View} from "react-native";
import {home} from "../Styles";
import ActionButton from "../utility/ActionButton";

export default function WorkoutListItem({workout, navigation}) {
  return (
    <View style={home.sectionContainer}>
      <View style={home.sectionLeft}>
        <Text style={home.sectionHeaderText}>{workout.item.name}</Text>
        <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
      </View>
      <ActionButton text="Edit" action={() => navigation.navigate('Workout', {workoutId: workout.item.id})}/>
    </View>
  );
}
