import React, {Fragment} from 'react';
import { Text, Button } from "react-native";

export default function SessionsListItem({session, navigation}) {
  return (
    <Fragment>
      <Text>{session.item.name}</Text>
      <Button onPress={() => navigation.navigate('Session', {sessionId: session.item.id})} title="Edit" />
    </Fragment>
  );
}
