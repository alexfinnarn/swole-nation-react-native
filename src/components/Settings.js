import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './Styles';
import ActionButton from './utility/ActionButton';

export default function Settings({theSetting, handle}) {
  const [name, setName] = useState(theSetting);

  return (
    <View style={[styles.container, {justifyContent: 'space-between'}]}>
      <View style={{flex: 5}}>
        <Text style={[styles.bold]}>A Setting</Text>
        <TextInput
          style={[styles.editText, styles.mediumTextInputFont]}
          onChangeText={text => setName(text)}
          value={name}
        />
      </View>
      <View style={{flex: 1}}>
        <ActionButton
          label="Save Settings"
          action={() => handle.saveSettings(name)}
          text="Save"
        />
      </View>
    </View>
  );
}
