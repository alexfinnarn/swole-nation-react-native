import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function WorkoutsList({ workouts, navigation }) {
  // Add key that is needed for rendering the <FlatList /> component.
  workouts = workouts.map((workout) => {
    workout.key = workout.id.toString();
    return workout;
  });

  function WorkoutsListItem({workout}) {
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

  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          data={workouts}
          renderItem={(item) => <WorkoutsListItem workout={item} />}
        />
      </View>
      <ActionButton text="Add Workout" action={() => navigation.navigate('Workout')} />
    </View>
  )
}

