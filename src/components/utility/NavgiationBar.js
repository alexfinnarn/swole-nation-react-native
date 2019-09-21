import React from 'react';
import {styles} from "../Styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';

export default function NavigationBar({ navigation }) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 10, backgroundColor: '#69D1C5'}}>
      <FontAwesome5 name="running" solid
                    style={[styles.shadowThing, {fontSize: 40, padding: 10, marginRight: 10}]}
                    // onPress
      />
      <FontAwesome5 name="calendar-alt" solid style={[styles.shadowThing, {fontSize: 40, padding: 10, marginRight: 10}]}/>
      <FontAwesome5 name="dumbbell" solid style={[styles.shadowThing, {fontSize: 40, padding: 10, marginRight: 10}]}/>
      <FontAwesome5 name="cog" solid style={[styles.shadowThing, {fontSize: 40, padding: 10, marginRight: 10}]}/>
    </View>
  );
}
