import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-ui-kitten';

import OrderItem from './orders/OrderItem';
import Empty from '../../components/Empty';

export default (Orders = ({items, navigation}) => {
  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 15,
      }}
    />
  );

  return (
    <List
      style={styles.list}
      data={items}
      renderItem={({item}) => <OrderItem item={item} navigation={navigation} />}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={Empty}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingTop: 20,
  },
});
