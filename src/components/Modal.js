import React from 'react';
import ReactModal from 'react-native-modal';
import {View} from 'react-native';

function Modal({
  children,
  isOpen,
  closeModal,
  animationInTiming = 400,
  animationOutTiming = 400,
}) {
  return (
    <View style={{flex: 1}}>
      <ReactModal
        animationIn="fadeInDown"
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        isVisible={isOpen}
        onBackdropPress={closeModal}
        backdropOpacity={0.5}>
        <View style={{backgroundColor: '#FFF', padding: 20, borderRadius: 5}}>
          {children}
        </View>
      </ReactModal>
    </View>
  );
}

export default Modal;
