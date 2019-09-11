import React, {useState} from 'react';
import {Button, Picker, Text, View, TouchableOpacity} from "react-native";
import {styles, home} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";

export default function Home({navigation, workouts, handle, thing}) {
  const [nextWorkoutId, setNextWorkoutId] = useState(workouts[0].id);

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Sessions</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => navigation.navigate('WorkoutsList')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Next Workout</Text>
          <View style={{flex: 2}}>
            <Picker
              selectedValue={nextWorkoutId}
              style={{height: 70, width: 140}}
              onValueChange={(value) => setNextWorkoutId(value)}>
              {workouts.map((workout) => <Picker.Item key={workout.id} label={workout.name} value={workout.id}/>)}
            </Picker>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => {
              handle.nextWorkoutInteraction(nextWorkoutId);
              navigation.navigate('Workout');
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>Go</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Workouts</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={[{backgroundColor: '#21897E'}, home.actionButton]}
            onPress={() => navigation.navigate('WorkoutsList')}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={home.actionButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>Exercises</Text>
        </View>
        <TouchableOpacity
          style={[{backgroundColor: '#21897E'}, home.actionButton]}
          title="Edit"
          onPress={() => navigation.navigate('WorkoutsList')}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={home.actionButtonText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


