import React from 'react';
import {Button, Text, View} from "react-native";
import {styles} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";

export default function Home({navigation}) {
  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <SessionTeaserProvider type="last" navigation={navigation}/>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <Text style={{flex: 3}}>Next Workout</Text>
        <Button
          style={{flex: 1}}
          title="Go"
          onPress={() => navigation.navigate('Workout')}
        />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <Text style={{flex: 3}}>Workouts</Text>
        <Button
          style={{flex: 1}}
          title="Edit"
          onPress={() => navigation.navigate('WorkoutsList')}
        />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <Text style={{flex: 3}}>Exercises</Text>
        <Button
          style={{flex: 1}}
          title="Edit"
          onPress={() => navigation.navigate('WorkoutsList')}
        />
      </View>
    </View>
  );
}


