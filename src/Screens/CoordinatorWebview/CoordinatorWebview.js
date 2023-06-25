import { BackHandler, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { H, W, colors } from '../../assets/Schemes/Schemes'
import WebView from 'react-native-webview'
import { Constants } from '../../assets/Schemes/Constants'
import Loader from '../../assets/Loader/Loader'

const CoordinatorWebview = () => {
  const webviewRef = useRef(null);
  const [webViewUrl, setWebViewUrl] = useState(Constants.COORDINATOR_LOGIN);
  const [originalUrl, setOriginalUrl] = useState(Constants.COORDINATOR_LOGIN);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleRefresh = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  }

  const handleLogout = () => {
    setWebViewUrl(originalUrl);
  }

  const renderLoading = () => {
    return (
      <View style={styles.containerLoader}>
        <Loader />
      </View>

    )
  }

  return (
    <SafeAreaView style={{ height: H, width: W }}>
      <View style={styles.headerCoordinator}>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.blueText}>Refresh</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.blueText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
      <WebView
        renderLoading={renderLoading}
        ref={webviewRef}
        source={{ uri: webViewUrl }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={navState => {
          //console.log(navState)
          setOriginalUrl(navState.url);
        }}
        //onError={(e) => console.log('webview Error', e)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerCoordinator:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  blueText:
  {
    color: colors.toobarcolor,
    textDecorationLine: 'underline'
  },
  containerLoader:
  {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CoordinatorWebview;
