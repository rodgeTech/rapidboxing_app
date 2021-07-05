import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon} from 'react-native-ui-kitten';

export default function CameraOrder() {
  const snap = () => {};
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <TouchableOpacity onPress={snap} style={styles.capture}>
          <Icon name="camera-outline" fill="#fff" width={50} height={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#0079BF',
    padding: 10,
    borderWidth: 4,
    borderColor: '#fff',
  },
});
