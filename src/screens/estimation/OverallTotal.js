import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

const OverallTotal = ({values}) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text category='h5' style={{color: '#2980b9'}}>Estimated Total:</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text category='h5' style={{color: '#2980b9'}}>{moneyFormat(values.overall_total, 'bzd')}</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default OverallTotal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEF8FF',
    paddingVertical: 12,
  },
});
