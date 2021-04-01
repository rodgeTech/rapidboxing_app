import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';

import {useConfirm} from '../../hooks/useConfirm';

export default (Menu = ({signOut, navigation}) => {
  const {show, RenderConfirm} = useConfirm();
  return (
    <React.Fragment>
      <RenderConfirm callback={signOut} />
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('MyOrders')}>
          <Icon
            name="shopping-bag-outline"
            fill="#2980b9"
            width={22}
            height={22}
            style={{marginRight: 10}}
          />
          <Text style={styles.text}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}>
          <Icon
            name="edit-2-outline"
            fill="#2980b9"
            width={22}
            height={22}
            style={{marginRight: 10}}
          />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={show}>
          <Icon
            name="log-out-outline"
            fill="#2980b9"
            width={22}
            height={22}
            style={{marginRight: 10}}
          />
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#FFF',
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEF8FF',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 17,
  },
});
