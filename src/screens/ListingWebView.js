import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const ListingWebView = ({ navigation }) => {
  const url = navigation.getParam('url', null)

  const renderLoading = () => (
    <ActivityIndicator
      size="large"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
    />
  )

  return (
    <WebView
      startInLoadingState
      source={{ uri: url }}
      renderLoading={renderLoading}
    />
  );
}

ListingWebView.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("title")
});

export default ListingWebView;