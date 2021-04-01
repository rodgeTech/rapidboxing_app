import React, {useState} from 'react';

import Confirm from '../components/Confirm';

export const useConfirm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderConfirm = ({callback}) => (
    <Confirm
      isOpen={isVisible}
      closeConfirm={hide}
      callback={() => {
        hide();
        callback();
      }}
    />
  );

  return {
    show,
    hide,
    RenderConfirm,
  };
};
