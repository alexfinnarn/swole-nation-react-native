import React from 'react';
import {Button, Text, View} from "react-native";
import {styles} from "../Styles";

export default function SessionTeaser({ session, navigation }) {
  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}]}>
      <View style={{flex: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{ session.name }</Text>
        <Button onPress={() => navigation.navigate('Session', {sessionId: session.key})} title="Go" />
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        { session.exercises.map(({ shortName, sets, weight }) => <Text key={shortName}>{ shortName }: { sets } - { weight }</Text>)}
      </View>
    </View>
  );
}
