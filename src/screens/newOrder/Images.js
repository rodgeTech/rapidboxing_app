import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Icon} from 'react-native-ui-kitten';

import {OrderContext} from '../../contexts/OrderContext';

const {width: screenWidth} = Dimensions.get('window');

const Images = ({images}) => {
  const [orderState, dispatch] = useContext(OrderContext);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            height: 30,
            width: 30,
            backgroundColor: '#F2F8FF',
            borderRadius: 50,
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              dispatch({
                type: 'REMOVE_IMAGE',
                image: item,
              })
            }>
            <Icon name="close-outline" fill="#C5CEE0" width={20} height={20} />
          </TouchableOpacity>
        </View>

        <ParallaxImage
          source={{uri: item.uri}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={images}
      renderItem={renderItem}
      hasParallaxImages={true}
    />
  );
};

export default Images;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  imagePreivew: {
    resizeMode: 'cover',
    height: 300,
  },
});
