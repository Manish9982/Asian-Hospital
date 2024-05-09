import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, SafeAreaView, Image } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { colors, fontSizes, getLocalStorageData, H, PostApiData, W } from '../../assets/Schemes/Schemes';
import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
import RNExitApp from 'react-native-kill-app';


const VideoCallingDirect = ({ navigation, route }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    // const [status, setStatus] = useState('connected');
    const [status, setStatus] = useState('disconnected');
    const [participants, setParticipants] = useState(new Map());
    const [videoTracks, setVideoTracks] = useState(new Map());
    const [permission1, setPermission1] = useState(false)
    const [permission2, setPermission2] = useState(false)
    const [token, setToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzY5MjE4MmE2ZjIwMGRhNGJiOGI0OTJhNzJlNmM2MWI3LTE2NzUyNDgxMDAiLCJpc3MiOiJTSzY5MjE4MmE2ZjIwMGRhNGJiOGI0OTJhNzJlNmM2MWI3Iiwic3ViIjoiQUNlYWJmMDI1ZjY2NjllZmZhZDEzMDAxYjk0ZWRjODA0OCIsImV4cCI6MTY3NTI1MTcwMCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoibWFuaXNoMiIsInZpZGVvIjp7InJvb20iOiJhc2lhbjIyIn19fQ.SE1uOXg9-XJ_AI5t0f4g7OLdrJyqIFRRltfOT2zNqLc');
    const twilioRef = useRef(null);

    useEffect(() => {

        if (Platform.OS == "android") {
            check(PERMISSIONS.ANDROID.CAMERA)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            //console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            //console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.ANDROID.CAMERA)
                                .then((result) => {
                                    switch (result) {
                                        case RESULTS.UNAVAILABLE:
                                            //console.log('This feature is not available (on this device / in this context)');
                                            break;
                                        case RESULTS.DENIED:
                                            //console.log('The permission has not been requested / is denied but requestable');
                                            Alert.alert("Error", "Camera Permission Not Granted")

                                            break;
                                        case RESULTS.LIMITED:
                                            //console.log('The permission is limited: some actions are possible');
                                            break;
                                        case RESULTS.GRANTED:
                                            //console.log('The permission is granted');
                                            setPermission1(true)
                                            break;
                                        case RESULTS.BLOCKED:
                                            //console.log('The permission is denied and not requestable anymore');
                                            break;
                                    }
                                })
                                .catch((error) => {
                                    // …
                                });

                            break;
                        case RESULTS.LIMITED:
                            //console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            //console.log('The permission is granted');
                            setPermission1(true)
                            break;
                        case RESULTS.BLOCKED:
                            //console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
            check(PERMISSIONS.ANDROID.RECORD_AUDIO)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            //console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            //console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.ANDROID.RECORD_AUDIO)
                                .then((result) => {
                                    switch (result) {
                                        case RESULTS.UNAVAILABLE:
                                            //console.log('This feature is not available (on this device / in this context)');
                                            break;
                                        case RESULTS.DENIED:
                                            //console.log('The permission has not been requested / is denied but requestable');
                                            Alert.alert("Error", "Audio Permission Not Granted")

                                            break;
                                        case RESULTS.LIMITED:
                                            //console.log('The permission is limited: some actions are possible');
                                            break;
                                        case RESULTS.GRANTED:
                                            //console.log('The Audio permission is granted');
                                            setPermission2(true)
                                            _onConnectButtonPress()
                                            break;
                                        case RESULTS.BLOCKED:
                                            //console.log('The permission is denied and not requestable anymore');
                                            break;
                                    }
                                })
                                .catch((error) => {
                                    // …
                                });
                            break;
                        case RESULTS.LIMITED:
                            //console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            //console.log('The permission is granted');
                            setPermission2(true)
                            _onConnectButtonPress()
                            break;
                        case RESULTS.BLOCKED:
                            //console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });

        }
        else {
            check(PERMISSIONS.IOS.CAMERA)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            //console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            //console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.IOS.CAMERA)

                                .then((result) => {
                                    switch (result) {
                                        case RESULTS.UNAVAILABLE:
                                            //console.log('This feature is not available (on this device / in this context)');
                                            break;
                                        case RESULTS.DENIED:
                                            //console.log('The permission has not been requested / is denied but requestable');
                                            Alert.alert("Error", "Camera Permission Not Granted")

                                            break;
                                        case RESULTS.LIMITED:
                                            //console.log('The permission is limited: some actions are possible');
                                            break;
                                        case RESULTS.GRANTED:
                                            //console.log('The permission is granted');
                                            setPermission1(true)
                                            break;
                                        case RESULTS.BLOCKED:
                                            //console.log('The permission is denied and not requestable anymore');
                                            break;
                                    }
                                })
                                .catch((error) => {
                                    // …
                                });
                            break;
                        case RESULTS.LIMITED:
                            //console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            //console.log('The permission is granted');
                            setPermission1(true)
                            break;
                        case RESULTS.BLOCKED:
                            //console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
            check(PERMISSIONS.IOS.MICROPHONE)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            //console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            //console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.IOS.MICROPHONE)
                                .then((result) => {
                                    switch (result) {
                                        case RESULTS.UNAVAILABLE:
                                            //console.log('This feature is not available (on this device / in this context)');
                                            break;
                                        case RESULTS.DENIED:
                                            //console.log('The permission has not been requested / is denied but requestable');
                                            Alert.alert("Error", "Audio Permission Not Granted")

                                            break;
                                        case RESULTS.LIMITED:
                                            //console.log('The permission is limited: some actions are possible');
                                            break;
                                        case RESULTS.GRANTED:
                                            //console.log('The Audio permission is granted');
                                            setPermission2(true)
                                            _onConnectButtonPress()
                                            break;
                                        case RESULTS.BLOCKED:
                                            //console.log('The permission is denied and not requestable anymore');
                                            break;
                                    }
                                })
                                .catch((error) => {
                                    // …
                                });
                            break;
                        case RESULTS.LIMITED:
                            //console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            //console.log('The permission is granted');
                            setPermission2(true)
                            _onConnectButtonPress()
                            break;
                        case RESULTS.BLOCKED:
                            //console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
        }
    }, [])

    useEffect(() => {
        notifee.createChannel({
            id: 'alarm33',
            name: 'Firing alarms & timers',
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,

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



    const handleCallEndApi = async () => {
        var formdata = new FormData();
        formdata.append("appo_id", route.params.ID);
        //console.log("formdata appo_id", formdata)
        const result = await PostApiData("endCall", formdata)
        if (result?.status == 200) {
            Alert.alert("Info", `${result?.message}`)
            RNExitApp.exitApp();
        }
        else {
            Alert.alert("Info", `${result?.message}`)
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

                //  twilioRef.current.connect({ accessToken: token });
                setStatus('connecting');
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        }
        else {
            Alert.alert("Error", `No Token Found`)
        }


    }

    const _onEndButtonPress = () => {
        const removeValue = async () => {
            try {
                await AsyncStorage.removeItem('accessToken')
            } catch (e) {
                Alert.alert("Error", `${e}`)
            }

            //console.log('Done.')
        }
        removeValue()
        twilioRef.current.disconnect();
        //console.log("disconnect")
        setStatus('disconnected')
        handleCallEndApi()
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

        setStatus('disconnected');
    };

    const _onRoomDidFailToConnect = error => {
        Alert.alert('Connection Failed', error.error);

        setStatus('disconnected');
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        //console.log('onParticipantAddedVideoTrack: ', participant, track);

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
        RNExitApp.exitApp();
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
                        Connecting....
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

export default VideoCallingDirect;
