import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

const CameraRollSelect = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [num, setNum] = useState(0);

  const getSelectedImages = (images, current) => {
    const num = images.length;

    setSelectedImages(images);
    setNum(num);

    console.log(current);
    console.log(selectedImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.bold}> {num} </Text> images has been selected
        </Text>
      </View>
      <CameraRollPicker
        groupTypes="All"
        maximum={3}
        selected={selectedImages}
        imagesPerRow={3}
        callback={getSelectedImages}
        style={{flex: 1}}
      />
    </View>
  );
};

export default CameraRollSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
