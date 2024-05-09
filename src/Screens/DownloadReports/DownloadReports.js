import { Alert, Linking, Platform, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FAB, Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'
import { colors, H, PostApiData, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import Loader from '../../assets/Loader/Loader'
//import RNFetchBlob from 'rn-fetch-blob'
//import RNFS from 'react-native-fs'

const DownloadReports = ({ navigation, route }) => {
    useEffect(() => {
        downloadReport()
    }, [])
    const [url, setUrl] = useState("")
    const [visible, setVisible] = useState(true)
    const [loader, setLoader] = useState(true)

    const onLoadComplete = () => {
        // console.log("Load Complete")
        setVisible(false)
    }
    const onLoadProgress = () => {
        // console.log("Progress...")
    }


    const downloadThisReport = async (base64String, fileName) => {

        var formdata = new FormData()
        formdata.append("pdf", base64String)
        const result = await PostApiData('downloadPdf', formdata)
        // console.log("pdf download link api result", result)
        if (result?.status == '200') {
            Linking.openURL(result?.file_url)
            //  navigation.navigate("DoCImageViewer", { "link": result?.file_url })
            // downloadFile(result?.file_url, fileName)
        }
        else {
            Alert.alert("Error", "Download Error!")
        }


    };


    const downloadReport = async () => {

        var formdata = new FormData();
        formdata.append("rNumber", `${route.params.reportNumber}`);
        const result = await PostApiData('report_data', formdata)
        if (result?.ReportPDF) {
            setUrl(result?.ReportPDF)
        }
        else {
            Alert.alert('Info', 'Report is not available, please try later')
            navigation.goBack()
        }
        setLoader(false)

    }

    return (
        loader
            ?
            <Loader />
            :
            <View>
                <HeaderTwo Title="View Report" />
                {

                    <View style={{
                        height: H,
                        width: W,
                        paddingBottom: H * 0.18
                    }}>
                        {visible &&
                            <Text style={{
                                alignSelf: "center",
                                marginTop: H * 0.45
                            }}>Loading..</Text>}
                        <Pdf
                            source={{ uri: `data:application/pdf;base64,${url}` }}
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

export default DownloadReports