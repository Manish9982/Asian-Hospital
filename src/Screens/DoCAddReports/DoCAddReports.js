import { View, TouchableOpacity, Image, FlatList, Platform, PermissionsAndroid, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, savelocalStorageData, W, globalStyles } from '../../assets/Schemes/Schemes'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import Loader from '../../assets/Loader/Loader'



const DoCAddReports = ({ navigation, route }) => {

    // console.log("AppointmentID === +++ ", route.params.appintmentID)

    const [camVisible, setCamVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        requestCameraPermission()
    }, [])

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
                    // console.log("You can use the camera");
                } else {
                    // console.log("Camera permission denied");
                }
            } catch (err) {
                ShortToast(err, "error", "");
            }
        };
    }

    const launchCam = async () => {
        try {
            launchCamera(
                {
                    includeBase64: false,
                    mediaType: 'photo',
                    quality: 0.2,
                },
                async (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    } else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    } else {
                        //console.log(response)
                        await uploadPhoto(response)
                    }
                },
            )
        }

        catch (err) {
            ShortToast(err, "error", "");
        }
    }

    const uploadPhoto = async (pic) => {
        setLoader(true)
        // const temp = await getLocalStorageData('reportID')
        var formdata = new FormData();

        formdata.append("appo_id", route.params.appintmentID);
        formdata.append("prescription_image", {
            uri: pic?.assets?.[0]?.uri,
            type: pic?.assets?.[0]?.type,
            name: pic?.assets?.[0]?.fileName,
        });

        const result = await PostApiData('create_prescription', formdata)

        // console.log("formdata======>", formdata)
        // console.log("result======>", result)

        if (result?.status == '200') {
            setData(result)
        } else {
            Alert.alert('Info', result?.message)
        }

        setCamVisible(false)
        setLoader(false)
    }

    const launchGallery = async () => {
        launchImageLibrary(
            {
                includeBase64: false,
                mediaType: 'photo',
                quality: 0.2,
            },
            async (response) => {
                if (response.didCancel) {
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    // console.log('ImagePicker Error: ', response.error);
                } else {
                    await uploadPhoto(response)
                }
            },
        )
    }

    const openImage = (link) => {
        navigation.navigate("DoCImageViewer", { "link": link })
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => { openImage(item.image_url) }}
                style={{
                    borderColor: colors.toobarcolor,
                    borderWidth: 1,
                    height: H * 0.14,
                    width: H * 0.14,
                    padding: 10,
                    borderRadius: 5,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: H * 0.02
                }}>

                {/* <Text>{item.id}</Text> */}


                {<Image source={{ uri: item.image_url }}
                    style={{
                        height: H * 0.13,
                        width: H * 0.13,
                        resizeMode: 'stretch',
                        borderRadius: 5
                        // tintColor: "white"
                    }}
                />}


            </TouchableOpacity>
        )
    }




    return (
        loader ? <>
            <Loader />
        </> :
            <View>

                <HeaderTwo Title="Upload Prescription" />

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
                    {data == null
                        ?
                        null
                        :
                        <View style={{
                            height: H * 0.55,
                            width: W * 0.95,
                            borderColor: "gray",
                            borderRadius: 8,
                            borderWidth: 0.8,
                            marginTop: H * 0.02,
                        }}>

                            <FlatList data={data?.prescription}
                                columnWrapperStyle={{
                                    justifyContent: "space-evenly"
                                }}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => `_key${index}`}
                                numColumns={3} />


                        </View>

                    }
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
                            marginTop: H * 0.05,
                            marginHorizontal: W * 0.06
                        }}>
                        <Image
                            style={{
                                height: H * 0.03,
                                width: H * 0.03,
                                tintColor: 'gray'
                            }}

                            source={(require('../../assets/Images/fileupload.png'))} />
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
                        onPress={() => navigation.goBack()}
                        style={[globalStyles.button, { marginTop: H * 0.02 }]}>
                        <Text style={{ color: "white" }}>Done</Text>
                    </TouchableOpacity>

                </View>

            </View>
    )
}

export default DoCAddReports