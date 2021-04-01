import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Layout, Button} from 'react-native-ui-kitten';

export default (CartEmpty = ({navigate}) => {
  return (
    <Layout style={styles.container}>
      <Text category="h5" style={{paddingHorizontal: 6, marginBottom: 5}}>
        Your shopping cart is empty
      </Text>
      <Text category="h6" appearance="hint">
        Looking for ideas?
      </Text>
      <Button
        status="primary"
        size="large"
        style={{marginTop: 30, marginBottom: 20}}
        onPress={() => navigate('Home')}>
        See featured items
      </Button>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
