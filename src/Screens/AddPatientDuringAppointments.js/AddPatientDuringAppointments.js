import { ScrollView, StyleSheet, View, TouchableOpacity, StatusBar, Image, Modal, FlatList, Alert, Platform } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Button, Dialog, Divider, Portal, RadioButton, Text, TextInput } from 'react-native-paper'
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, H, PostApiData, savelocalStorageData, timeStampToDateFormatd_m_y, validateName, W } from '../../assets/Schemes/Schemes'
import LinearGradient from 'react-native-linear-gradient'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { validateEmail } from '../../assets/Schemes/Schemes'
import DataContext from '../../assets/Context/DataContext'
import Loader from '../../assets/Loader/Loader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddPatientsDuringAppointments = ({ navigation, route }) => {

    const { Ncity, Nstate, Ncountry, NmobileNo, NpatientName } = useContext(DataContext)

    useEffect(() => {
        toastHospitalID()
    }, [])

    const [patientName, setPatientName] = NpatientName
    const [city, setCity] = Ncity
    const [gender, setGender] = useState("")
    const [userType, setUserType] = useState("self")
    const [salutation, setSalutation] = useState("")
    const [dob, setDob] = useState("")
    const [editValue, setEditValue] = useState()
    const [pincode, setPincode] = useState()
    const [modalvisible, setModalVisible] = useState(false)
    const [statemodalvisible, setStateModalVisible] = useState(false)
    const [citymodalvisible, setCityModalVisible] = useState(false)
    const [countryCode, setCountryCode] = useState("")
    const [email, setEmail] = useState("")
    const [fatherHusbandName, setFatherHusbandName] = useState("")
    const [flatNo, setFlatNo] = useState("")
    const [village, setVillage] = useState("")
    const [cityID, setCityID] = useState("")
    const [state, setState] = Nstate
    const [stateID, setStateID] = useState("")
    const [country, setCountry] = Ncountry
    const [countryID, setCountryID] = useState("")
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [timeStamp, setTimeStamp] = useState(Date.now())
    const [loader, setLoader] = useState(false)
    const [open, setOpen] = useState(false);
    const [items2, setItems2] = useState([]);
    const [open2, setOpen2] = useState(false)
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [thirdName, setThirdName] = useState("")
    /////////////////////////////////////////////////////////
    const [salutationMandate, setSalutationMandate] = useState(false)
    const [firstNameMandate, setFirstNameMandate] = useState(false)
    const [dobMandate, setDobMandate] = useState(false)
    const [genderMandate, setGenderMandate] = useState(false)
    const [flatNoMandate, setFlatNoMandate] = useState(false)
    const [cityMandate, setCityMandate] = useState(false)
    const [countryMandate, setCountryMandate] = useState(false)
    const [stateMandate, setStateMandate] = useState(false)
    const [emailMandate, setEmailMandate] = useState(false)
    const [phoneMandate, setPhoneMandate] = useState(false)
    const [salutationData, setSalutationData] = useState(null)
    /////////////////////////////////////////////////////////
    const [mobileNo, setMobileNo] = NmobileNo

    const hideDialog = () => setVisible2(false);
    const hideDialog2 = () => setVisible3(false);



    const renderSalutation = ({ item }) => {
        return (
            <View>

                <TouchableOpacity
                    onPress={() => {
                        setVisible3(false)
                        setSalutation(item?.SalutationName)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "silver",
                        borderWidth: 0.3
                        //backgroundColor: "red"
                    }}>
                    <RadioButton
                        value="Mr."
                        status={salutation === item?.SalutationName ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setVisible3(false)
                            setSalutation(item?.SalutationName)
                        }}
                    />
                    <Text onPress={() => {
                        setVisible3(false)
                        setSalutation(item?.SalutationName)
                    }}>
                        {item?.SalutationName}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const toastHospitalID = async () => {
        const temp = await getLocalStorageData('mobile')
        //console.log("Mobile== ", temp)
        const result = await GetApiData('salutations')
        setSalutationData(result?.salutations)
    }


    const openModalForSelectingGender = () => {
        setVisible2(true)
    }


    const getCountries = async (id) => {
        var formdata = new FormData();
        formdata.append("code", id);
        const result = await PostApiData('countries', formdata)
        //console.log("result==", result)
        if (result.status == '200') {
            //console.log(result)
            setData(result?.countries)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
    }


    const getStates = async (lat, lng) => {

        var formdata = new FormData();

        formdata.append("lat", "28.4089");
        formdata.append("lang", "77.3178");

        const result = await PostApiData('states', formdata)
        //console.log("states==", result)

        if (result.status == '200') {
            //console.log(result)

            setData(result)

        } else {
            Alert.alert('Error', `${result.message}`)
        }

    }


    const getCities = async (id) => {
        // setLoader(true)
        var formdata = new FormData();

        formdata.append("country_id", id);

        const result = await GetApiData('cities')

        //console.log("cities==", result)

        if (result.status == '200') {
            //console.log(result)

            setData(result)

        } else {
            Alert.alert('Error', `${result.message}`)
        }
        // setLoader(false)
    }

    const openSalutationModal = () => {
        setVisible3(true)
    }

    const setValuetoText = (name, countryID) => {
        setModalVisible(false)
        setCountry(name)
        setCountryID(countryID)
        //console.log("coun== " + name)
        setCountry(name)
    }


    const setStateValuetoText = (statename, stateID) => {
        setStateModalVisible(false)
        setState(statename)
        setStateID(stateID)
        getCountries(stateID)
    }


    const setCityValuetoText = (cityname, cityID) => {
        setCityModalVisible(false)
        setCity(cityname)
        setCityID(cityID)
        getStates(cityID)
    }

    const handleChange = async () => {

        setLoader(true)
        if (salutation == "") {
            //Alert.alert("Error", "All red marked fields are mandatory for registration")
            setSalutationMandate(true)
        }
        else {
            setSalutationMandate(false)
        }

        if (firstName == "") {
            // Alert.alert("Error", "All red marked fields are mandatory for registration")

            setFirstNameMandate(true)

        }
        else {
            setFirstNameMandate(false)
        }
        if (dob == "") {
            // Alert.alert("Error", "All red marked fields are mandatory for registration")
            setDobMandate(true)
        }
        else {
            setDobMandate(false)
        }
        if (city == "") {
            // Alert.alert("Error", "All red marked fields are mandatory for registration")

            setCityMandate(true)

        }
        else {
            setCityMandate(false)
        }
        if (country == "") {
            // Alert.alert("Error", "All red marked fields are mandatory for registration")

            setCountryMandate(true)

        }
        else {
            setCountryMandate(false)
        }
        if (state == "") {
            //  Alert.alert("Error", "All red marked fields are mandatory for registration")

            setStateMandate(true)

        }
        else {
            setStateMandate(false)
        }
        if (!validateEmail(email)) {
            // Alert.alert("Error", "Email is not valid")

            setEmailMandate(true)

        }
        else {
            setEmailMandate(false)
        }
        if (mobileNo == "") {
            //  Alert.alert("Error", "All red marked fields are mandatory for registration")

            setPhoneMandate(true)
        }
        else {
            setPhoneMandate(false)
        }
        if (gender == "") {
            //  Alert.alert("Error", "All red marked fields are mandatory for registration")

            setGenderMandate(true)

        }
        else {
            setGenderMandate(false)
        }
        if (flatNo == "") {
            // Alert.alert("Error", "All red marked fields are mandatory for registration")

            setFlatNoMandate(true)

        }
        else {
            setFlatNoMandate(false)
        }


        if (!((salutation == "") || (firstName == "") || (dob == "") || (city == "") || (country == "") || (state == "") || (!validateEmail(email)) || (mobileNo == "") || (gender == "") || (flatNo == ""))) {
            // var myHeaders = new Headers();
            // const token = await getLocalStorageData('token')
            const hospital_code = await getLocalStorageData('hospital_code')
            // //console.log("Gaurav", token)
            // myHeaders.append("Authorization", `Bearer ${token}`);


            var formdata = new FormData();
            formdata.append("salutation", salutation);
            formdata.append("fname", firstName);
            formdata.append("lname", thirdName);
            formdata.append("gender", gender);
            formdata.append("dob", dob);
            formdata.append("mobile", mobileNo);
            formdata.append("email", email);
            formdata.append("hf_name", fatherHusbandName);
            formdata.append("address_1", flatNo);
            formdata.append("address_2", village);
            formdata.append("country_id", country);
            formdata.append("state_id", state);
            formdata.append("city", city);
            formdata.append("pincode", pincode);
            formdata.append("near_by", "");
            formdata.append("mname", secondName);
            formdata.append("hospital_code", hospital_code)

            //console.log("formdata for add patient", formdata)

            // var requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: formdata,
            //     redirect: 'follow'
            // };

            try {
                const result = await PostApiData("register", formdata)

                //console.log("SignupApiresult", result)

                if (result.status == '200') {

                    setLoader(true)
                    //console.log(result.token)
                    navigation.navigate("AfterSlotBlockingConfirmation", { newAdded: true })
                    Alert.alert('Success!', `Registration Successful!\nUHID:${result?.patient?.his_id}`)
                    setData(result)
                    setCity("")
                    setState("")
                    setPatientName(result?.patient?.full_name)
                    console.log(result)
                } else {
                    Alert.alert('Error', result?.message)
                }
            } catch (error) {
                Alert.alert("Error", JSON.stringify(error))
            }

        }
        if (((salutation == "") || (firstName == "") || (dob == "") || (city == "") || (country == "") || (state == "") || (!validateEmail(email)) || (mobileNo == "") || (gender == "") || (flatNo == ""))) {
            Alert.alert("Error", "All red marked fields are mandatory for registration")
        }

        setLoader(false)
    }

    const renderItemCity = ({ item, index }) => {
        return (

            <View style={{}}>
                <TouchableOpacity
                    onPress={() => { setCityValuetoText(item.AttributeName, JSON.stringify(item.id)) }}
                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>

                    <View
                        style={{
                            flexDirection: 'column',
                            padding: 5
                        }}>

                        <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium }}>
                            {item.AttributeName}
                        </Text>

                        <Text style={{
                            fontSize: fontSizes.SM, color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.AttributeCode}
                        </Text>

                    </View>
                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }
    const renderItemState = ({ item, index }) => {
        return (

            <View style={{}}>
                <TouchableOpacity

                    onPress={() => { setStateValuetoText(item.AttributeName, JSON.stringify(item.id)) }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View
                        style={{
                            flexDirection: 'column',
                            padding: 5
                        }}>

                        <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium }}>
                            {item.AttributeName}
                        </Text>

                        <Text style={{
                            fontSize: fontSizes.SM, color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.AttributeCode}
                        </Text>

                    </View>
                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        return (

            <View style={{}}>


                <TouchableOpacity

                    onPress={() => { setValuetoText(item.AttributeName, JSON.stringify(item.id)) }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View style={{
                        flexDirection: 'column',
                        padding: 5
                    }}>
                        <Text style={{
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium
                        }}>
                            {item.AttributeName}
                        </Text>
                        <Text style={{
                            fontSize: fontSizes.SM, color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.AttributeCode}
                        </Text>
                    </View>

                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }


    return (

        loader
            ?
            <>
                <Loader />
            </>
            :

            <>
                <HeaderTwo Title="Add Patient" />


                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        backgroundColor: '#f4f7ff',
                        paddingBottom: H * 0.2
                    }}>

                    <Modal
                        visible={statemodalvisible}
                        transparent={true}>
                        <View style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            height: H * 0.7,
                            marginTop: H * 0.17,
                            width: W,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: 'center'
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
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.default
                                }}>Choose your State</Text>


                                <Divider
                                    style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />

                                <FlatList
                                    data={data?.states}
                                    renderItem={renderItemState}
                                    keyExtractor={(item, index) => `${index}`}
                                />

                                <TouchableOpacity onPress={() => {
                                    setStateModalVisible(false)
                                }}>
                                    <Text style={{
                                        marginTop: H * 0.05,
                                        marginRight: W * 0.05,
                                        alignSelf: "flex-end",
                                        fontFamily: fontFamily.medium,
                                        textDecorationLine: 'underline',
                                        color: colors.toobarcolor
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        visible={citymodalvisible}
                        transparent={true}>
                        <View style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            height: H * 0.7,
                            marginTop: H * 0.17,
                            width: W,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: 'center'
                        }}>


                            <View style={{
                                paddingVertical: H * 0.02,
                                //height: H * 0.4,
                                width: W * 0.9,
                                backgroundColor: "white",
                                borderRadius: 8,
                            }}>

                                <Text style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.default
                                }}>Choose your city</Text>


                                <Divider
                                    style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />

                                <FlatList
                                    data={data?.cities}
                                    renderItem={renderItemCity}
                                    keyExtractor={(item, index) => `${index}`}
                                />

                                <TouchableOpacity onPress={() => {
                                    getCities()
                                    setCityModalVisible(false)
                                }}>
                                    <Text style={{
                                        marginTop: H * 0.05,
                                        marginRight: W * 0.05,
                                        alignSelf: "flex-end",
                                        fontFamily: fontFamily.medium,
                                        textDecorationLine: 'underline',
                                        color: colors.toobarcolor

                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Portal>
                        <Dialog
                            style={{
                                backgroundColor: "white",
                            }}
                            visible={visible2} onDismiss={hideDialog}>
                            <Dialog.Title>Select Your Gender:</Dialog.Title>
                            <Dialog.Content>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible2(false)
                                        setGender('Male')
                                    }}
                                    style={{
                                        borderColor: "silver",
                                        borderWidth: 0.3,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <RadioButton
                                        value="male"
                                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setVisible2(false)
                                            setGender('Male')
                                        }}
                                    />
                                    <Text onPress={() => {
                                        setVisible2(false)
                                        setGender('Male')
                                    }}>
                                        Male
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible2(false)
                                        setGender('Female')
                                    }}
                                    style={{
                                        borderColor: "silver",
                                        borderWidth: 0.3,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <RadioButton
                                        value="female"
                                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setVisible2(false)
                                            setGender('Female')
                                        }}
                                        label="Female"
                                    />
                                    <Text onPress={() => {
                                        setVisible2(false)
                                        setGender('Female')
                                    }}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible2(false)
                                        setGender('Others')
                                    }}
                                    style={{
                                        borderColor: "silver",
                                        borderWidth: 0.3,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <RadioButton
                                        value="others"
                                        status={gender === 'Others' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setVisible2(false)
                                            setGender('Others')
                                        }}
                                    />
                                    <Text onPress={() => {
                                        setVisible2(false)
                                        setGender('Others')
                                    }}>Others</Text>
                                </TouchableOpacity>
                            </Dialog.Content>

                        </Dialog>
                        <Dialog
                            style={{
                                backgroundColor: "white",
                                height: H * 0.65,
                            }}
                            visible={visible3} onDismiss={hideDialog2}>
                            <Dialog.Title>Salutation:</Dialog.Title>
                            <Dialog.Content style={{
                                height: H * 0.55,
                            }}>
                                <FlatList
                                    renderItem={renderSalutation}
                                    data={salutationData}
                                    keyExtractor={(item, index) => `_key${index}`}
                                />
                            </Dialog.Content>

                        </Dialog>
                    </Portal>

                    <StatusBar backgroundColor={colors.toobarcolor} />

                    <View style={{ width: W * 0.9, alignSelf: 'center' }}>
                        <Text style={{
                            width: W * 0.9,
                            color: "black",
                            fontSize: fontSizes.XL,
                            fontFamily: fontFamily.medium,
                            alignSelf: 'flex-start',
                            marginVertical: H * 0.02,
                            fontFamily: fontFamily.semibold,
                            textDecorationLine: "underline"
                        }}>Fill Your Personal Information</Text>

                    </View>



                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            borderRadius: 5,
                            height: 64,
                            borderColor: salutationMandate ? "red" : "gray",
                            borderWidth: 1,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            flexDirection: "row"
                        }}
                        onPress={() => openSalutationModal()}>
                        <MaterialCommunityIcons name="account-outline" size={25} color="gray" style={{
                            marginHorizontal: W * 0.05
                        }} />
                        <Text>{salutation == "" ? "Salutation*" : salutation}</Text>

                    </TouchableOpacity>
                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={firstNameMandate ? "red" : "gray"}
                        value={firstName}
                        onChangeText={(t) => {
                            if (t.length == 0) {
                                setFirstName(t)
                            }
                            else if (validateName(t)) {
                                setFirstName(t)
                            }
                        }}

                        style={{
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            fontSize: fontSizes.XL
                        }}
                        left={<TextInput.Icon icon={"account"} />}
                        placeholder='First Name*' />
                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        value={secondName}
                        onChangeText={(t) => {
                            if (t.length == 0) {
                                setSecondName(t)
                            }
                            else if (validateName(t)) {
                                setSecondName(t)
                            }

                        }}

                        style={{
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            fontSize: fontSizes.XL
                        }}
                        left={<TextInput.Icon icon={"account"} />}
                        placeholder='Middle Name' />
                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        value={thirdName}
                        onChangeText={(t) => {
                            if (t.length == 0) {
                                setThirdName(t)
                            }
                            else if (validateName(t)) {
                                setThirdName(t)
                            }

                        }}

                        style={{
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            fontSize: fontSizes.XL
                        }}
                        left={<TextInput.Icon icon={"account"} />}
                        placeholder='Last Name' />
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            borderRadius: 5,
                            height: H * 0.075,
                            borderColor: genderMandate ? "red" : "gray",
                            borderWidth: 1,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            flexDirection: "row"
                        }}
                        onPress={() => openModalForSelectingGender()}>
                        <MaterialCommunityIcons name="gender-male" size={25} color="gray" style={{
                            marginHorizontal: W * 0.05
                        }} />
                        <Text>{gender == "" ? "Gender*" : gender}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setVisible(true)}

                        style={{
                            borderRadius: 5,
                            alignSelf: "center",
                            borderColor: dobMandate ? "red" : "gray",
                            borderWidth: 1,
                            height: H * 0.066,
                            flexDirection: "row",
                            alignItems: "center",
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                        }}>
                        <MaterialCommunityIcons name="cake-variant" size={25} color={"gray"} style={{
                            marginLeft: W * 0.038
                        }} />
                        {

                            Platform.OS == "ios" ?
                                <>
                                    <RNDateTimePicker
                                        style={{

                                        }}
                                        onChange={(info) => {
                                            //console.log(info.nativeEvent.timestamp)
                                            setVisible(false)
                                            setDob(timeStampToDateFormatd_m_y(info.nativeEvent.timestamp))
                                            setTimeStamp(Number.parseInt(info.nativeEvent.timestamp, 10))
                                        }}
                                        maximumDate={new Date()}
                                        value={new Date(timeStamp)}
                                    />

                                </>
                                :
                                <>
                                    {
                                        visible
                                            ?
                                            <RNDateTimePicker
                                                style={{

                                                }}
                                                onChange={(info) => {
                                                    //console.log(info.nativeEvent.timestamp)
                                                    setVisible(false)
                                                    setDob(timeStampToDateFormatd_m_y(info.nativeEvent.timestamp))
                                                    setTimeStamp(Number.parseInt(info.nativeEvent.timestamp, 10))
                                                }}
                                                maximumDate={Date.now()}
                                                value={new Date(timeStamp)}
                                            />
                                            :
                                            <Text style={{
                                                marginLeft: W * 0.04,
                                                alignSelf: "center"
                                            }}>
                                                {dob == "" ? "Date Of Birth*" : dob}
                                            </Text>
                                    }
                                </>



                        }

                    </TouchableOpacity>


                    <TextInput
                        editable={false}
                        mode={"outlined"}
                        keyboardType='numeric'
                        maxLength={10}
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        value={mobileNo}


                        onChangeText={(t) => { setMobileNo(t) }}

                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            fontSize: fontSizes.XL, fontFamily: fontFamily.regular
                        }}

                        left={<TextInput.Icon icon={"phone"} />}
                        placeholder='Mobile No.' />


                    <TextInput
                        mode={"outlined"}
                        keyboardType='email-address'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={emailMandate ? "red" : "gray"}
                        value={email}
                        onBlur={
                            (t) => {
                                if (!validateEmail(email)) {
                                    setEmailMandate(true)
                                    Alert.alert("Invalid Email!", "Please enter a valid email")
                                }
                                else {
                                    setEmailMandate(false)
                                }
                            }
                        }
                        onChangeText={(t) => { setEmail(t) }}
                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            fontSize: fontSizes.XL
                        }}
                        left={<TextInput.Icon icon={"email"} />}
                        placeholder='Email Id*'
                    />


                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        //maxLength={10}
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        // placeholderTextColor='gray'
                        value={fatherHusbandName}
                        onChangeText={(t) => {
                            if (t.length == 0) {
                                setFatherHusbandName(t)
                            }
                            else if (validateName(t)) {
                                setFatherHusbandName(t)
                            }
                        }}

                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext, fontSize: fontSizes.XL
                        }}

                        left={<TextInput.Icon icon={"account-supervisor-outline"} />}
                        placeholder='Father Name/Husband Name'

                    />


                    <Text style={{
                        color: "black",
                        fontSize: fontSizes.XL,
                        fontFamily: fontFamily.medium,
                        alignSelf: 'flex-start',
                        marginVertical: H * 0.02,
                        fontFamily: fontFamily.semibold,
                        textDecorationLine: "underline",
                        marginLeft: W * 0.05
                    }}>Address Information</Text>

                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={flatNoMandate ? "red" : "gray"}
                        value={flatNo}
                        onChangeText={(t) => { setFlatNo(t) }}
                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            backgroundColor: colors.bgeditext, fontSize: fontSizes.XL
                        }}

                        left={<TextInput.Icon icon={"home-outline"} />}
                        placeholder='Flat No./House No.*'

                    />

                    <TextInput
                        mode={"outlined"}
                        keyboardType='default'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        value={village}
                        onChangeText={(t) => { setVillage(t) }}

                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext, fontSize: fontSizes.XL
                        }}

                        left={<TextInput.Icon icon={"map-marker"} />}
                        placeholder='Village/Sector'

                    />
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            borderRadius: 5,
                            height: H * 0.075,
                            borderColor: cityMandate ? "red" : "gray",
                            borderWidth: 1,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            flexDirection: "row"
                        }}
                        onPress={() => navigation.navigate("SearchCity")}>
                        <MaterialCommunityIcons name="city" size={25} color="gray" style={{
                            marginHorizontal: W * 0.05
                        }} />
                        <Text>{city == "" ? "City*" : city}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            borderRadius: 5,
                            height: H * 0.075,
                            borderColor: stateMandate ? "red" : "gray",
                            borderWidth: 1,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            flexDirection: "row"
                        }}
                        onPress={() => navigation.navigate("SearchState")}>
                        <MaterialCommunityIcons name="map-search" size={25} color="gray" style={{
                            marginHorizontal: W * 0.05
                        }} />
                        <Text>{state == "" ? "State*" : state}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            borderRadius: 5,
                            height: H * 0.075,
                            borderColor: countryMandate ? "red" : "gray",
                            borderWidth: 1,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext,
                            flexDirection: "row"
                        }}
                        onPress={() => navigation.navigate("SearchCountry")}>
                        <MaterialCommunityIcons name="island" size={25} color="gray" style={{
                            marginHorizontal: W * 0.05
                        }} />
                        <Text>{country}</Text>
                    </TouchableOpacity>
                    <TextInput
                        maxLength={6}
                        mode={"outlined"}
                        keyboardType='numeric'
                        underlineColor='transparent'
                        activeUnderlineColor={colors.blue}
                        activeOutlineColor={colors.blue}
                        outlineColor={"gray"}
                        value={pincode}
                        onChangeText={(t) => {
                            if (t.includes('.') || t.includes("-") || t.includes(" ") || t.includes(",")) {
                                //console.log("Invalid Phone Number")
                            }
                            else {
                                setPincode(t)
                            }
                        }}

                        style={{
                            height: H * 0,
                            width: W * 0.9,
                            marginTop: H * 0.015,
                            backgroundColor: colors.bgeditext, fontSize: fontSizes.XL
                        }}

                        left={<TextInput.Icon icon={"pin"} />}
                        placeholder='Pin Code'

                    />




                    <TouchableOpacity
                        onPress={() => { handleChange() }}
                        style={{
                            marginHorizontal: W * 0.08,
                            marginVertical: H * 0.05,
                            width: W * 0.7,
                            borderRadius: 8,
                        }}>
                        <LinearGradient start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#90E1FF', '#00AEEF', '#00AEEF']}
                            style={{
                                height: H * 0.07,
                                justifyContent: 'center',
                                borderRadius: 8
                            }}>

                            <Text style={{
                                textAlign: 'center', color: colors.white, textAlign: 'center',
                                fontFamily: fontFamily.medium, fontSize: fontSizes.XL,
                            }}>Add Patient</Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </KeyboardAwareScrollView>
            </>


    )
}
const styles = StyleSheet.create({})

export default AddPatientsDuringAppointments