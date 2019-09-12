import React from 'react';
import {FlatList, Text, View} from "react-native";
import {home, styles} from '../Styles';
import ActionButton from "../utility/ActionButton";

export default function WorkoutsList({ sessions, navigation }) {
  // Add key that is needed for rendering the <FlatList /> component.
  sessions = sessions.map((session) => {
    session.key = session.id.toString();
    return session;
  });

  function SessionsListItem({session}) {
    return (
      <View style={home.sectionContainer}>
        <View style={home.sectionLeft}>
          <Text style={home.sectionHeaderText}>{session.item.name}</Text>
          <Text style={{flex: 4, marginTop: 15}}>Other content</Text>
        </View>
        <ActionButton text="Edit" action={() => navigation.navigate('Session', {sessionId: session.item.id})}/>
      </View>
    );
  }

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
  )
}



