import React, { useState } from 'react';
import {Button, Picker, Text, View} from "react-native";
import {styles} from './Styles';
import SessionTeaserProvider from "./sessions/SessionTeaserProvider";

export default function Home({navigation, workouts, handle, thing}) {
  const [nextWorkoutId, setNextWorkoutId] = useState(workouts[0].id);

  console.log(workouts);

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <SessionTeaserProvider type="last" navigation={navigation}/>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 3, flexDirection: 'column'}}>
          <Text>Next Workout</Text>
          <Picker
            selectedValue={nextWorkoutId}
            style={{height: 70, width: 200}}
            onValueChange={(value) => setNextWorkoutId(value)}>
            {workouts.map((workout) => <Picker.Item key={workout.id} label={workout.name} value={workout.id}/>)}
          </Picker>
        </View>
        <Button
          style={{flex: 1}}
          title="Go"
          onPress={() => {
            handle.nextWorkoutInteraction(nextWorkoutId);
            navigation.navigate('Workout');
          }}
        />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <Text style={{flex: 3}}>Workouts</Text>
        <Button
          style={{flex: 1}}
          title="Edit"
          onPress={() => navigation.navigate('WorkoutsList')}
        />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <Text style={{flex: 3}}>Exercises</Text>
        <Button
          style={{flex: 1}}
          title="Edit"
          onPress={() => navigation.navigate('WorkoutsList')}
        />
      </View>
    </View>
  );
}


