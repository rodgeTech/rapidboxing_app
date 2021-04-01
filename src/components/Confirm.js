import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {Text, Icon, Button} from 'react-native-ui-kitten';

function Confirm({callback, isOpen, closeConfirm}) {
  return (
    <View style={{flex: 1}}>
      <Modal
        animationIn="fadeInDown"
        isVisible={isOpen}
        onBackdropPress={closeConfirm}
        backdropOpacity={0.5}>
        <View style={{backgroundColor: '#FFF', padding: 20, borderRadius: 5}}>
          <Text category="h6">Please Confirm</Text>
          <Text category="s1" appearance="hint">
            Are you sure you want to continue?
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Button
              status="success"
              size="large"
              onPress={callback}
              style={{width: 100, marginRight: 20}}>
              Yes
            </Button>
            <Button
              status="basic"
              size="large"
              onPress={closeConfirm}
              style={{width: 100}}>
              No
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Confirm;
