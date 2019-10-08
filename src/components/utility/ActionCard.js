import React from 'react';
import {Text, View} from 'react-native';
import {home} from '../Styles';
import ActionButton from './ActionButton';

export default function ActionCard({children, actionComponent}) {
  return (
    <View style={home.sectionContainer}>
      <View style={home.sectionLeft}>{children}</View>
      {actionComponent}
    </View>
  );
}
