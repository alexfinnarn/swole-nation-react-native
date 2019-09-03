import React from 'react';
import {Button, Text, View} from "react-native";
import {styles} from './Styles';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Text>Workouts</Text>
      <Button
        title="Edit"
        onPress={() => props.navigation.navigate('WorkoutsList')}
      />
    </View>
  );
}


