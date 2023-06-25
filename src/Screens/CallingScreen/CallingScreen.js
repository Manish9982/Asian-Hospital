import { StyleSheet, View, Image, TouchableOpacity, NativeModules } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, W } from '../../assets/Schemes/Schemes'
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

const CallingScreen = ({ navigation }) => {


    const [doctorNameDuringCall, setDoctorNameDuringCall] = useState("")
    const [isRinging, setIsRinging] = useState(true);
    const isFocused = useIsFocused()
    let ringingSound = null;


    useEffect(() => {
        ringingSound = new Sound('samsung.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                ////console.log(error);
                return;
            }
            ringingSound.setNumberOfLoops(-1)
            ringingSound.play((success) => {
                if (!success) {
                    //console.log('Sound play failed due to audio decoding errors');
                }
            });

            if (!isFocused) {
                ringingSound.stop()
            }


        });


        return () => {
            ringingSound.release();
        };
    }, [isFocused]);

    useEffect(() => {
        getDoctorNameDuringCall()
    }, [])

    const getDoctorNameDuringCall = async () => {
        const temp = await getLocalStorageData('doctorNameDuringCall')
        setDoctorNameDuringCall(temp)
    }

    const hangUpCall = async () => {
        const ID = await getLocalStorageData('ID')
        var formdata = new FormData()
        formdata.append('appointment_id', ID)
        const result = await PostApiData('deniedCall', formdata)
        //console.log(result)
        setIsRinging(false);
        navigation.replace("BottomTab")
    }

    return (
        <View style={{
            backgroundColor: colors.toobarcolor,
            height: H,
            width: W,
        }}>
            <Image source={require('../../assets/Images/asianlogo.png')}
                style={{
                    height: H * 0.1,
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginTop: H * 0.1
                }}
            />
            <Text style={{
                color: "white",
                alignSelf: "center",
                fontSize: fontSizes.XXXL,
                marginTop: H * 0.1,
                fontFamily: fontFamily.medium
            }}>
                {doctorNameDuringCall}
            </Text>
            <Text style={{
                color: "white",
                alignSelf: "center",
                marginTop: H * 0.05
            }}>
                Calling...
            </Text>
            <View style={{
                flexDirection: "row",
                width: W,
                justifyContent: "space-evenly"
            }}>
                <TouchableOpacity
                    style={{
                        height: H * 0.24,
                        width: H * 0.24,
                        marginTop: H * 0.2
                    }}
                    onPress={() => {
                        setIsRinging(false);
                        navigation.replace("VideoCalling")
                    }}
                >
                    <LottieView
                        source={require('./93044-call.json')} autoPlay loop />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: H * 0.24,
                        width: H * 0.24,
                        marginTop: H * 0.2,
                    }}
                    onPress={() => hangUpCall()}
                >
                    <LottieView style={{
                    }}
                        source={require('./92850-red-call-button.json')} autoPlay loop />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ringingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    answerButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginRight: 20
    },
    answerButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    declineButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5
    },
    declineButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default CallingScreen