import React, {useState} from 'react';
import {Picker, Text, View} from "react-native";
import {styles, home} from './Styles';
import SessionTeaser from "./sessions/SessionTeaser";
import ActionButton from "./utility/ActionButton";
import ActionCard from "./utility/ActionCard";

function Home({navigation, workouts, handle, sessionTeaser}) {
  // Since there are only two workouts so far, set the next workout to be the opposite of the last workout.
  const [nextWorkoutKey, setNextWorkoutKey] = useState(
    sessionTeaser.workoutName === 'Texas Method A' ? workouts[1].key : workouts[0].key);

  return (
    <View style={[styles.container]} testID="home-root">
      <ActionCard
        actionComponent={<ActionButton text="List" label="List Sessions" action={() => navigation.navigate('SessionsList')}/>}>
        <Text style={home.sectionHeaderText}>Sessions</Text>
        <SessionTeaser styles={{flex: 3}} session={sessionTeaser}/>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Go" label="Go to next workout" action={() => {
        handle.nextWorkoutInteraction(nextWorkoutKey);
        navigation.navigate('Workout', {action: 'go', title: workouts.find((el) => el.key === nextWorkoutKey).name});
      }}/>}>
        <Text style={home.sectionHeaderText}>Next Workout</Text>
        <View style={{flex: 2}}>
          <Picker
            testID="workout-picker"
            selectedValue={nextWorkoutKey}
            style={{height: 70, width: 180}}
            onValueChange={(value) => setNextWorkoutKey(value)}>
            {workouts.map((workout) => <Picker.Item key={workout.key} label={workout.name} value={workout.key}/>)}
          </Picker>
        </View>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Edit" label="Edit Workouts" action={() => navigation.navigate('WorkoutsList')}/>}>
        <Text style={home.sectionHeaderText}>Workouts</Text>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Edit" label="Edit Exercises" action={() => navigation.navigate('ExercisesList')}/>}>
        <Text style={home.sectionHeaderText}>Exercises</Text>
      </ActionCard>
    </View>
  );
}

export default Home;
