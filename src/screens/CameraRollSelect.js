import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {Icon} from 'react-native-ui-kitten';

import {OrderContext} from '../contexts/OrderContext';

const MAX = 3;

const CameraRollSelect = ({navigation}) => {
  const [orderState, dispatch] = useContext(OrderContext);

  const [selectedImages, setSelectedImages] = useState([]);
  const [num, setNum] = useState(0);

  const getSelectedImages = (images, current) => {
    const num = images.length;

    setSelectedImages(images);
    setNum(num);

    dispatch({
      type: 'SET_IMAGES',
      images,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.bold}>
          {' '}
          {num}/{MAX} selected
        </Text>
      </View>
      <CameraRollPicker
        groupTypes="All"
        maximum={MAX}
        selected={selectedImages}
        imagesPerRow={3}
        callback={getSelectedImages}
        style={{flex: 1}}
      />
    </View>
  );
};

CameraRollSelect.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('NewOrderScreen')}>
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

export default CameraRollSelect;

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
