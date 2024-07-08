import {
    StyleSheet, ScrollView, View, FlatList, Modal, Dimensions, Image, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform
} from 'react-native'

import React, { useEffect, useState, useContext } from 'react'
import { Searchbar, Divider, TextInput, Text } from 'react-native-paper';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, PostApiData, savelocalStorageData, } from '../../../assets/Schemes/Schemes';
import HeaderTwo from '../../../assets/Schemes/HeaderTwo';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../assets/Loader/Loader';
import DataContext from '../../../assets/Context/DataContext';
import DoctorCard from '../../../assets/Schemes/DoctorCard';



const Appointments = ({ navigation }) => {

    const isFocused = useIsFocused()
    const [searchvalue, setSearchValue] = useState("")
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [modalvisible, setModalVisible] = useState(false)
    const [hospitalname, setHospitalName] = useState("Choose hospitals")
    const [filteredDoctorName, setFilteredDoctorName] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])
    const [hospitals, setHospitals] = useState()
    const [hospitalId, setHospitalId] = useState()

    const onChangeSearch = query => setSearchQuery(query);

    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width

    const { NmyAppointmentType, NmyDoctorID } = useContext(DataContext)
    const [myDoctorID, setMyDoctorID] = NmyDoctorID
    useEffect(() => {
            toastHospitalID()
    }, [])


    const toastHospitalID = async () => {
        const name = await getLocalStorageData('hospital_name')
        const temp = await getLocalStorageData('hospital_id')
        getCategoryData("", JSON.parse(temp))
        setHospitalName(name)
        //console.log("name==", name)
        setSearchValue("")
    }


    const handlenavigation = (status, catID, catName) => {
        if (status == "1") {
            //toastHospitalID()
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
        console.log("CategoryData==", result)

        if (result.status == '200') {
            setFilteredCategory(result?.categories)
            setFilteredDoctorName([])
            setData(result)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    const getHospitalData = async (id) => {
        setLoader(true)
        const result = await GetApiData('hospitals')
        //console.log("result==", result)
        if (result.status == '200') {
            setModalVisible(true)
            setHospitals(result)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    const handleNavigation = (doctor_id) => {
        //console.log("doctor id on appointment screen", doctor_id)
        setMyDoctorID(JSON.stringify(doctor_id))
        toastHospitalID()
        navigation.navigate('DoctorProfile')
    }
    const renderItem2 = (item, index) => {
        return (
            <TouchableOpacity
                key={index}
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
        console.log("item==A", item)

        if (item?.status == 1) {
            return (
                <View
                    key={index}
                    style={{
                        width: W / 3,
                        alignItems: "center"
                    }}>
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
    }

    const renderItemHospitals = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        getCategoryData("", JSON.stringify(item?.id))
                        setHospitalName(item?.name)
                        setModalVisible(false)
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
    const filterSearch = (text) => {
        if (text !== "") {
            const newData = data?.doctors.filter(
                function (item) {
                    const itemData = item.tags
                        ? item.tags.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            const newData2 = data?.categories.filter(
                function (item) {
                    const itemData = item.tags
                        ? item.tags.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            const newData3 = data?.doctors.filter(
                function (item) {
                    const itemData = item.tags
                        ? item.tags.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            { newData.length == 0 ? setFilteredDoctorName(newData3) : setFilteredDoctorName(newData) }
            setFilteredCategory(newData2)
                ;
            setSearchValue(text);
        } else {
            setSearchValue(text);
            setFilteredCategory(data?.categories)
            setFilteredDoctorName([])
        }
    }
    return (


        loader
            ?
            <>
                <Loader />
            </>
            :
            <View style={{
                flex: 5
            }}>

                <HeaderTwo Title="Appointments" />
                <KeyboardAvoidingView
                    style={{

                    }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


                    <Modal
                        visible={modalvisible}
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


                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"black"}
                        placeholderTextColor={"gray"}
                        placeholder='Search here...'
                        value={searchvalue}
                        onChangeText={(t) => {
                            filterSearch(t)
                        }}

                        style={{
                            height: H * 0,
                            width: W * 0.95,
                            alignSelf: "center",
                            borderRadius: 8,
                            fontSize: fontSizes.default,
                            backgroundColor: colors.bgeditext,
                            justifyContent: "center",
                        }}

                        right={<TextInput.Icon icon="magnify" />}

                    />
                    <TouchableOpacity onPress={() => {
                        getHospitalData()
                    }}>
                        <View style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: 'black',
                            justifyContent: "center",
                            alignItems: "center",
                            marginVertical: H * 0.02,
                            width: W * 0.95,
                            alignSelf: "center",
                            paddingVertical: H * 0.02
                        }}>
                            <Text
                                style={{
                                    color: "black",
                                    fontSize: fontSizes.L,
                                    fontFamily: fontFamily.regular,
                                }}>
                                {hospitalname}
                            </Text>

                        </View>

                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={{
                            justifyContent: "center",
                            width: W,

                        }}
                        style={{
                            width: W,

                        }}
                    >
                        {
                            filteredCategory.length == 0
                                ?
                                null
                                :
                                <View style={{
                                    alignSelf: "center",
                                    // justifyContent: "center",
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
                            <Text style={styles.errorMessage}>{data?.message}</Text>
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

                </KeyboardAvoidingView>
            </View >
    )
}

const styles = StyleSheet.create({
    errorMessage:
    {
        alignSelf: 'center',
        marginTop: '50%'
    }
})

export default Appointments