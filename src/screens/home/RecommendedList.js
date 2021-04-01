import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  List,
  Text
} from 'react-native-ui-kitten';

import RecommendedItem from './recommendedList/RecommendedItem';


export default RecommendedList = ({ items, shipmentSchedule, navigate }) => {
  const renderHeaderComponent = () => (
    <View style={styles.header}>
      <Text category='h6' style={{ marginTop: 5, color: '#313131' }}>Next shipment leaving on</Text>
      <Text category='h6'>{shipmentSchedule}</Text>
    </View>
  )

  return (
    <List
      keyExtractor={item => item.id}
      style={styles.list}
      data={items}
      renderItem={({ item }) => (
        <RecommendedItem item={item} navigate={navigate} />
      )}
      ListHeaderComponent={renderHeaderComponent}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    height: 150,
    backgroundColor: 'transparent'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#E5F4FF",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 20,
    marginHorizontal: 6
  }
});
