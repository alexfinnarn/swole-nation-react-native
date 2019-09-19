import React, {useState} from 'react';
import {Picker, Text, View} from "react-native";
import {styles, home} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";
import ActionButton from "./utility/ActionButton";
import NavigationService from "../services/NavigationService";
import ActionCard from "./utility/ActionCard";

function Home({navigation, workouts, handle}) {
  const [nextWorkoutKey, setNextWorkoutKey] = useState(workouts[0].key);

  return (
    <View style={[styles.container]} testID="home-root">
      <ActionCard
        actionComponent={<ActionButton text="List" action={() => navigation.navigate('SessionsList')}/>}>
        <Text style={home.sectionHeaderText}>Sessions</Text>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Go" action={() => {
        handle.nextWorkoutInteraction(nextWorkoutKey);
        navigation.navigate('Workout', {action: 'go'});
      }}/>}>
        <Text style={home.sectionHeaderText}>Next Workout</Text>
        <View style={{flex: 2}}>
          <Picker
            testID="workout-picker"
            selectedValue={nextWorkoutKey}
            style={{height: 70, width: 160}}
            onValueChange={(value) => setNextWorkoutKey(value)}>
            {workouts.map((workout) => <Picker.Item key={workout.key} label={workout.name} value={workout.key}/>)}
          </Picker>
        </View>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Edit" action={() => navigation.navigate('WorkoutsList')}/>}>
        <Text style={home.sectionHeaderText}>Workouts</Text>
      </ActionCard>
      <ActionCard actionComponent={<ActionButton text="Edit" action={() => navigation.navigate('ExercisesList')}/>}>
        <Text style={home.sectionHeaderText}>Exercises</Text>
      </ActionCard>
    </View>
  );
}

Home.navigationOptions = {
  headerRight: <ActionButton action={() => NavigationService.navigate('Settings')} text="Settings"/>
};


export default Home;
