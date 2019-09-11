import React from 'react';
import {Button, FlatList, View} from "react-native";
import SessionsListItem from "./SessionsListItem";
import {styles} from '../Styles';

export default function SessionsList({ sessions, navigation }) {
  // Add key that is needed for rendering the <FlatList /> component.
  // workouts = workouts.map((workout) => {
  //   workout.key = workout.id.toString();
  //   return workout;
  // });

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={(item) => <SessionsListItem session={item} navigation={navigation}/>}
      />
      {/*<Button onPress={() => navigation.navigate('Workout')} title="Add" />*/}
    </View>
  )
}

