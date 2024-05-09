import {
    View, FlatList, Dimensions, Image, StyleSheet,
    ScrollView, Alert, Modal, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fontFamily, fontSizes, GetApiData, W } from '../../assets/Schemes/Schemes';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import Loader from '../../assets/Loader/Loader';
import DoctorCardWithoutPrice from '../../assets/Schemes/DoctorCardWithoutPrice';
import WebView from 'react-native-webview';
import { Divider, Text } from 'react-native-paper';


const DoCMyProfile = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)
    const [modalvisible2, setModalvisible2] = useState(false)
    const onChangeSearch = query => setSearchQuery(query);
    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width

    useEffect(() => { getUserProfile() }, [])

    const getUserProfile = async () => {
        setLoader(true)

        const result = await GetApiData('doctor_profile')

        if (result?.status == '200') {
            setData(result)

        } else {
            Alert.alert(Info, result?.message)
        }
        setLoader(false)
    }

    return (



        loader ?
            <>
                <Loader />
            </>
            :


            <ScrollView style={{ backgroundColor: 'white', height: H }}>
                <Modal
                    visible={modalvisible2}
                    transparent={true}>
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        height: H,
                        width: W,
                        justifyContent: "center",
                        alignItems: "center",

                    }}>


                        <View style={{
                            paddingVertical: H * 0.02,
                            width: W * 0.9,
                            backgroundColor: "white",
                            borderRadius: 8,
                        }}>

                            <Text style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                                color: colors.black,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.default
                            }}>Information</Text>


                            <Divider
                                style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />
                            <View style={{
                                height: 300,
                                width: 300,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <WebView
                                    style={{
                                        height: H * 0.2,
                                        width: W * 0.7,
                                    }}
                                    originWhitelist={['*']}
                                    source={{
                                        html: `
                                    <!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
                                  ${data?.doctor?.description}
                                  </body>
</html>
                                  ` }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: W,
                                    justifyContent: 'center',
                                    marginTop: H * 0.03
                                }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalvisible2(false)
                                    }}>
                                    <Text style={{
                                        color: 'red',
                                        fontSize: fontSizes.XL,
                                        fontFamily: fontFamily.medium,
                                    }}>Close</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </Modal>
                <View style={{ backgroundColor: 'white', height: H }}>

                    <View >

                        <HeaderTwo Title="My Profile" />

                        <View>
                            <Image
                                source={require('../../assets/Images/profilebg.png')}
                                style={{
                                    height: H,
                                    width: W,
                                    position: 'absolute',
                                    resizeMode: 'stretch'
                                }} />
                        </View>

                        <View>


                            <DoctorCardWithoutPrice
                                id={data?.doctor?.id}
                                profile_url={data?.doctor?.profile_url}
                                image={data?.doctor?.image}
                                first_name={data?.doctor?.first_name}
                                category={data?.doctor?.category}
                                designation={data?.doctor?.designation}
                                education={data?.doctor?.education}
                            />

                        </View>

                        <View
                            style={{
                                borderRadius: 10,
                                borderColor: 'black'
                            }}>


                            <TouchableOpacity
                                onPress={() => { setModalvisible2(true) }}
                                style={{
                                    alignSelf: "center",
                                    height: H * 0.15,
                                    width: W * 0.95,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    overflow: 'hidden',
                                    marginTop: H * 0.01

                                }}>
                                <Text
                                    style={{
                                        textDecorationLine: "underline"
                                    }}
                                >Information</Text>
                                {data?.doctor?.see_more == '1' &&
                                    <Text style={{
                                        position: "absolute",
                                        zIndex: 10,
                                        color: "red",
                                        fontFamily: fontFamily.semibold,
                                        fontSize: fontSizes.SM,
                                        top: H * 0.12,
                                        right: W * 0.05
                                    }}>...See More</Text>}
                                <WebView
                                    style={{
                                        height: 150,
                                        width: W * 0.93,
                                    }}
                                    originWhitelist={['*']}
                                    source={{
                                        html: `
                    <!doctype html>
<html lang="en">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=0.85">
</head>
<body>
                  ${data?.doctor?.short_description}
                  </body>
</html>
                  ` }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{}}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: H * 0.05
                                }}>

                                <Image
                                    style={{
                                        marginLeft: W * 0.1,
                                        height: H * 0.024,
                                        width: H * 0.024,
                                    }}
                                    source={require('../../assets/Images/files.png')} />

                                <Text style={{
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.XL,
                                    color: colors.white,
                                    marginStart: H * 0.025,
                                    color: "white", fontSize: fontSizes.XL
                                }}>Doctor Code</Text>

                            </View>

                            <Text style={{

                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.default,
                                color: colors.white,
                                marginStart: H * 0.097,
                                color: "white", fontSize: fontSizes.default
                            }}>{data?.doctor?.doctor_code}</Text>
                        </View>

                        {/* <View
                            style={{}}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: H * 0.05 }}>

                                <Image
                                    style={{
                                        marginLeft: W * 0.1,
                                        height: H * 0.024,
                                        width: H * 0.024,
                                        tintColor: 'white'
                                    }}
                                    source={require('../../assets/Images/money.png')} />
                                <Text style={{

                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.XL,
                                    color: colors.white,
                                    marginStart: H * 0.028,
                                    color: "white", fontSize: fontSizes.XL
                                }}>Consultant Online</Text>

                            </View>

                            <Text style={{

                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.default,
                                color: colors.white,
                                marginStart: H * 0.10,
                                color: "white", fontSize: fontSizes.default
                            }}>₹ {data?.doctor?.consultant_online}</Text>
                        </View> */}
                        {/* <View
                            style={{}}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: H * 0.05
                            }}>

                                <Image
                                    style={{
                                        marginLeft: W * 0.1,
                                        height: H * 0.024,
                                        width: H * 0.02,
                                        tintColor: 'white'

                                    }}
                                    source={require('../../assets/Images/dateofbirth.png')} />
                                <Text style={{

                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.XL,
                                    color: colors.white,
                                    marginStart: H * 0.03,
                                    color: "white", fontSize: fontSizes.XL
                                }}>Consult In Person</Text>

                            </View>

                            <Text style={{

                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.default,
                                color: colors.white,
                                marginStart: H * 0.10,
                                color: "white", fontSize: fontSizes.default
                            }}>₹ {data?.doctor?.consultant_person}</Text>
                        </View> */}

                    </View>
                </View>

            </ScrollView>
    )
}

const styles = StyleSheet.create({
    appBar:
    {
        backgroundColor: colors.toobarcolor,
        width: W,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    }
})
export default DoCMyProfile