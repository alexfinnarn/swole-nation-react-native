import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";
import ActionCard from "../utility/ActionCard";

export default function ExercisesList({ exercises, navigation, handle }) {

  return (
    <View style={styles.container} testID="exercises-list-root">
      <View style={{flex:9}}>
        <FlatList
          data={exercises}
          renderItem={(item) => <ExercisesListItem exercise={item}/>}
        />
      </View>
      <ActionButton text="Add Exercise" action={() => {
        handle.createExercise();
        navigation.navigate('AddExercise');
      }} />
    </View>
  );

  function ExercisesListItem({exercise}) {
    return (
      <ActionCard actionComponent={
        <ActionButton text="Edit" action={() => {
          handle.setActiveExerciseKey(exercise.item.key);
          navigation.navigate('AddExercise', {exerciseKey: exercise.item.key})
        }}/>
      }>
        <Text style={home.sectionHeaderText}>{exercise.item.name}</Text>
        <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
      </ActionCard>
    );
  }
}



