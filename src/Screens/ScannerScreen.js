import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import Loader from '../assets/Loader/Loader';
import { savelocalStorageData } from '../assets/Schemes/Schemes';
import { LocalStore } from '../assets/Schemes/Constants';

const ScannerScreen = ({ navigation }) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    navigation.replace('FoodDashboard')
  }, [])
  
  function extractRoomAndBed(url) {
    console.log('url===>', url);

    // Use regular expressions to extract the parameters
    const roomMatch = url.match(/roomno=([^&]*)/);
    const bedMatch = url.match(/bedno=([^&]*)/);

    // Extract the values
    const roomno = roomMatch ? roomMatch[1] : null;
    const bedno = bedMatch ? bedMatch[1] : null;

    Alert.alert('Ordering For', `Room number: ${roomno} \nBed number: ${bedno}`)
    // Save to local storage
    if (roomno) {
      savelocalStorageData(LocalStore.ROOM_NO, roomno);
    }
    if (bedno) {
      savelocalStorageData(LocalStore.BED_NO, bedno);
    }
  }

  const navigationOnWebView = (navState) => {
    console.log("URLS ", navState.url);
    if (navState?.url?.toString()?.includes('aimsindia.com/qrcode/data?')) {
      extractRoomAndBed(navState.url)
      navigation.replace('FoodDashboard')
    }
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
