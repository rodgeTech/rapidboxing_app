import React, {useState} from 'react';

import Alert from '../components/Alert';

export const useAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = (closeInterval = 3000) => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, closeInterval);
  };

  const hide = () => setIsVisible(false);

  const RenderAlert = ({type, title, message}) => (
    <React.Fragment>
      <Alert
        isOpen={isVisible}
        closeAlert={hide}
        title={title}
        type={type}
        message={message}
      />
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderAlert,
  };
};
