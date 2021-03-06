import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from '../Styles';
import ActionButton from '../utility/ActionButton';
import ActionCard from '../utility/ActionCard';
import SessionTeaser from './SessionTeaser';

export default function SessionsList({sessions, navigation, handle, thing}) {
  return (
    <View style={styles.container} testID="sessions-list-root">
      <View style={{flex: 9}}>
        <FlatList
          extraData={thing}
          data={sessions}
          ListEmptyComponent={<Text>No sessions to list.</Text>}
          renderItem={item => <SessionsListItem session={item} />}
        />
      </View>
      {/*<ActionButton text="Add session" label="Add Session" action={() => navigation.navigate('Session')} />*/}
    </View>
  );

  function SessionsListItem({session}) {
    return (
      <ActionCard
        actionComponent={
          <>
            <ActionButton
              styles={{marginRight: 2}}
              text="Edit"
              label={`Edit session: ${session.item.name}`}
              action={() => {
                handle.setActiveSessionKey(session.item.key);
                navigation.navigate('Session', {
                  sessionId: session.item.key,
                  title: session.item.name,
                });
              }}
            />
            <ActionButton
              text="X"
              label={`Delete session: ${session.item.name}`}
              action={() => {
                handle.deleteSession(session.item.key);
                // navigation.navigate('Home');
              }}
            />
          </>
        }>
        <SessionTeaser session={session.item} />
      </ActionCard>
    );
  }
}
