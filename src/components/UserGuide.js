import React from 'react';
import Markdown from 'react-native-markdown-renderer';

const UserGuide = ({navigation}) => {
  // const content = navigation.getParam('content', 'No content passed into route.');
  // const content = md;
  // console.log(content);
  return (
    <Markdown style={{flex: 1, padding: 5}}>{`
      ## Home

      > Foo

      - list
      - two
    `}</Markdown>
  );
};

UserGuide.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'User Guide')
  };
};

export default UserGuide;
