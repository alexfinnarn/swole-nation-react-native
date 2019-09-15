import React, {useState} from 'react';
import {Picker, Text, View} from "react-native";
import {styles, home} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";
import ActionButton from "./utility/ActionButton";

export default function Home({navigation, workouts, handle, thing}) {
  const [nextWorkoutId, setNextWorkoutId] = useState(0);

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
              selectedValue={nextWorkoutId}
              style={{height: 70, width: 160}}
              onValueChange={(value) => setNextWorkoutId(value)}>
              {workouts.map((workout, index) => <Picker.Item key={workout.key} label={workout.name} value={index}/>)}
            </Picker>
          </View>
        </View>
        <ActionButton text="Go" action={() => {
          handle.nextWorkoutInteraction(nextWorkoutId);
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


