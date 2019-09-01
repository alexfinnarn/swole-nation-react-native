import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {

  const [neener, setNeener] = useState(1);

  return (
    <View style={styles.container}>
      <Text onPress={() => setNeener(neener + 1)}>You're gonna be so cool {neener} times infinity!!!</Text>
      <Image
        source={pic}
        style={{width: 300, height: 300}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
