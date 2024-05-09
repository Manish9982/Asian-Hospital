import {
    View, Text, FlatList, Dimensions, Image, TouchableOpacity, ToastAndroid, Alert
} from 'react-native'

import React, { useEffect, useState } from 'react'
import { Searchbar, ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, PostApiData, timeStampToDateFormaty_m_d, } from '../../assets/Schemes/Schemes';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import Loader from '../../assets/Loader/Loader';







const DoCUpcomingAppointments = ({ navigation }) => {

    const [value, setValue] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)

    const onChangeSearch = query => setSearchQuery(query);

    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width


    useEffect(() => {
        getAppointmentList(timeStampToDateFormaty_m_d(Date.now()))
    }, [])


    const getAppointmentList = async (date) => {
        setLoader(true)

        const result = await GetApiData('patient_upcomingappo')

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

    const timeStampToDate = (ts) => {
        const date = new Date(ts)
        const day = date.getDate().toString().padStart(2, 0)
        const month = (date.getMonth() + 1).toString().padStart(2, 0)
        const year = (date.getFullYear()).toString().padStart(2, 0)
        currentdate = (`${day}-${month}-${year}`)
        // console.log("FilterDAte,", currentdate)
        return `${day}-${month}-${year}`
    }

    const renderItem = ({ item, index }) => {
        return (


            <View
                style={{
                    backgroundColor: item?.color,
                    marginVertical: H * 0.015,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#8B82DA',
                    width: W * 0.95,
                    padding: 5,
                }}>

                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: W * 0.05
                    }}>

                    <View style={{
                        //marginLeft: W * 0.07,
                    }}>

                        <View style={{
                            //flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={{
                                    color: item?.text_color,
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.XL,
                                    width: W * 0.8,
                                }}>{`${item.full_name}`}</Text>
                        </View>


                        <Text
                            style={{
                                color: item?.text_color,
                                // marginHorizontal: W * 0.04,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.SM,
                                color: item?.text_color
                            }}>Gender: {item?.gender}

                            <Text
                                style={{
                                    color: item?.text_color,
                                    // marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: item?.text_color
                                }}>      Age: {item?.age}



                            </Text>


                        </Text>

                        <Text
                            style={{
                                color: item?.text_color,
                                // marginHorizontal: W * 0.04,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.SM,
                                color: item?.text_color
                            }}>UHID: {item?.his_id}
                            <Text
                                style={{
                                    color: item?.text_color,
                                    // marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: item?.text_color
                                }}>      M: {item?.phone}</Text>

                        </Text>



                        <Text
                            style={{
                                color: item?.text_color,
                                // marginHorizontal: W * 0.04,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.SM,
                                color: item?.text_color,

                            }}>Date: {`${item?.date} ${item?.year}`} at {item?.slot}
                            <Text
                                style={{
                                    //color: item.appo_type == "Online" ? "green" : "blue",
                                    color: item?.text_color,
                                    //  marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.EXTRASM,
                                }}>             ({item.appo_type})</Text>


                        </Text>
                        <Text
                            style={{
                                color: item?.text_color,
                                // marginHorizontal: W * 0.04,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.SM,
                                color: item?.text_color
                            }}>Pay: {item?.p_type}</Text>
                        {
                            item?.p_name !== ""
                            &&
                            <Text
                                style={{
                                    color: item?.text_color,
                                    // marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: item?.text_color,
                                }}>Inst: {item?.p_name}</Text>
                        }


                    </View>

                </View>


            </View >

        )

    }

    return (


        false ?
            <>
                <Loader />
            </>
            :

            <View
                style={{
                    width: W,
                    backgroundColor: '#F5F5F5',

                }}>

                <HeaderTwo Title="Upcoming " />

                <View style={{
                    width: W,
                    height: H,
                    alignItems: 'center',

                }}>

                    <FlatList
                        contentContainerStyle={{ paddingBottom: H * 0.25 }}
                        data={data?.appoint}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`} />

                </View>
            </View>
    )
}
export default DoCUpcomingAppointments