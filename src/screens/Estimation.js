import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import FlatItemTotal from './estimation/FlatItemTotal';
import ShippingTotal from './estimation/ShippingTotal';
import FeesTotal from './estimation/FeesTotal';
import OverallTotal from './estimation/OverallTotal';

const Estimation = ({navigation}) => {
  const calculatedValues = navigation.getParam('calculatedValues', null);

  return (
    <React.Fragment>
      <Layout style={styles.container} level="2">
        <InputScrollView showsVerticalScrollIndicator={false}>
          <OverallTotal values={calculatedValues} />
          <FlatItemTotal values={calculatedValues} />
          <ShippingTotal values={calculatedValues} />
          <FeesTotal values={calculatedValues} />
        </InputScrollView>
      </Layout>
    </React.Fragment>
  );
};

export default Estimation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
