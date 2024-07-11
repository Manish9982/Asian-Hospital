import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, BackHandler, Alert, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import Loader from '../assets/Loader/Loader';

const ScannerScreen = ({ navigation }) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('FoodDashboard')
      //navigation.navigate('FoodCart')
    }, 3000);
  }, [])

  const navigationOnWebView = (navState) => {
    console.log("URLS ", navState.url);
    // Update canGoBack state
  };

  const renderLoading = () => {
    return (
      <View style={styles.containerLoader}>
        <Loader />
      </View>

    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <HeaderTwo Title="Order Food" />
      <WebView
        renderLoading={renderLoading}
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
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoader:
  {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ScannerScreen;
