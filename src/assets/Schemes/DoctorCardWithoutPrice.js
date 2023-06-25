import { View, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import React, { useContext } from 'react'
import { colors, fontFamily, fontSizes, H, W } from './Schemes'
import { useNavigation } from '@react-navigation/native'
import DataContext from '../Context/DataContext'
import { Text } from 'react-native-paper'


const DoctorCardWithoutPrice = (props) => {
    const navigation = useNavigation()
    const { NmyAppointmentType } = useContext(DataContext)
    const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
    const handleNavigation2 = (doctor_id, appointType) => {
        navigation.navigate('DoctorProfile', { "doctorID": `${doctor_id}`, "appointType": appointType })
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
        return t?.substring(t.indexOf('/') + 1)
    }


    return (
        <View style={{
            borderColor: colors.toobarcolor,
            borderWidth: 1,
            marginTop: H * 0.01,
            width: W * 0.95,
            alignSelf: "center",
            borderRadius: 10,
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
                    {breakString(props?.first_name?.replace('\\','/'))}
                    {props?.first_name?.replace('\\','/')?.includes("/") ? <Text style={{
                        color: "gray"
                    }}>{breakStringSecond(props?.first_name?.replace('\\','/'))}</Text> : null}
                </Text>
                <Text style={{
                    marginLeft: W * 0.04,
                    fontSize: fontSizes.SM,
                    color: 'gray',
                    width: W * 0.5
                }}>{props.category}</Text>
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
    )
}

export default DoctorCardWithoutPrice