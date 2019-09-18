import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";
import ActionCard from "../utility/ActionCard";

export default function WorkoutsList({ sessions, navigation }) {
  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          data={sessions}
          renderItem={(item) => <SessionsListItem session={item}/>}
        />
      </View>
      {/*<ActionButton text="Add session" action={() => navigation.navigate('Session')} />*/}
    </View>
  );

  function SessionsListItem({session}) {
    return (
      <ActionCard actionComponent={
        <ActionButton text="Edit" action={() => navigation.navigate('Session', {sessionId: session.item.key})}/>
      }>
        <Text style={home.sectionHeaderText}>{session.item.name}</Text>
        <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
      </ActionCard>
    );
  }

}



