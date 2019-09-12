import React from 'react';
import {Text, View} from 'react-native';
import { styles } from '../Styles';

export default function Table({headers, rowData, columnFlex}) {
  return (
    <>
      <View style={{
        flex: 1,
        marginTop: 10,
        alignSelf: 'stretch',
        flexDirection: 'row'}}>
        {headers.map((headerText, index) =>
          <Text key={index} style={[ styles.bold, {flex: columnFlex[index], borderWidth: 1,
            borderColor: '#d6d7da', paddingLeft: 7, alignSelf: 'stretch'}]}>{headerText}</Text>)}
      </View>
      <View style={{
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginBottom: 10}}>
        {rowData.map((datum, index) =>
          <Text key={index} style={{flex: columnFlex[index], borderWidth: 1,
            borderColor: '#d6d7da', paddingLeft: 7, alignSelf: 'stretch'}}>{datum}</Text>)}
      </View>
    </>
  );
}
