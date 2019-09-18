import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from "../Styles";
import ActionButton from "../utility/ActionButton";
import ActionCard from "../utility/ActionCard";

export default function WorkoutExerciseList({exercises, navigation, thing}) {


  return (
    <View>
      <FlatList
        extraData={thing}
        data={exercises}
        renderItem={(item) => <WorkoutExerciseListItem exercise={item}/>}
      />
    </View>
  );

  function WorkoutExerciseListItem({exercise}) {
    return (
      <ActionCard actionComponent={
        <ActionButton text="Edit" action={() =>
          navigation.navigate('AddExercise', {exerciseId: exercise.item.key, pickerEnabled: false})}/>
      }>
        <Text style={[styles.mediumTextInputFont, {flex: 4, paddingBottom: 10}]}>{exercise.item.name}</Text>
        {exercise.item.sets.map(({reps, weight}, index) => {
          return (
            <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.bold}>Reps: {reps}</Text>
              <Text>Weight: {weight}</Text>
            </View>
          );
        })}
      </ActionCard>
    );
  }
}
