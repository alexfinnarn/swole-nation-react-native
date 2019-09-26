import React from 'react';
import {Text, View} from "react-native";

export default function SessionTeaser({ session, styles }) {
  function getCompletedString() {
    let count = 0;
    session.exercises.forEach((exercise) => {
      count = count + exercise.sets.length;
    });

    const num = (session.completed / count) * 100;
    return `${num.toFixed(0)}%`
  }

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', ...styles}}>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{ session.name }</Text>
      </View>
      <View style={{flex: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text>Workout:</Text>
          <Text>{session.workoutName}</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text>Completed:</Text>
          <Text>{getCompletedString()}</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text>Duration:</Text>
          <Text>{session.duration}s</Text>
        </View>
      </View>
    </View>
  );
}
