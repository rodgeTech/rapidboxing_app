import React from 'react';
import OneSignal from 'react-native-onesignal';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';

import {CartProvider} from './contexts/CartContext';
import {ListingProvider} from './contexts/ListingContext';
import {ShippingRateProvider} from './contexts/ShippingRateContext';

import Navigation from './navigators';
import {default as customMapping} from './custom-mapping.json';
import {OrderProvider} from './contexts/OrderContext';

function myiOSPromptCallback(permission) {
  // do something with permission value
}

export default class App extends React.Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging
    // OneSignal.setLogLevel(6, 0);

    OneSignal.init('6f706d0f-df46-4e62-bf8b-122adc18ba9b', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          mapping={mapping}
          customMapping={customMapping}
          theme={lightTheme}>
          <CartProvider>
            <ListingProvider>
              <ShippingRateProvider>
                <OrderProvider>
                  <Navigation />
                </OrderProvider>
              </ShippingRateProvider>
            </ListingProvider>
          </CartProvider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}
