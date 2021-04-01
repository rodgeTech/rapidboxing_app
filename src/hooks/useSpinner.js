import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export const useSpinner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderSpinner = () => (
    <React.Fragment>
      {isVisible && <Spinner visible={isVisible} />}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderSpinner,
  };
};
