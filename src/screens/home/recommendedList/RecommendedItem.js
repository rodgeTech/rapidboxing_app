import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Icon, Button} from 'react-native-ui-kitten';

export default (RecommendedItem = ({item, navigate}) => (
  <View style={styles.item}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigate('ListingWebView', {url: item.link, title: item.link})
      }>
      <Image
        style={{
          width: '100%',
          height: 160,
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          backgroundColor: '#DCE6EE',
        }}
        source={{uri: item.coverImage}}
      />
      <View style={{padding: 20}}>
        <Text appearance="hint" numberOfLines={1}>
          {item.title}
        </Text>
        <View
          style={{
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 2, justifyContent: 'flex-start'}}>
            <Text category="h6" style={{color: '#313131'}}>
              ${item.price}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button
              status="basic"
              size="tiny"
              icon={() => (
                <Icon
                  name="shopping-cart-outline"
                  fill="#000"
                  width={18}
                  height={18}
                />
              )}
              onPress={() =>
                navigate('NewOrderScreen', {
                  listingId: item.id,
                  title: item.title,
                })
              }
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});
