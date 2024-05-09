import { View, Text, TouchableOpacity, Image, FlatList, Platform, PermissionsAndroid, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../assets/Schemes/Header'
import { TextInput } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../assets/Schemes/Schemes'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'









const AddReports = () => {
    const [camVisible, setCamVisible] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        requestCameraPermission()
    }, [])


    // const data = [
    //     { "image": "http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg" },
    //     { "image": "http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg" },
    //     { "image": "http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg" }
    // ]


    const requestCameraPermission = async () => {
        if (Platform.OS == "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Asian App Needs Camera Permission",
                        message:
                            "Asian App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //console.log("You can use the camera");
                } else {
                    //console.log("Camera permission denied");
                }
            } catch (err) {
                ShortToast(err, "error", "");
            }
        };
    }

    const launchCam = async () => {
        try {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Asian App Camera Permission",
                    message:
                        "Asian App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera(
                    {
                        includeBase64: false,
                        mediaType: 'photo',
                        quality: 0.5,
                    },
                    async (response) => {
                        if (response.didCancel) {
                            //console.log('User cancelled image picker');
                        } else if (response.error) {
                            //console.log('ImagePicker Error: ', response.error);
                        } else {
                            await uploadPhoto(response)
                        }
                    },
                )
            } else {
                ShortToast("Camera Permission Denied. Kindly Grant Camera Access From Settings.", "error", "");
            }

        } catch (err) {
            ShortToast(err, "error", "");
        }


    }

    const uploadPhoto = async (pic) => {
        const temp = await getLocalStorageData('reportID')
        var formdata = new FormData();
        formdata.append("patient_id", "1");
        formdata.append("report_from", "2");
        formdata.append("report_name", "Blood tset");
        formdata.append("lab_info", "New test LAb");
        temp == null || temp == '0' ? formdata.append("report_id", "") : formdata.append("report_id", JSON.parse(temp));

        formdata.append("report", {
            uri: pic?.assets?.[0]?.uri,
            type: pic?.assets?.[0]?.type,
            name: pic?.assets?.[0]?.fileName,
        });
        const result = await PostApiData('create_report', formdata)

        //console.log("formdata======>", formdata)
        //console.log("result======>", result)

        savelocalStorageData('reportID', JSON.stringify(result?.report?.id))

        setData(result)

        // ShortToast(result.message, "success", "")
        // getDataForUserProfile()
        setCamVisible(false)
    }

    const launchGallery = async () => {
        launchImageLibrary(
            {
                includeBase64: false,
                mediaType: 'photo',
                quality: 0.8,
            },
            async (response) => {
                if (response.didCancel) {
                    //console.log('User cancelled image picker');
                } else if (response.error) {
                    //console.log('ImagePicker Error: ', response.error);
                } else {
                    await uploadPhoto(response)
                }
            },
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                borderColor: colors.toobarcolor,
                borderWidth: 1,
                height: H * 0.13,
                width: H * 0.13,
                padding: 10,
                borderRadius: 5,
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: W * 0.02,
                //  backgroundColor: "red"
            }}>

                <Text>{item.id}</Text>



                {<Image source={{ uri: item.image_url }}
                    style={{
                        height: H * 0.11,
                        width: H * 0.11,
                        // tintColor: "white"
                    }}
                />}


            </View>
        )
    }




    return (
        <View>

            <Header Title="Upload Report" />

            <View style={{ backgroundColor: '#F5F5F5', height: H, alignItems: 'center' }}>
                <Modal
                    visible={camVisible}
                    transparent={true}
                >
                    <View style={{
                        height: H,
                        width: W,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'

                    }}>
                        <View style={{
                            backgroundColor: "white",
                            borderRadius: 4,
                            height: H * 0.32,
                            width: W * 0.85,
                            justifyContent: "center",
                            elevation: 8
                        }}>
                            <Text style={{
                                fontFamily: fontFamily.bold,
                                top: -H * 0.06,
                                left: W * 0.05,
                                fontSize: fontSizes.XXL
                            }}>Choose</Text>
                            <View style={{
                                flexDirection: "row",
                                backgroundColor: colors.OFFWHITE,
                                borderRadius: 4,
                                justifyContent: "center",

                            }}>
                                <TouchableOpacity onPress={() => { launchCam() }}>
                                    <View style={{
                                        alignItems: "center",
                                        marginHorizontal: W * 0.1,
                                        marginVertical: H * 0.01,
                                    }}>
                                        <AntDesign name="camera" size={50} color={"silver"} />
                                        <Text style={{
                                            fontFamily: fontFamily.bold,
                                            fontSize: fontSizes.MED
                                        }}>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { launchGallery() }}>
                                    <View style={{
                                        alignItems: "center",
                                        marginHorizontal: W * 0.1,
                                        marginVertical: H * 0.01,
                                    }}>
                                        <AntDesign name="picture" size={50} color={"silver"} />
                                        <Text style={{
                                            fontFamily: fontFamily.bold,
                                            fontSize: fontSizes.MED
                                        }}>Gallery</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setCamVisible(false)}
                            >
                                <Text style={{
                                    textAlign: "right",
                                    fontFamily: fontFamily.bold,
                                    color: "red",
                                    top: H * 0.055,
                                    left: -W * 0.06
                                }}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TextInput
                    mode={"outlined"}
                    keyboardType='default'
                    //maxLength={10}
                    underlineColor='transparent'
                    activeUnderlineColor={colors.blue}
                    activeOutlineColor={colors.blue}
                    outlineColor={"gray"}
                    placeholderTextColor='gray'

                    //  value={fullName}
                    //onChangeText={(t) => { setFullName(t) }}

                    style={{
                        height: H * 0,
                        width: W * 0.9,
                        marginTop: H * 0.015,

                        fontFamily: fontFamily.medium,
                        fontSize: fontSizes.default,
                        backgroundColor: colors.bgeditext,
                    }}


                    placeholder='Test Name' />


                <TextInput
                    mode={"outlined"}
                    keyboardType='default'
                    //maxLength={10}
                    underlineColor='transparent'
                    activeUnderlineColor={colors.blue}
                    activeOutlineColor={colors.blue}
                    outlineColor={"gray"}
                    placeholderTextColor='gray'

                    //  value={fullName}
                    //onChangeText={(t) => { setFullName(t) }}

                    style={{
                        height: H * 0,
                        width: W * 0.9,
                        marginTop: H * 0.015,
                        fontFamily: fontFamily.medium,
                        fontSize: fontSizes.default,
                        backgroundColor: colors.bgeditext,
                    }}


                    placeholder='Lab Info' />


                <TextInput
                    mode={"outlined"}
                    keyboardType='default'
                    //maxLength={10}
                    underlineColor='transparent'
                    activeUnderlineColor={colors.blue}
                    activeOutlineColor={colors.blue}
                    outlineColor={"gray"}
                    placeholderTextColor='gray'
                    //  value={fullName}
                    //onChangeText={(t) => { setFullName(t) }}
                    style={{
                        height: H * 0,
                        width: W * 0.9,
                        marginTop: H * 0.015,
                        fontFamily: fontFamily.medium,
                        fontSize: fontSizes.default,
                        backgroundColor: colors.bgeditext
                    }}
                    placeholder='Description (Optional)' />






                <View style={{ height: H * 0.3, }}>
                    <View style={{
                        marginVertical: H * 0.05
                    }}>
                        <FlatList data={data?.report.documents}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `_key${index}`}
                            numColumns={3} />
                    </View>

                    <TouchableOpacity
                        onPress={() => setCamVisible(true)}
                        style={{
                            borderColor: colors.toobarcolor,
                            borderWidth: 1,
                            height: H * 0.13,
                            width: H * 0.13,
                            padding: 10,
                            borderRadius: 5,
                            alignSelf: 'flex-start',
                            alignItems: 'center',
                            justifyContent: 'center',

                            marginHorizontal: W * 0.06
                        }}>
                        <Image
                            style={{
                                height: H * 0.03,
                                width: H * 0.03,
                                tintColor: 'gray'
                            }}

                            source={(require('../assets/Images/fileupload.png'))} />



                        <Text style={{
                            textAlign: 'center',
                            color: colors.black,
                            textAlign: 'center',
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.EXTRASM,
                            marginTop: H * 0.005
                        }}>SELECT FILE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={() => { navigation.navigate("BottomTab") }}
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
                                textAlign: 'center', color: colors.white,
                                textAlign: 'center',
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.default,
                            }}>Submit</Text>

                        </LinearGradient>

                    </TouchableOpacity>


                </View>







            </View>











        </View>
    )
}

export default AddReports