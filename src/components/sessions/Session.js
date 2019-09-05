import React from 'react';
import {Text, View} from "react-native";
import {styles} from "../Styles";

export default function Session({ session }) {

  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 2, padding: 10, flexDirection: 'row'}}>
        <Text>Previous Exercise</Text>
      </View>
      <View style={{flex: 2, padding: 10, flexDirection: 'row'}}>
        <Text>Current Exercise { session.exercises[0].shortName }</Text>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text>Session details</Text>
        <Text>Finish session</Text>
      </View>
    </View>
  );
}
