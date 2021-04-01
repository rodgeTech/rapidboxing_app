import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

export default (NewOrder = ({listing}) => {
  if (!listing) return null;

  return (
    <React.Fragment>
      <View style={styles.previewContainer}>
        <ImageBackground
          style={styles.previewImage}
          source={{uri: listing.coverImage}}
          resizeMode="cover"
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
