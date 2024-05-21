import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const ScannerScreen = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior (exit the app)
      } else {
        Alert.alert('Exit App', 'Do you want to exit?', [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default behavior
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [canGoBack]);

  const navigationOnWebView = (navState) => {
    console.log("URLS ", navState.url);
    setCanGoBack(navState.canGoBack); // Update canGoBack state
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <WebView
        ref={webViewRef}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        scrollEnabled={false}
        source={{ uri: "https://appl.aimsindia.com/qrcode" }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={navigationOnWebView}
      />
    </SafeAreaView>
  );
};

export default ScannerScreen;
