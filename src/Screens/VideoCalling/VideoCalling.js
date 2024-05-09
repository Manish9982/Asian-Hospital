import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, SafeAreaView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { check, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { colors, fontSizes, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../../assets/Schemes/Schemes';
import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';


const VideoCalling = ({ navigation, route }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [userType, setUserType] = useState("")
    const [status, setStatus] = useState('disconnected');
    const [videoTracks, setVideoTracks] = useState(new Map());
    const twilioRef = useRef(null);



    useEffect(() => {
        getUserType()

        if (Platform.OS == "android") {
            requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then((statuses) => {
                //console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
                //console.log('MICROPHONE', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
                if ((statuses[PERMISSIONS.ANDROID.CAMERA] == "granted") && (statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == "granted"))
                    _onConnectButtonPress()
                else {
                    Alert.alert("Permission Required", "Kindly grant microphone and camera permissions")
                    //navigation.navigate("PermissionScreenForVideoCall")
                }
            });
        }
        else if (Platform.OS == "ios") {
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then((statuses) => {
                //console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                //console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
                if ((statuses[PERMISSIONS.IOS.CAMERA]) && (statuses[PERMISSIONS.IOS.MICROPHONE])) {
                    _onConnectButtonPress()
                }
                else {
                    Alert.alert("Permission Required", "Kindly grant microphone and camera permissions")
                    //navigation.navigate("PermissionScreenForVideoCall")
                }
            });
        }
    }, [])

    useEffect(() => {
        notifee.createChannel({
            id: 'alarm33',
            name: 'Firing alarms & timers',
            lights: false,
            vibration: true,
            importance: AndroidImportance.HIGH,

        });
        notifee.registerForegroundService((notification) => {
            notifee.displayNotification({
                title: 'Foreground service',
                body: 'This notification will exist for the lifetime of the service runner',
                android: {
                    channelId: "alarm33",
                    asForegroundService: true,
                    color: AndroidColor.RED,
                    colorized: true,
                },
            });
        });

    }, [])

    const getUserType = async () => {
        const UT = await getLocalStorageData('userType')
        setUserType(UT)
    }

    const handleCallEndApi = async () => {
        const removeValue = async () => {
            try {
                await AsyncStorage.removeItem('accessToken')
            } catch (e) {
                Alert.alert("Error", `${e}`)
            }

            //console.log('Done.')
        }
        removeValue()
        const ID = await getLocalStorageData('ID')
        const userType = await getLocalStorageData('userType')
        const history_id = await getLocalStorageData('history_id')
        var formdata = new FormData();
        formdata.append("appo_id", ID);
        formdata.append("type", "2")
        {
            userType == "doctor" ?
                formdata.append("user_type", "1")
                :
                formdata.append("user_type", "2")
        }
        formdata.append("history_id", history_id)
        const result = await PostApiData("endCall", formdata)
        //console.log("Call ending api result ====>", result)
        if (result?.status == 200) {

            userType == "patient" ?
                <>
                    {
                        result?.hours == 0
                            ?
                            Alert.alert("Call Summary", `Doctor Name: ${result?.doctor_name}\nDuration:${(JSON.stringify(result?.minutes)).padStart(2, '0')} minutes ${(JSON.stringify(result?.seconds)).padStart(2, '0')} seconds`)
                            :
                            Alert.alert("Call Summary", `Doctor Name: ${result?.doctor_name}\nDuration:${(JSON.stringify(result?.hours)).padStart(2, '0')} hours ${(JSON.stringify(result?.minutes)).padStart(2, '0')} minutes ${(JSON.stringify(result?.seconds)).padStart(2, '0')} seconds`)

                    }
                </>
                :
                <>
                    {
                        result?.hours == 0
                            ?
                            Alert.alert("Call Summary", `Patient Name: ${result?.patient_name}\nDuration:${(JSON.stringify(result?.minutes)).padStart(2, '0')} minutes ${(JSON.stringify(result?.seconds)).padStart(2, '0')} seconds\n\nYou can upload prescription for ${result?.patient_name} now`)
                            :
                            Alert.alert("Call Summary", `Patient Name: ${result?.patient_name}\nDuration:${(JSON.stringify(result?.hours)).padStart(2, '0')} hours ${(JSON.stringify(result?.minutes)).padStart(2, '0')} minutes ${(JSON.stringify(result?.seconds)).padStart(2, '0')} seconds\n\nYou can upload prescription for ${result?.patient_name} now`)
                    }
                </>


            if (userType == "patient") {
                navigation.navigate("BottomTab")
            }
            else if (userType == "doctor") {
                navigation.replace("DoCAddReports", { "appintmentID": `${ID}` })
            }
            else {
                Alert.alert("Info", `${result?.message}`)
            }
            try {
                await AsyncStorage.removeItem('history_id')
            } catch (e) {
                Alert.alert("Error", `${e}`)
            }
        }
    }

    const _onConnectButtonPress = async () => {
        const accessToken = await getLocalStorageData("accessToken")
        if (route?.params?.access_token) {
            try {
                twilioRef.current.connect({ accessToken: route.params.access_token });

                //  twilioRef.current.connect({ accessToken: token });
                setStatus('connecting');
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        }
        else if (accessToken) {
            try {
                twilioRef.current.connect({ accessToken: accessToken });

                setStatus('connecting');
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        }
        else {
            Alert.alert("Error", `No Token Found`)
        }


    }

    const startRecordingDurartion = async () => {
        const ID = await getLocalStorageData('ID')
        const userType = await getLocalStorageData('userType')
        var formdata = new FormData()
        formdata.append("appo_id", ID);
        formdata.append("type", "1");
        {
            userType == "doctor" ?
                formdata.append("user_type", "1")
                :
                formdata.append("user_type", "2")
        }

        const result = await PostApiData('endCall', formdata)
        //console.log("Resut for endCall Api startRecordingDurartion", result)
        if (result?.status == '200') {
            savelocalStorageData('history_id', JSON.stringify(result?.history_id))

        }
        else {
            Alert.alert("Error", `${result?.message}`)
        }
    }

    const _onEndButtonPress = () => {

        twilioRef.current.disconnect();
        //console.log("disconnect")
        setStatus('disconnected')
        // status == 'connected' ? null : handleCallEndApi()
    };

    const _onMuteButtonPress = () => {
        twilioRef.current
            .setLocalAudioEnabled(!isAudioEnabled)
            .then(isEnabled => setIsAudioEnabled(isEnabled));
    };

    const _onFlipButtonPress = () => {
        twilioRef.current.flipCamera();
    };

    const _onRoomDidConnect = ({ roomName, error }) => {
        //console.log('onRoomDidConnect: ', roomName);
        setStatus('connected');
    };

    const _onRoomDidDisconnect = ({ roomName, error }) => {
        //console.log('[Disconnect]ERROR: ', error);
        handleCallEndApi()
        setStatus('disconnected');
    };

    const _onRoomDidFailToConnect = error => {
        Alert.alert('Connection Failed', error.error);
        setStatus('disconnected');
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        //console.log('onParticipantAddedVideoTrack: ', participant, track);
        startRecordingDurartion()
        setVideoTracks(
            new Map([
                ...videoTracks,
                [
                    track.trackSid,
                    { participantSid: participant.sid, videoTrackSid: track.trackSid },
                ],
            ]),
        );
    };

    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        //console.log('onParticipantRemovedVideoTrack: ', participant, track);

        const videoTracksLocal = videoTracks;
        videoTracksLocal.delete(track.trackSid);

        setVideoTracks(videoTracksLocal);
        handleCallEndApi()
    };

    return (
        <View style={{
            height: H,
            width: W,
        }}>

            {(status === 'connected' || status === 'connecting') ? null : <HeaderTwo Title="Call" />}

            {
                status == 'disconnected' &&
                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>
                        Please Wait..
                    </Text>
                </View>
            }

            {
                (status === 'connected' || status === 'connecting') &&
                <View style={{

                }}>



                    {
                        status === 'connected' &&
                        <View style={{

                        }}>
                            {
                                Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                                    return (
                                        <>
                                            <TwilioVideoParticipantView
                                                style={{
                                                    height: H,
                                                    width: W,
                                                    position: "absolute",
                                                    backgroundColor: "black",
                                                    zIndex: -10
                                                }}
                                                key={trackSid}
                                                trackIdentifier={trackIdentifier}
                                            />
                                            <TwilioVideoLocalView
                                                enabled={true}
                                                style={{
                                                    height: H * 0.23,
                                                    width: W * 0.37,
                                                    backgroundColor: "black",
                                                    alignSelf: "center",
                                                    left: W * 0.26,
                                                    top: H * 0.04
                                                }}
                                            />
                                        </>

                                    )
                                })
                            }
                            <TwilioVideoLocalView
                                enabled={true}
                                style={{
                                    position: "absolute",
                                    height: H * 0.23,
                                    width: W * 0.37,
                                    backgroundColor: "black",
                                    alignSelf: "center",
                                    left: W * 0.56,
                                    top: H * 0.04
                                }}
                            />

                        </View>

                    }


                    <View
                        style={
                            {
                                position: "absolute",
                                flexDirection: "row",
                                top: H * 0.89,
                                justifyContent: "space-evenly",
                                width: W,
                            }
                        }>

                        <TouchableOpacity
                            style={{
                                bottom: H * 0.03,
                                backgroundColor: "gray",
                                height: H * 0.1,
                                width: H * 0.1,
                                borderRadius: H * 0.1 / 2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={_onMuteButtonPress}>
                            {
                                isAudioEnabled ?
                                    <Image source={require('../../assets/Images/microphone-black-shape.png')}
                                        style={{
                                            height: H * 0.04,
                                            width: H * 0.04,
                                            tintColor: "white",
                                        }} />
                                    :
                                    <Image source={require('../../assets/Images/mute-microphone.png')}
                                        style={{
                                            height: H * 0.04,
                                            width: H * 0.04,
                                            tintColor: "white",
                                        }} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                bottom: H * 0.03,
                                backgroundColor: colors.maroon,
                                height: H * 0.1,
                                width: H * 0.1,
                                borderRadius: H * 0.1 / 2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={_onEndButtonPress}>
                            <Image source={require('../../assets/Images/hangupCall.png')}
                                style={{
                                    height: H * 0.07,
                                    width: H * 0.07,
                                    tintColor: "white",
                                }} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                bottom: H * 0.03,
                                backgroundColor: "gray",
                                height: H * 0.1,
                                width: H * 0.1,
                                borderRadius: H * 0.1 / 2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={_onFlipButtonPress}>
                            <Image source={require('../../assets/Images/flip.png')}
                                style={{
                                    height: H * 0.04,
                                    width: H * 0.04,
                                    tintColor: "white",
                                }} />
                        </TouchableOpacity>

                    </View>

                </View>
            }


            <TwilioVideo
                ref={twilioRef}
                onRoomDidConnect={_onRoomDidConnect}
                onRoomDidDisconnect={_onRoomDidDisconnect}
                onRoomDidFailToConnect={_onRoomDidFailToConnect}
                onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
                onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default VideoCalling;
