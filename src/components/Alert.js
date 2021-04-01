import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {View} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';

function Alert({type, title, message, isOpen, closeAlert}) {
  const [bounce, setBounce] = useState(new Animated.Value(120));

  if (!isOpen) {
    return null;
  }

  Animated.spring(bounce, {
    toValue: 0,
    velocity: 3,
    tension: 2,
    friction: 8,
  }).start();

  return (
    <TouchableHighlight style={styles.container} onPress={closeAlert}>
      <Animated.View
        style={[styles.alert, {transform: [{translateY: bounce}]}]}>
        <View style={styles.header}>
          <Icon
            name="checkmark-circle-2-outline"
            fill="#fff"
            width={25}
            height={25}
          />
          <Text style={{color: '#fff', marginLeft: 5}} category="h6">
            {title}
          </Text>
        </View>

        <Text style={{color: '#fff'}}>{message}</Text>
      </Animated.View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  alert: {
    backgroundColor: '#3498db',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    height: 120,
    justifyContent: 'center',
  },
});

export default Alert;
