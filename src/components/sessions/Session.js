import React, {useState, useEffect} from 'react';
import {Text, View, Button} from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import * as Speech from 'expo-speech';
import {styles} from "../Styles";
import Table from "../utility/Table";
import ActionButton from "../utility/ActionButton";

export default function Session({session, navigation, finishSession}) {

  const [set, updateSet] = useState(0);
  const [exercise, updateExercise] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [weightPlateString, setWeightPlateString] = useState('Each Side: ');
  const weightPlates = [45, 25, 10, 5, 2.5];

  // Create timer used for workout.
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

  // Start timer at the beginning of workout and set initial weight plate string.
  useEffect(() => {
    setTimeout(() => {
      toggle();
      calculateWeightPlates((session.exercises[exercise].sets[set].weight - 45.0) / 2);
    }, 200);
  }, []);

  function toggle() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setSessionDuration(sessionDuration + seconds);
    setSeconds(0);
  }

  function calculateWeightPlates(weight, platesString = '', counter = 0) {
    if (weight <= 0 && counter >= weightPlates.length) {
      // Chop off first three characters hyphen for display.
      setWeightPlateString(platesString.slice(2));
    } else {

      // The 45 and 25 pound weight plates can be included multiple times.
      // The 25 only twice, but the 45 can be added many more times.
      // To display them, we add a multiplier to the display to tell the user how many of the plates
      // to put on the barbell.
      let multiplier = 1;
      if ((weight / weightPlates[counter]) >= 2 && [45, 10].includes(weightPlates[counter])) {
        multiplier = Math.floor(weight / weightPlates[counter]);
      }

      if ((weight - weightPlates[counter]) >= 0) {
        weight = weight - (weightPlates[counter] * multiplier);
        platesString = `${platesString} - ${multiplier.toString()}x${weightPlates[counter].toString()}`;
      }

      calculateWeightPlates(weight, platesString, counter + 1);
    }
  }

  function handleSets(forward, completed = false) {
    if (completed) {
      session.exercises[exercise].sets[set].completed = true;
    }

    // If forwards and at the end of the sets, move to the next exercise.
    if (forward && set === session.exercises[exercise].sets.length - 1) {
      updateExercise(exercise + 1);
      updateSet(0);
      calculateWeightPlates((session.exercises[exercise + 1].sets[0].weight - 45.0) / 2);
      resetTimer();
      return;
    }

    // If backwards and at the beginning of sets, then move back an exercise.
    if (!forward && set === 0) {
      updateExercise(exercise - 1);
      updateSet(session.exercises[exercise - 1].sets.length - 1);
      calculateWeightPlates((session.exercises[exercise - 1].sets[session.exercises[exercise - 1].sets.length - 1].weight - 45.0) / 2);
      return;
    }

    // BackgroundTimer.stopBackgroundTimer();
    // BackgroundTimer.runBackgroundTimer(() => {
    //   Speech.speak('do the thing, mayne. Fool!');
    // }, (1000 * 10));

    if (forward) {
      resetTimer();
      updateSet(set + 1);
      calculateWeightPlates((session.exercises[exercise].sets[set].weight - 45.0) / 2);
    } else {
      updateSet(set - 1);
      calculateWeightPlates((session.exercises[exercise].sets[set].weight - 45.0) / 2);
    }
  }

  function onLastExercise() {
    return session.exercises.length - 1 === exercise && session.exercises[exercise].sets.length - 1 === set;
  }

  function finishWorkout() {
    session.duration = seconds + sessionDuration;
    finishSession(session);
    navigation.navigate('SessionsList');
  }

  function ActionButtons() {
    let last, current, next = '';
    if (!session.exercises[exercise - 1] && set === 0) {
      last = <ActionButton key="previous" disabled={true} text="Previous" action={() => {}}/>;
    } else {
      last = <ActionButton key="previous" text="Previous" action={() => handleSets(false)}/>;
    }

    if (onLastExercise()) {
      current = <ActionButton styles={{paddingLeft: 5, paddingRight: 5}} key="current" text="Finish" action={() => finishWorkout()}/>;
      next = <ActionButton key="next" disabled={true} text="Skip" action={() => {}}/>;
    } else {
      current = <ActionButton styles={{paddingLeft: 5, paddingRight: 5}} key="current" text="Complete" action={() => handleSets(true, true)}/>;
      next = <ActionButton key="next" text="Skip" action={() => handleSets(true)}/>;
    }

    return ([last, current, next]);
  }

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-between'}]}>
      <View style={{flex: 5, padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Text>Foo</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1, backgroundColor: '#69D1C5'}}>
            <Text style={{flex: 1, color: '#ffffff', alignSelf: 'center'}}>
              {session.exercises[exercise - 1] ? session.exercises[exercise - 1].name : 'None'}
            </Text>
          </View>
          <View style={{flex: 2, backgroundColor: '#3BA99C'}}>
            <Text style={{flex: 1, color: '#ffffff', alignSelf: 'center'}}>{session.exercises[exercise].name}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#21897E'}}>
            <Text style={{flex: 1, color: '#ffffff', alignSelf: 'center' }}>
              {session.exercises[exercise + 1] ? session.exercises[exercise + 1].name : 'None'}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <ActionButtons />
      </View>
      <View style={{flex: 4, padding: 10, flexDirection: 'column', justifyContent: 'space-around'}}>
        <Table
          columnFlex={[1,1,1,1]}
          headers={['Completed', 'Sets', 'Reps', 'Weight']}
          rowData={[
            // session.exercises[exercise].sets[set].completed.toString(),
            'foo',
            `${set + 1}/${session.exercises[exercise].sets.length}`,
            session.exercises[exercise].sets[set].reps,
            `${session.exercises[exercise].sets[set].weight} lbs`
          ]}
        />
        <Table
          columnFlex={[1,3,1]}
          headers={['Set', 'Plates', 'Session']}
          rowData={[seconds, weightPlateString, seconds + sessionDuration]}
        />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <ActionButton styles={{paddingRight: 5}} text="Quit" action={() => {}}/>
        <ActionButton text="Pause" action={() => toggle()}/>
      </View>
    </View>
  );
}
