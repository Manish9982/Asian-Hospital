import { View, SafeAreaView, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import { H, W } from '../../assets/Schemes/Schemes';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { Text } from 'react-native-paper';
import { Constants } from '../../assets/Schemes/Constants';


const DoCIpdReports = ({ navigation, route }) => {

    const [loader, setLoader] = useState(true)

    const onLoadEnd = () => {
        setLoader(false)
    }
    //console.log(route?.params?.ipcase)
    //console.log(loader)
    return (
        <View style={{
            height: H,
            width: W,
        }}>
            <HeaderTwo Title="Report" />
            {loader &&
                <View style={{
                    backgroundColor: "white"
                }}>
                    <Text style={{
                        alignSelf: "center",
                        marginTop: 250
                    }}>Loading..</Text>
                </View>
            }
            <WebView
                source={{ uri: `${Constants.IPD_REPORTS_URL}${route?.params?.ipcase}` }}
                onLoadEnd={onLoadEnd}
            />
        </View>
    );
}

export default DoCIpdReports