import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import AuthLoading from '../screens/AuthLoading';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppTabs,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default () => {
  const prefix = 'rapidboxing://';
  return <AppContainer uriPrefix={prefix} />;
};
