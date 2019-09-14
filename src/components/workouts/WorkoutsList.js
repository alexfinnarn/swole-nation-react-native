import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function WorkoutsList({ workouts, navigation, handle, thing }) {
  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          extraData={thing}
          data={workouts}
          renderItem={(item) => <WorkoutsListItem workout={item} />}
        />
      </View>
      <ActionButton text="Add Workout" action={() => {
        handle.createWorkout();
        navigation.navigate('Workout', { action: 'save'});
      }}/>
    </View>
  );

  function WorkoutsListItem({workout}) {
    return (
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>{workout.item.name}</Text>
          <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
        </View>
        <ActionButton text="Edit" styles={{marginRight: 2}} action={() => {
          handle.setActiveWorkoutIndex(workout.index);
          navigation.navigate('Workout', {workoutId: workout.item.key, action: 'save'})
        }}/>
        <ActionButton text="X" action={() => {
          handle.setActiveWorkoutIndex(workout.index);
          navigation.navigate('Workout', {workoutId: workout.item.key, action: 'save'})
        }}/>
      </View>
    );
  }
}

