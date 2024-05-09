import React, { useEffect, useState } from 'react';
import {
    View, FlatList, Dimensions, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert
} from 'react-native'

import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { colors, fontFamily, fontSizes, globalStyles, PostApiData } from '../../assets/Schemes/Schemes';
import DoCViewImage from './DoCViewImage';
import Loader from '../../assets/Loader/Loader';
import { Text } from 'react-native-paper';


const DoCViewPrescription = ({ navigation, route }) => {

    // console.log("AppointmentID +++ ", route.params.appintmentID)

    const [loader, setLoader] = useState(false)

    const [data, setData] = useState(null)


    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width


    useEffect(() => { getPrescriptionList() }, [])


    const getPrescriptionList = async (date) => {
        setLoader(true)
        var formdata = new FormData();

        formdata.append("appo_id", route.params.appintmentID);

        // console.log("request===>", formdata)

        const result = await PostApiData('prescription_list', formdata)
        // console.log("result==", result)

        if (result?.status == '200') {
            setData(result)
        } else {
            setData({ "appoint": [], " ": "No Data Found!", "status": "201" })
            Alert.alert('Info', result?.message)
            navigation.goBack()
        }
        setLoader(false)
    }


    const renderItem = ({ item, index }) => {

        // { console.log("ITEM === ", item?.date) }

        return (
            <View>
                <Text
                    style={globalStyles.heading}>Appointment Date: {item?.date}</Text>
                <DoCViewImage ImageData={item?.imagesData}
                    Link={item?.url} />
            </View>
        )

    }
    return (

        loader ?
            <>
                <Loader />
            </>
            :


            <View>
                <HeaderTwo
                    Title="Prescriptions" />
                <View
                    style={{
                        width: W,
                        height: H,
                        alignItems: 'center', paddingBottom: H * 0.1
                    }}>
                    <FlatList
                        data={data?.prescription}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`} />
                </View>
            </View>

    )
}

export default DoCViewPrescription