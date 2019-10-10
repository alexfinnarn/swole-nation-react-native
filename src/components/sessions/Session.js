import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image} from 'react-native';
import {styles} from '../Styles';
import Table from '../utility/Table';
import ActionButton from '../utility/ActionButton';
import backgroundTimer from '../../services/backgroundTimer.js';

function Session({session, navigation, handle}) {
  const [exercise, updateExercise] = useState(session.progress[0]);
  const [set, updateSet] = useState(session.progress[1]);
  const [progress, updateProgress] = useState(session.progress);
  const [seconds, setSeconds] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(session.duration);
  const [isActive, setIsActive] = useState(false);
  const [weightPlateString, setWeightPlateString] = useState(' None');
  const [dateStamp, setDateStamp] = useState('');

  // Create timer used for workout.
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const timeElapsed = Math.floor(
          (new Date(Date.now()) - dateStamp) / 1000,
        );
        // This corrects the timer when the app is placed in the background.
        if (timeElapsed - seconds > 2) {
          setSeconds(() => timeElapsed + 1);
        } else {
          setSeconds(seconds => seconds + 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, dateStamp]);

  // Set initial weight plate string.
  useEffect(() => {
    setTimeout(() => {
      calculateWeightPlates(
        (session.exercises[exercise].sets[set].weight - 45.0) / 2,
      );
    }, 200);
  }, []);

  function calculateDateStamp(time = seconds) {
    let newDate = new Date(Date.now());
    newDate.setSeconds(newDate.getSeconds() - time);
    setDateStamp(newDate);
  }

  function toggle() {
    if (!isActive) {
      calculateDateStamp();
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    backgroundTimer.stop();
  }

  function resetTimer() {
    setSessionDuration(sessionDuration + seconds);
    setSeconds(0);
  }

  // @todo Move to a separate file.
  const weightPlates = [45, 25, 10, 5, 2.5];
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
      if (
        weight / weightPlates[counter] >= 2 &&
        [45, 10].includes(weightPlates[counter])
      ) {
        multiplier = Math.floor(weight / weightPlates[counter]);
      }

      if (weight - weightPlates[counter] >= 0) {
        weight = weight - weightPlates[counter] * multiplier;
        platesString = `${platesString} - ${multiplier.toString()}x${weightPlates[
          counter
        ].toString()}`;
      }
      calculateWeightPlates(weight, platesString, counter + 1);
    }
  }

  function handleSets(forward, completed = false) {
    backgroundTimer.stop();
    if (completed) {
      session.exercises[exercise].sets[set].completed = true;
      session.completed++;
    }

    // If forwards and at the end of the sets, move to the next exercise.
    if (forward && set === session.exercises[exercise].sets.length - 1) {
      updateExercise(exercise + 1);
      updateSet(0);
      updateProgress([exercise + 1, 0]);
      calculateWeightPlates(
        (session.exercises[exercise + 1].sets[0].weight - 45.0) / 2,
      );
      resetTimer();
      calculateDateStamp(0);
      if (!session.exercises[exercise + 1].name.includes('Warmup')) {
        backgroundTimer.start(
          `${session.exercises[exercise + 1].name}, 0 of ${session.exercises[exercise].sets.length}`,
        );
      }
      return;
    }

    // If backwards and at the beginning of sets, then move back an exercise.
    if (!forward && set === 0) {
      let lastSet = session.exercises[exercise - 1].sets.length - 1;
      updateExercise(exercise - 1);
      updateSet(lastSet);
      updateProgress([exercise - 1, lastSet]);
      calculateWeightPlates(
        (session.exercises[exercise - 1].sets[lastSet].weight - 45.0) / 2,
      );
      return;
    }

    if (forward) {
      resetTimer();
      calculateDateStamp(0);
      updateSet(set + 1);
      updateProgress([progress[0], set + 1]);
      calculateWeightPlates(
        (session.exercises[exercise].sets[set + 1].weight - 45.0) / 2,
      );
      if (!session.exercises[exercise].name.includes('Warmup')) {
        backgroundTimer.start(
          `${session.exercises[exercise].name}, ${set + 1} of ${
            session.exercises[exercise].sets.length
          }`,
        );
      }
    } else {
      updateSet(set - 1);
      updateProgress([progress[0], set - 1]);
      calculateWeightPlates(
        (session.exercises[exercise].sets[set - 1].weight - 45.0) / 2,
      );
    }
  }

  function onLastExercise() {
    return (
      session.exercises.length - 1 === exercise &&
      session.exercises[exercise].sets.length - 1 === set
    );
  }

  function finishWorkout() {
    backgroundTimer.stop();
    setIsActive(false);
    session.duration = seconds + sessionDuration;
    session.progress = progress;
    handle.finishSession(session);
    navigation.navigate('Home');
  }

  function ActionButtons() {
    let last,
      current,
      next = '';
    if (!session.exercises[exercise - 1] && set === 0) {
      last = (
        <ActionButton
          label="Previous set"
          key="previous"
          disabled={true}
          text="Previous"
          action={() => {}}
        />
      );
    } else {
      last = (
        <ActionButton
          label="No previous set available"
          key="previous"
          text="Previous"
          action={() => handleSets(false)}
        />
      );
    }

    if (onLastExercise()) {
      current = (
        <ActionButton
          label="Finish session"
          styles={{paddingLeft: 5, paddingRight: 5}}
          key="current"
          text="Finish"
          action={() => finishWorkout()}
        />
      );
      next = (
        <ActionButton
          label="Next set"
          key="next"
          disabled={true}
          text="Skip"
          action={() => {}}
        />
      );
    } else {
      current = (
        <ActionButton
          label="Complete set"
          styles={{paddingLeft: 5, paddingRight: 5}}
          key="current"
          text="Complete"
          action={() => handleSets(true, true)}
        />
      );
      next = (
        <ActionButton
          label="No next set available"
          key="next"
          text="Skip"
          action={() => handleSets(true)}
        />
      );
    }
    return [last, current, next];
  }

  function StyleTile({color, bgColor, text, flex, textID = ''}) {
    return (
      <View style={{flex: flex, backgroundColor: bgColor, padding: 5}}>
        <Text
          style={{flex: 1, color: color, alignSelf: 'center', fontSize: 16}}
          testID={textID}>
          {text}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
      ]}
      testID="session-root">
      <View style={{flex: 5, padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            testID={`${session.exercises[exercise].name
              .replace(/\s+/g, '-')
              .toLowerCase()}-image`}
            resizeMode="contain"
            style={{flex: 1}}
            source={session.exercises[exercise].image}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <StyleTile
            color={'#ffffff'}
            bgColor={'#69D1C5'}
            flex={1}
            text={`<- ${
              session.exercises[exercise - 1]
                ? session.exercises[exercise - 1].name
                : 'N/A'
            } <-`}
          />
          <StyleTile
            color={'#ffffff'}
            bgColor={'#3BA99C'}
            flex={1}
            textID="current-exercise"
            text={`${session.exercises[exercise].name}`}
          />
          <StyleTile
            color={'#ffffff'}
            bgColor={'#21897E'}
            flex={1}
            text={`-> ${
              session.exercises[exercise + 1]
                ? session.exercises[exercise + 1].name
                : 'N/A'
            } ->`}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <ActionButtons />
      </View>
      <View
        style={{
          flex: 4,
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <Table
          columnFlex={[1, 1, 1, 1]}
          label="sets-reps-table"
          headers={['Completed', 'Sets', 'Reps', 'Weight']}
          rowData={[
            session.exercises[exercise].sets[set].completed.toString(),
            `${set + 1}/${session.exercises[exercise].sets.length}`,
            session.exercises[exercise].sets[set].reps.toString(),
            `${session.exercises[exercise].sets[set].weight} lbs`,
          ]}
        />
        <Table
          columnFlex={[1, 3, 1]}
          label="time-plates-table"
          headers={['Set', 'Plates', 'Session']}
          rowData={[
            seconds,
            weightPlateString !== '' ? weightPlateString : ' None',
            seconds + sessionDuration,
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <ActionButton
          styles={{paddingRight: 5}}
          text={isActive ? 'Pause' : 'Start'}
          label={isActive ? 'Pause session' : 'Start or resume session'}
          action={() => toggle()}
        />
        <ActionButton
          label="Quit session"
          text="Quit"
          action={() => {
            finishWorkout();
          }}
        />
      </View>
    </View>
  );
}

Session.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Session'),
  };
};

export default Session;
