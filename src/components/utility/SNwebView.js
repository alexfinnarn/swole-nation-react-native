import React, {useState} from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, View} from 'react-native';

const SNwebView = ({navigation}) => {
  const url = navigation.getParam('url', 'https://github.com/alexfinnarn/swole-nation-react-native/wiki/User-Guide');
  const [loading, setLoading] = useState(true);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <WebView
        onLoad={() => setLoading(false)}
        source={{uri: url}}
        style={{marginTop: 5, flex: 1}}
      />
      {loading && (
        <ActivityIndicator
          style={{ flex: 4}}
          size="large"
        />
      )}
    </View>
  );
};

export default SNwebView;
