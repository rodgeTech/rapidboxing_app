import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-kitten';

const Empty = ({text = 'Nothing to show...'}) => (
  <View style={styles.wrapper}>
    <Text category="h6" appearance="hint">
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default Empty;
