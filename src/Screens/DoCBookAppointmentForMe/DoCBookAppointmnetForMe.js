import { Alert, FlatList, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Text } from 'react-native-paper'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { colors, fontFamily, fontSizes, GetApiData, H, PostApiData, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import DoctorCard from '../../assets/Schemes/DoctorCard'


const DoCBookAppointmnetForMe = ({navigation}) => {

    useEffect(() => {
        getHospitalData()
    }, [])

    const [loader, setLoader] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [hospitals, setHospitals] = useState()
    const [hospitalName, setHospitalName] = useState("")
    const [filteredCategory, setFilteredCategory] = useState([])
    const [filteredDoctorName, setFilteredDoctorName] = useState([])
    const [data, setData] = useState(null)

    const handlenavigation = (status, catID, catName) => {
        if (status == "1") {
            navigation.navigate("Doctor", { "catID": `${catID}`, "catName": `${catName}` })
        } else {
            Alert.alert("Info", "This category is not available in this hospital")
        }
    }

    const getCategoryData = async (t, hospitalId) => {
        setLoader(true)
        var formdata = new FormData();
        formdata.append("search", t);
        formdata.append("hospital_id", hospitalId);
        const result = await PostApiData('doctor_search', formdata)
        // console.log("result==", formdata)
        if (result.status == '200') {
            setFilteredCategory(result?.categories)
            setFilteredDoctorName([])
            setData(result)
        } else {
            Alert.alert('Api Error', `${result.message}`)
        }
        setLoader(false)
    }


    const renderItemHospitals = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        setModalVisible(false)
                        getCategoryData("", JSON.stringify(item?.id))
                        setHospitalName(item?.name)
                        savelocalStorageData('hospital_name', item?.name)
                        savelocalStorageData('hospital_id', JSON.stringify(item?.id))
                        savelocalStorageData('hospital_code', item?.organizationcode)
                        savelocalStorageData('logoHospital', item?.logo)
                        savelocalStorageData('nameHospital', item?.name)
                        savelocalStorageData('addressHospital', item?.address1)
                    }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View style={{ flexDirection: 'column', padding: 5, paddingVertical: 10 }}>
                        <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium, color: 'black' }}>
                            {item.name}
                        </Text>

                    </View>
                </TouchableOpacity>
                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }

    const renderItem2 = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => { handleNavigation(item.id) }}
            >
                <DoctorCard
                    id={item?.id}
                    profile_url={item.profile_url}
                    image={item?.image}
                    first_name={item?.first_name}
                    category={item?.category}
                    designation={item?.designation}
                    education={item?.education}
                    consultant_online={item?.consultant_online}
                    consultant_person={item?.consultant_person}
                />

            </TouchableOpacity>
        )
    }

    const renderItem = (item, index) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => { handlenavigation(item.status, item.id, item.name) }}
                    style={{
                        height: W * 0.23,
                        width: Platform.OS == "ios" ? W * 0.22 : W * 0.23,
                        opacity: item.status == 1 ? 1 : 0.4,
                        backgroundColor: item.status == 1 ? item.background_colour : "grey",
                        marginVertical: H * 0.02,
                        marginHorizontal: H * 0.025,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 1,
                        zIndex: 100,
                    }}>

                    {<Image source={{ uri: `${item.icon_url}${item.icon}` }}
                        style={{
                            height: H * 0.075,
                            width: H * 0.075,
                            tintColor: "white",
                            resizeMode: "contain"
                        }}
                    />}

                </TouchableOpacity>
                <Text
                    minimumFontScale={0.8}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                        textAlign: "center",
                        alignSelf: 'center',
                        color: 'black',
                        maxWidth: W * 0.3,
                        opacity: item.status == 1 ? 1 : 0.4,
                    }}>{item.name}</Text>


                <Text style={{
                    marginBottom: H * 0.02,
                    fontSize: fontSizes.SM,
                    alignSelf: 'center',
                    color: 'gray',
                    fontFamily: fontFamily.medium,
                    opacity: item.status == '1' ? 1 : 0.4,
                }}>{item.doctors_count} Doctors</Text>
            </View>
        )
    }

    const getHospitalData = async (id) => {
        setLoader(true)
        const result = await GetApiData('hospitals')
        // console.log("result==", result)
        if (result.status == '200') {
            setModalVisible(true)
            setHospitals(result)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    return (
        <View>
            <Modal
                visible={modalVisible}
                transparent={true}>
                <View style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
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
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default
                        }}>Choose Hospital</Text>


                        <Divider
                            style={{
                                width: W,
                                borderColor: 'black',
                                borderWidth: 0.02
                            }} />
                        <FlatList
                            data={hospitals?.hospitals}
                            renderItem={renderItemHospitals}
                            keyExtractor={(item, index) => `${index}`}
                        />



                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                        }}>
                            <Text style={{
                                marginTop: H * 0.05,
                                textDecorationLine: 'underline',
                                marginRight: W * 0.05,
                                color: colors.toobarcolor,
                                fontSize: fontSizes.SM,
                                alignSelf: "flex-end"
                            }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <HeaderTwo Title="New Appointment" />
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: 'black',
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: H * 0.02,
                    width: W * 0.95,
                    alignSelf: "center",
                    paddingVertical: H * 0.02
                }}
                onPress={() => {
                    getHospitalData()
                }}>

                <Text
                    style={{
                        color: "black",
                        fontSize: fontSizes.L,
                        fontFamily: fontFamily.regular,
                    }}>
                    {hospitalName}
                </Text>


            </TouchableOpacity>
            <ScrollView
                contentContainerStyle={{

                }}
            >
                {
                    filteredCategory.length == 0
                        ?
                        null
                        :
                        <View style={{
                            flexDirection: "row",
                            width: W,
                            flexWrap: "wrap",
                            paddingBottom: H * 0
                        }}>
                            {filteredCategory.map(renderItem)}
                        </View>
                }
                {filteredDoctorName.length == 0
                    ?
                    null
                    :
                    <Text style={{
                        textAlign: "center",
                        textDecorationLine: "underline"
                    }}>Doctors</Text>
                }
                <View style={{
                    paddingBottom: H * 0.3
                }}>
                    {filteredDoctorName.map(renderItem2)}
                </View>
            </ScrollView>


        </View>
    )
}

export default DoCBookAppointmnetForMe