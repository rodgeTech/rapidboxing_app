import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-ui-kitten';
import {moneyFormat} from '../../../utils/money';

// import NumberFormat from 'react-number-format';

export default (OrderItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('OrderDetails', {
        orderId: item.id,
        title: `#${item.trackingNumber}`,
      })
    }
    activeOpacity={0.7}>
    <View style={styles.listItem}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text>
              #{item.trackingNumber}
            </Text>
          </View>
        </View>
        <Text appearance="hint">{item.createdAt}</Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          marginTop: 10,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: '#EEF8FF',
        }}>
        <View style={{flex: 1}}>
          <Text>Total</Text>
        </View>
        <View>
          <Text>{moneyFormat(item.total, 'bzd')}</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: 10,
          marginTop: 10,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: '#EEF8FF',
        }}>
        <View style={{flex: 1}}>
          <Text>Status</Text>
        </View>
        <View>
          <Text>{item.status}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
});
