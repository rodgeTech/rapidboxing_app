import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {Icon} from 'react-native-ui-kitten';

import {OrderContext} from '../contexts/OrderContext';

const MAX = 3;

const EditLineItemRollPicker = () => {
  const [orderState, dispatch] = useContext(OrderContext);

  const images = orderState.editImages;
  const selectedLocalImages = orderState.editImages.filter(
    editImage => 'uri' in editImage,
  );

  const onSelectImage = (images, current) => {
    dispatch({
      type: 'SET_EDIT_IMAGES',
      editImages: images,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.bold}>
          {' '}
          {selectedLocalImages.length}/{MAX} selected
        </Text>
      </View>
      <CameraRollPicker
        groupTypes="All"
        maximum={MAX}
        selected={images}
        imagesPerRow={3}
        callback={onSelectImage}
        style={{flex: 1}}
      />
    </View>
  );
};

EditLineItemRollPicker.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('EditLineItem')}>
        <Icon
          name="checkmark-outline"
          fill="#fff"
          width={35}
          height={35}
          style={{marginRight: 20}}
        />
      </TouchableOpacity>
    ),
  };
};

export default EditLineItemRollPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0079BF',
  },
  content: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
});
