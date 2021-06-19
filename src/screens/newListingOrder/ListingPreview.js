import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default (NewOrder = ({listing}) => {
  if (!listing) return null;

  return (
    <React.Fragment>
      <View style={styles.previewContainer}>
        <FastImage
          style={styles.previewImage}
          source={{
            uri: listing.coverImage,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  previewContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#DCE6EE',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
