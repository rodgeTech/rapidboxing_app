import React, {useState} from 'react';

import Modal from '../components/Modal';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({
    children,
    animationInTiming,
    animationOutTiming,
    onModalHide,
  }) => (
    <React.Fragment>
      {isVisible && (
        <Modal
          isOpen={isVisible}
          closeModal={hide}
          animationInTiming={animationInTiming}
          animationOutTiming={animationOutTiming}
          onModalHide={onModalHide}>
          {children}
        </Modal>
      )}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};
