import { View, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, fontFamily, fontSizes, H, W } from './Schemes'
import { useNavigation } from '@react-navigation/native'
import DataContext from '../Context/DataContext'
import { Divider, Text } from 'react-native-paper'


const DoctorCard = (props) => {
    const navigation = useNavigation()
    const { NmyAppointmentType, NmyDoctorID } = useContext(DataContext)
    const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
    const [myDoctorID, setMyDoctorID] = NmyDoctorID
    const handleNavigation2 = (doctor_id, appointType) => {
        setMyDoctorID(JSON.stringify(doctor_id))
        navigation.navigate('DoctorProfile')
    }

    const breakString = (t) => {
        if (t?.includes('/')) {
            const slug = t?.split('/')
            return `${slug[0]}/`
        }
        else {
            return t
        }

    }

    const breakStringSecond = (t) => {
        return t?.substring(t?.indexOf('/') + 1)
    }

    console.log("Image Url=============>>>>", `${props.profile_url}${props.image}`)

    return (
        <View>
            <View style={{
                borderColor: colors.toobarcolor,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderRightWidth: 1,
                marginTop: H * 0.01,
                width: W * 0.95,
                alignSelf: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: 'center',
                backgroundColor: colors.doctorCardBlueColor,
                flexDirection: "row",
                alignSelf: "center",
                paddingVertical: H * 0.01,
                paddingHorizontal: W * 0.01
            }}>

                <View style={{
                    backgroundColor: "#e8c4a7",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                }}>
                    {
                        ((props.profile_url == null) || (props.image == null))
                            ?
                            <Image source={require('../../assets/Images/profile.png')}
                                style={{
                                    height: H * 0.18,
                                    width: H * 0.18,
                                    borderRadius: 3,
                                    backgroundColor: colors.placeholderColor
                                }} />

                            :
                            <Image source={{ uri: `${props.profile_url}${props.image}` }}
                                style={{
                                    height: H * 0.18,
                                    width: H * 0.18,
                                    borderRadius: 3,
                                    resizeMode: Platform.OS == "ios" ? "cover" : "contain",
                                    backgroundColor: colors.placeholderColor
                                }} />
                    }
                </View>

                <View>

                    <Text
                        style={{
                            fontWeight: "500",
                            marginLeft: W * 0.04,
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium,
                            color: colors.black,
                            width: W * 0.5
                        }}>
                        {breakString(props?.first_name?.replace('\\', '/'))}
                        {props?.first_name?.replace('\\', '/')?.includes("/") ? <Text style={{
                            color: "gray"
                        }}>{breakStringSecond(props?.first_name?.replace('\\', '/'))}</Text> : null}
                    </Text>
                    <Text style={{
                        marginLeft: W * 0.04,
                        fontSize: fontSizes.SM,
                        color: 'gray',
                        width: W * 0.5
                    }}>

                        {props.category}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        Alert.alert("Doctor's Designation", `${props?.designation?.replace("&amp;", "&")}`)
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                marginLeft: W * 0.04,
                                fontSize: fontSizes.SM,
                                color: colors.darkgray,
                                width: W * 0.5
                            }}>

                            {`${props?.designation?.replace("&amp;", "&")}`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Alert.alert("Doctor's Education", `${props.education}`)
                    }
                    }>
                        <Text
                            numberOfLines={1}
                            style={{
                                marginLeft: W * 0.04,
                                fontSize: fontSizes.SM,
                                color: colors.darkgray,
                                width: W * 0.5
                            }}>

                            {`${props.education}`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flex: 2,
                borderColor: colors.toobarcolor,
                borderWidth: 1,
                backgroundColor: colors.doctorCardBlueColor,
                height: H * 0.12,
                width: "95%",
                alignSelf: "center",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
            }}>


                {!((props.consultant_online == null) || (props.consultant_online == "")) &&
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            height: H * 0.12,
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => {
                            handleNavigation2(props.id, "1")
                            setMyAppointmentType("1")
                        }}
                    >
                        <View
                            style={{
                                height: H * 0.08,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                                paddingVertical: H * 0.01,
                                width: "95%",
                                alignSelf: "flex-end"
                            }}
                        >
                            <Text style={{
                                fontWeight: "600",
                                fontSize: fontSizes.EXTRASM,
                                width: W * 0.45,
                                textAlign: "center",
                                color: "blue",
                                fontFamily: fontFamily.semibold
                            }}>
                                {"CONSULT ONLINE"}
                            </Text>



                            <Text style={{
                                fontWeight: "600",
                                color: "blue",
                                fontFamily: fontFamily.semibold
                            }}>
                                ₹
                                {props.consultant_online}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                {!((props.consultant_online == null) || (props.consultant_online == "")) &&
                    <Divider
                        style={{
                            backgroundColor: colors.darkgray,
                            width: 1,
                            height: H * 0.08,
                            alignSelf: "center",
                            zIndex: 10,
                        }} />}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: H * 0.12,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => {
                        handleNavigation2(props.id, "0")
                        setMyAppointmentType("0")
                    }}
                >
                    <View
                        style={{
                            height: H * 0.08,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: !((props.consultant_online == null) || (props.consultant_online == "")) ? 0 : 8,
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            paddingVertical: H * 0.01,
                            width: "95%",
                            alignSelf: ((props.consultant_online == null) || (props.consultant_online == "")) ? "center" : "flex-start"
                        }}>
                        <Text style={{
                            fontWeight: "600",
                            fontSize: fontSizes.EXTRASM,
                            width: W * 0.45,
                            textAlign: "center",
                            color: "orange",
                            fontFamily: fontFamily.semibold,
                        }}>
                            {"CONSULT IN PERSON"}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "600",
                                color: "orange",
                                fontFamily: fontFamily.semibold
                            }}>
                            ₹
                            {props.consultant_person}
                        </Text>
                    </View>
                </TouchableOpacity>



            </View>
        </View>

    )
}

export default DoctorCard