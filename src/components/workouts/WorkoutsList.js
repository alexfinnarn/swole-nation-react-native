import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";
import ActionCard from "../utility/ActionCard";

export default function WorkoutsList({workouts, navigation, handle, thing}) {
  return (
    <View style={styles.container} testID="workouts-list-root">
      <View style={{flex: 9}}>
        <FlatList
          extraData={thing}
          data={workouts}
          renderItem={(item) => <WorkoutsListItem workout={item}/>}
        />
      </View>
      {/*<ActionButton label="Add new workout" text="Add Workout" action={() => {*/}
      {/*  handle.createWorkout();*/}
      {/*  navigation.navigate('Workout', {action: 'save'});*/}
      {/*}}/>*/}
    </View>
  );

  function WorkoutsListItem({workout}) {
    {/*  <ActionButton label={`Delete ${workout.item.name} workout`} text="X" action={() => {*/}
    {/*    handle.deleteWorkout(workout.item.key);*/}
    {/*  }}/>*/}
    {/*</>*/}

    return (
      <ActionCard actionComponent={
        <ActionButton label={`Edit ${workout.item.name} workout`} text="Edit" styles={{marginRight: 2}} action={() => {
          handle.setActiveWorkoutKey(workout.item.key);
          navigation.navigate('Workout', {
            workoutKey: workout.item.key,
            title: workout.item.name,
            action: 'edit'
          });
        }}/>
      }>
        <Text style={home.sectionHeaderText}>{workout.item.name}</Text>
        <Text style={{flex: 4, marginTop: 15}}>{workout.item.description}</Text>
      </ActionCard>
    );
  }
}

