import React, {useState} from 'react';
import {Picker, Text, View} from "react-native";
import {styles, home} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";
import ActionButton from "./utility/ActionButton";
import NavigationService from "../../NavigationService";

function Home({navigation, workouts, handle}) {
  const [nextWorkoutKey, setNextWorkoutKey] = useState(workouts[0].key);

  return (
    <View style={[styles.container]}>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Sessions</Text>
        </View>
        <ActionButton text="List" action={() => navigation.navigate('SessionsList')}/>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Next Workouts</Text>
          <View style={{flex: 2}}>
            <Picker
              testID="workout-picker"
              selectedValue={nextWorkoutKey}
              style={{height: 70, width: 160}}
              onValueChange={(value) => setNextWorkoutKey(value)}>
              {workouts.map((workout) => <Picker.Item key={workout.key} label={workout.name} value={workout.key}/>)}
            </Picker>
          </View>
        </View>
        <ActionButton text="Go" action={() => {
          handle.nextWorkoutInteraction(nextWorkoutKey);
          navigation.navigate('Workout', { action: 'go' });
        }}/>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Workouts</Text>
        </View>
        <ActionButton text="Edit" action={() => navigation.navigate('WorkoutsList')}/>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Exercises</Text>
        </View>
        <ActionButton text="Edit" action={() => navigation.navigate('ExercisesList')}/>
      </View>
    </View>
  );
}

Home.navigationOptions = {
  headerRight: <ActionButton action={() => NavigationService.navigate('Settings')} text="Settings" />
};


export default Home;
