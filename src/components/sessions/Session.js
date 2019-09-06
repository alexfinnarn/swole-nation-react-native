import React, {useState} from 'react';
import {Text, View, Button} from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import {styles} from "../Styles";

export default function Session({session}) {

  const [set, updateSet] = useState(0);
  const [exercise, updateExercise] = useState(0);
  const [completedSets, updateCompletedSets] = useState(0);

  function handleSets(forward) {
    console.log('sets length:  ' + session.exercises[exercise].sets.length);
    console.log('setsss:  ' + set);
    if (set === session.exercises[exercise].sets.length - 1) {
      updateExercise(exercise + 1);
      updateSet(0);
      return;
    }

    BackgroundTimer.stopBackgroundTimer();

    let seconds = new Date();
    BackgroundTimer.runBackgroundTimer(() => {
      console.log(Math.abs((seconds - new Date()) /1000) + ' seconds have passed' );
    }, 1000);

    forward ? updateSet(set + 1) : updateSet(set - 1);
  }

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 2, padding: 10, flexDirection: 'row'}}>
        <Text>Current Exercise: {session.exercises[exercise].name}</Text>
      </View>
      <View style={{flex: 2, padding: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
        <Text style={{ flex: 1 }}>Current Set: {set + 1}/{session.exercises[exercise].sets.length}
        - {session.exercises[exercise].sets[set].reps} at {session.exercises[exercise].sets[set].weight}lbs</Text>
        <View style={{flex: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button onPress={() => {
            handleSets(false);
          }} title="Previous Set"/>
          <Button onPress={() => {
            handleSets(true);
          }} title="Complete Set"/>
          <Button onPress={() => {
            handleSets(true);
          }} title="Skip Set"/>
        </View>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text>Session details</Text>
        <Text>Finish session</Text>
      </View>
    </View>
  );
}
