import { View, Text, FlatList, Dimensions, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
//import { Searchbar, Appbar, Divider } from 'react-native-paper';
//import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, timeStampToDateFormatd_m_y2, W } from '../../../assets/Schemes/Schemes';
import HeaderTwo from '../../../assets/Schemes/HeaderTwo';
import Loader from '../../../assets/Loader/Loader';
//import LinearGradient from 'react-native-linear-gradient';


const Profile = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState(null)
    const onChangeSearch = query => setSearchQuery(query);
    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width

    useEffect(() => { getUserProfile() }, [])



    const getUserProfile = async () => {
        // setLoader(true)

        const result = await GetApiData('patient_profile')
        const token = await getLocalStorageData('token')
        //console.log("Token========>====>===>", token)
        //console.log("Patient Profile Api Response===>", result)

        if (result.status == '200') {

            //Alert.alert('Info', `${result.message}`)
            setData(result)
            // setLoader(false)

        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    return (
        loader ?
            <Loader />
            :

            <View style={{ backgroundColor: 'white', height: H }}>

                <View >
                    <HeaderTwo Title="My Profile" />
                    <View>
                        <Image
                            source={require('../../../assets/Images/pbg.png')}
                            style={{
                                height: H,
                                width: W, position: 'absolute',
                            }} />
                    </View>
                    {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{
                                marginStart: H * 0.03,
                                height: H * 0.12,
                                width: H * 0.12,
                                borderRadius: H * 0.1,
                                marginTop: H * 0.04
                            }}
                            source={require('../../../assets/Images/image.png')} />
                    </View> */}
                    <View style={{
                        marginLeft: W * 0.04,
                    }}>
                        <Text style={{
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default,
                            color: colors.white,
                            marginTop: H * 0.04,
                            marginStart: H * 0.03,
                            maxWidth: W * 0.5,
                            justifyContent: 'center',
                            color: "black",
                        }}>{`${data?.patient?.salutation} ${data?.patient?.first_name} ${data?.patient?.last_name == null ? "" : data?.patient?.last_name}`}</Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: H * 0.005
                            }}>
                            <Image
                                style={{
                                    marginLeft: W * 0.05,
                                    height: H * 0.025,
                                    width: H * 0.025,
                                }}
                                source={require('../../../assets/Images/call.png')} />
                            <Text style={{
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.SM,
                                color: colors.white,
                                marginStart: H * 0.015,
                                color: "gray",
                                // fontSize: fontSizes.default
                            }}>{data?.patient?.phone}</Text>

                        </View>

                        <View
                            style={{ flexDirection: 'row', marginTop: H * 0.005, }}>
                            <Image
                                style={{
                                    marginLeft: W * 0.05,
                                    height: H * 0.025,
                                    width: H * 0.025,
                                }}
                                source={require('../../../assets/Images/email.png')} />
                            <Text style={{
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.XL,
                                color: colors.white,
                                marginStart: H * 0.017,
                                color: "gray",
                                fontSize: fontSizes.SM,
                                maxWidth: W * 0.6
                            }}>{data?.patient?.email}</Text>
                        </View>
                    </View>
                    <View
                        style={{}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: H * 0.12 }}>
                            <Image
                                style={{
                                    marginLeft: W * 0.1,
                                    height: H * 0.024,
                                    width: H * 0.024,
                                }}
                                source={require('../../../assets/Images/files.png')} />
                            <Text style={{
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.XL,
                                color: colors.white,
                                marginStart: H * 0.025,
                                color: "white", fontSize: fontSizes.XL
                            }}>UHID</Text>
                        </View>
                        <Text style={{
                            fontFamily: fontFamily.regular,
                            color: colors.white,
                            marginStart: H * 0.097,
                            color: "white", 
                            fontSize: fontSizes.default
                        }}>{data?.patient.his_id}</Text>
                    </View>
                    <View
                        style={{}}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: H * 0.05 }}>

                            <Image
                                style={{
                                    marginLeft: W * 0.1,
                                    height: H * 0.024,
                                    width: H * 0.02,
                                    tintColor: 'white'

                                }}
                                source={require('../../../assets/Images/dateofbirth.png')} />
                            <Text style={{

                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.XL,
                                color: colors.white,
                                marginStart: H * 0.03,
                                color: "white", fontSize: fontSizes.XL
                            }}>Date of Birth</Text>

                        </View>

                        <Text style={{

                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.default,
                            color: colors.white,
                            marginStart: H * 0.10,
                            color: "white", fontSize: fontSizes.default
                        }}>{timeStampToDateFormatd_m_y2(data?.patient.dob)}</Text>
                    </View>
                    <View
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
                                    width: H * 0.024,
                                }}
                                source={require('../../../assets/Images/gender.png')} />
                            <Text style={{

                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.XL,
                                color: colors.white,
                                marginStart: H * 0.03,
                                color: "white", fontSize: fontSizes.XL
                            }}>Gender</Text>

                        </View>

                        <Text style={{

                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.default,
                            color: colors.white,
                            marginStart: H * 0.11,
                            color: "white", fontSize: fontSizes.default
                        }}>{(data?.patient?.gender).replace("GENDER", "")}</Text>
                    </View>

                </View>
            </View>
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
export default Profile