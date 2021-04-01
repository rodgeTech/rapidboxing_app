import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-ui-kitten';

import {moneyFormat} from '../../../utils/money';

export default (CartItem = ({item, removeLineItem, navigate}) => (
  <View style={styles.item}>
    {/* <Image
      style={{ width: '100%', height: 160, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
      source={{ uri: item.coverImage }}
    /> */}
    <View style={{padding: 20}}>
      <TouchableOpacity
        onPress={() =>
          navigate('ListingWebView', {url: item.link, title: item.link})
        }
        activeOpacity={0.8}>
        <Text appearance="hint" numberOfLines={2}>
          {item.link}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text category="s1" style={{paddingRight: 10}}>
            {moneyFormat(item.price, 'usd')}
          </Text>
          <Text category="s1" appearance="hint">
            Qty {item.quantity}
          </Text>
        </View>
        <Button
          onPress={() => removeLineItem(item.id)}
          status="basic"
          size="tiny">
          Remove
        </Button>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  item: {
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
