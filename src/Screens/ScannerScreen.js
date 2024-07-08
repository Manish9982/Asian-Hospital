import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, BackHandler, Alert, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import Loader from '../assets/Loader/Loader';

const ScannerScreen = ({ navigation }) => {
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
  useEffect(() => {
    setTimeout(() => {
      //navigation.navigate('FoodDashboard')
      navigation.navigate('FoodCart')
    }, 3000);
  }, [])

  const navigationOnWebView = (navState) => {
    console.log("URLS ", navState.url);
    setCanGoBack(navState.canGoBack); // Update canGoBack state
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
