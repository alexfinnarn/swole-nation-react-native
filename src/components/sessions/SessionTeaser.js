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
    <View testID="session-teaser-root" style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', ...styles}}>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text testID="session-name">{ session.name }</Text>
      </View>
      <View style={{flex: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text>Workout:</Text>
          <Text testID="workout-name">{session.workoutName}</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text>Completed:</Text>
          <Text testID="completion-percentage">{getCompletedString()}</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text>Duration:</Text>
          <Text testID="session-duration">{session.duration.toString()}s</Text>
        </View>
      </View>
    </View>
  );
}
