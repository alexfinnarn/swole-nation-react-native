import React, {useState, useEffect} from 'react';
import {Text, View, Button} from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import * as Speech from 'expo-speech';
import {styles} from "../Styles";

export default function Session({session, navigation}) {

  const [set, updateSet] = useState(0);
  const [exercise, updateExercise] = useState(0);
  const [completedSets, updateCompletedSets] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionActive, sessionIsActive] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setSessionDuration(sessionDuration + seconds);
    setSeconds(0);
    // setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    setTimeout(() => {
      toggle();
    }, 200);
  }, []);

  function handleSets(forward) {

    // If forwards and at the end of the sets, move to the next exercise.
    if (forward && set === session.exercises[exercise].sets.length - 1) {
      resetTimer();
      updateExercise(exercise + 1);
      updateSet(0);
      return;
    }

    // If backwards and at the beginning of sets, then move back an exercise.
    if (!forward && set === 0) {
      updateExercise(exercise - 1);
      updateSet(session.exercises[exercise - 1].sets.length - 1);
      return;
    }

    // BackgroundTimer.stopBackgroundTimer();
    // BackgroundTimer.runBackgroundTimer(() => {
    //   Speech.speak('do the thing, mayne. Fool!');
    // }, (1000 * 10));

    if (forward) {
      resetTimer();
      updateSet(set + 1);
    } else {
      updateSet(set - 1);
    }
  }

  function onLastExercise() {
    return session.exercises.length - 1 === exercise && session.exercises[exercise].sets.length - 1 === set;
  }

  function finishWorkout() {
    navigation.navigate('WorkoutsList');
  }

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 2, padding: 10, flexDirection: 'column'}}>
        <Text>Previous Exercise: {session.exercises[exercise - 1] ? session.exercises[exercise - 1].name : 'None'}</Text>
        <Text>Current Exercise: {session.exercises[exercise].name}</Text>
        <Text>Next Exercise: {session.exercises[exercise + 1] ? session.exercises[exercise + 1].name : 'None'}</Text>
      </View>
      <View style={{flex: 2, padding: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
        <Text style={{flex: 1}}>Current Set: {set + 1}/{session.exercises[exercise].sets.length} - {session.exercises[exercise].sets[set].reps} reps at {session.exercises[exercise].sets[set].weight}lbs</Text>
        <Text style={{flex: 1}}>Time on set: {seconds}</Text>
        <Text style={{flex: 1}}>Time on session: {seconds + sessionDuration}</Text>
        <View style={{flex: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
          {!session.exercises[exercise - 1] && set === 0
            ? <Text>Disabled</Text>
            : <Button onPress={() => {
              handleSets(false);
            }} title="Previous"/>
          }
          {onLastExercise()
            ? (<Button onPress={() => {
              finishWorkout();
            }} title="Finish Workout"/>)
            : (<Button onPress={() => {
              handleSets(true);
            }} title="Complete Set"/>)
          }
          {onLastExercise()
            ? <Text>Disabled</Text>
            : <Button onPress={() => {
              handleSets(true);
            }} title="Next"/>
          }
        </View>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text>Session details</Text>
        <Button onPress={() => {
          toggle();
        }} title="Pause Session"/>
      </View>
    </View>
  );
}
