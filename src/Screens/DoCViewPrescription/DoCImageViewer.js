import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { WebView } from 'react-native-webview';
import DataContext from '../../assets/Context/DataContext';
import { H, W } from '../../assets/Schemes/Schemes';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';

const DoCImageViewer = ({ navigation, route }) => {

    return (
        <SafeAreaView style={{
            height: H,
            width: W,
        }}>
            <HeaderTwo />
            <WebView
                source={{ uri: route.params.link }}
            />
        </SafeAreaView>
    );
}

export default DoCImageViewer