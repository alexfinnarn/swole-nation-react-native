import React from 'react';
import {Text, View} from 'react-native';

export default function Table({headers, rowData}) {
  return (
    <>
      <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: '#d6d7da', borderRadius: 2}}>
        {headers.map((headerText, index) => <Text key={index} style={{flex: 1, alignSelf: 'stretch'}}>{headerText}</Text>)}
      </View>
      <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: '#d6d7da', borderRadius: 2, marginBottom: 20}}>
        {rowData.map((datum, index) => <Text key={index} style={{flex: 1, alignSelf: 'stretch'}}>{datum}</Text>)}
      </View>
    </>
  );
}
