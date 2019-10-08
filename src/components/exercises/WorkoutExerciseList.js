import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from '../Styles';
import ActionButton from '../utility/ActionButton';
import ActionCard from '../utility/ActionCard';

export default function WorkoutExerciseList({exercises, navigation, handle}) {
  return (
    <View testID="workout-exercise-list-root">
      <FlatList
        data={exercises}
        renderItem={item => <WorkoutExerciseListItem exercise={item} />}
      />
    </View>
  );

  function WorkoutExerciseListItem({exercise}) {
    return (
      <ActionCard
        actionComponent={
          <ActionButton
            text="Edit"
            label={`Edit ${exercise.item.name} exercise`}
            action={() => {
              handle.setActiveExerciseKey(exercise.item.key);
              navigation.navigate('AddExercise', {title: exercise.item.name});
            }}
          />
        }>
        <Text
          style={[
            styles.mediumTextInputFont,
            styles.bold,
            {flex: 4, paddingBottom: 10},
          ]}>
          {exercise.item.name}
        </Text>
        <Text>
          {exercise.item.sets.map(({reps, weight}, index) => {
            return index !== exercise.item.sets.length - 1
              ? `${reps}x${weight} lbs, `
              : `${reps}x${weight} lbs`;
          })}
        </Text>
      </ActionCard>
    );
  }
}
