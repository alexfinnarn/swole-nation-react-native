import React from 'react';
import {StyleSheet, FlatList, View} from "react-native";
import WorkoutListItem from "./WorkoutListItem";

export default function WorkoutsList({ navigation }) {
  let workouts = navigation.getParam('workouts', [
    {
      id: 100,
      name: 'Fake name',
      description: 'Fake description'
    }
  ]);

  workouts = workouts.map((workout) => {
    workout.key = workout.id.toString();
    return workout;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={(item) => <WorkoutListItem workout={item} navigation={navigation}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
