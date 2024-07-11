import { Alert, Linking, Platform, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FAB, Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'
import { colors, H, PostApiData, W } from '../assets/Schemes/Schemes'
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import Loader from '../assets/Loader/Loader'
//import RNFetchBlob from 'rn-fetch-blob'
//import RNFS from 'react-native-fs'


const ShowBillPdf = ({ navigation, route }) => {
    useEffect(() => {
        // downloadThisReport()
        console.log("Linking=====>   ", route?.params?.link)
    }, [])


    const [url, setUrl] = useState("")
    const [visible, setVisible] = useState(false)
    const [loader, setLoader] = useState(true)


    const onLoadComplete = () => {
        // console.log("Load Complete")
        setVisible(false)
    }
    const onLoadProgress = () => {
        // console.log("Progress...")
    }




    const downloadThisReport = async (base64String, fileName) => {
        Linking.openURL(Linking.openURL(route?.params?.link))
        setUrl(route?.params?.link)
    };


    return (
        // loader
        //     ?
        //     <Loader />
        //     :
        <View>
            <HeaderTwo Title="View Invoice" />
            {


                <View style={{
                    height: H,
                    width: W,
                    paddingBottom: H * 0.18
                }}>


                    <Pdf
                        // source={{ uri: `data:application/pdf;base64,${url}` }}
                        source={{ uri: route?.params?.link }}
                        onLoadComplete={onLoadComplete}
                        onLoadProgress={onLoadProgress}
                        style={{
                            flex: 1
                        }} />
                    <FAB
                        icon="download"
                        color='white'
                        style={
                            Platform.OS == "android" ?
                                {
                                    height: H * 0.077,
                                    width: H * 0.077,
                                    top: H * 0.7,
                                    position: 'absolute',
                                    margin: 16,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: colors.toobarcolor
                                }
                                :
                                {
                                    top: H * 0.7,
                                    position: 'absolute',
                                    margin: 16,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: colors.toobarcolor
                                }
                        }
                        onPress={() => downloadThisReport(url, `${Date.now()}.pdf`)}
                    />
                </View>
            }
        </View>
    )
}


export default ShowBillPdf