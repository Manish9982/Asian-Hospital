import { Alert, Linking, Platform, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FAB, Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'
import { colors, H, PostApiData, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import RNFS from 'react-native-fs'
import RNBlobUtil from 'react-native-blob-util';
//import RNFetchBlob from 'rn-fetch-blob'
import Loader from '../../assets/Loader/Loader'

const DisplayBill = ({ navigation, route }) => {
    useEffect(() => {
        downloadReport()
    }, [])
    const [url, setUrl] = useState("")
    const [visible, setVisible] = useState(true)

    // async function downloadFile(url) {
    //     var path = RNFetchBlob.fs.dirs.DocumentDir + "/bill.pdf";
    //     RNFetchBlob.fs.writeFile(path, url, "base64").then(res => {
            //console.log("File : ", res);
    //     });
    // }

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
        if (result?.status == '200') {
            Linking.openURL(result?.file_url)
        }
        else {
            Alert.alert("Error", "Download Error!")
        }


    };

    const downloadReport = async () => {


        var formdata = new FormData();
        formdata.append("rNumber", `${route.params.billNumber}`);

        const result = await PostApiData('report_data', formdata)
        setUrl(result?.ReportPDF)

    }

    return (
        <View>
            <HeaderTwo Title="View Bill" />
            <View style={{
                height: H,
                width: W,
                paddingBottom: H * 0.17
            }}>
                {visible &&
                    <Text style={{
                        alignSelf: "center",
                        marginTop: H * 0.45
                    }}>Loading..</Text>}
                <Pdf
                    onLoadProgress={onLoadProgress}
                    onLoadComplete={onLoadComplete}
                    source={{ uri: `data:application/pdf;base64,${url}` }}
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
        </View>
    )
}

export default DisplayBill