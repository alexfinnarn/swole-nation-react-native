import React from 'react';
import {FlatList, View} from "react-native";
import WorkoutListItem from "./WorkoutListItem";
import {styles} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function WorkoutsList({ workouts, navigation }) {
  // Add key that is needed for rendering the <FlatList /> component.
  workouts = workouts.map((workout) => {
    workout.key = workout.id.toString();
    return workout;
  });

  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          data={workouts}
          renderItem={(item) => <WorkoutListItem workout={item} navigation={navigation}/>}
        />
      </View>
      <ActionButton text="Add Workout" action={() => navigation.navigate('Workout')} />
    </View>
  )
}

