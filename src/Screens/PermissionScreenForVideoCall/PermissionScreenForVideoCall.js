import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { request, check, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';


const PermissionScreenForVideoCall = ({ navigation }) => {

    useEffect(() => {
        requestPermissionForMicrophoneAndCamera()
    }, [check1, check2])

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const handleContinue = () => {
        navigation.navigate("VideoCalling")
    };

    const toggleCheckBox1 = () => {
        setCheck1(prev => {
            if (!prev) {
                request(PERMISSIONS.ANDROID.CAMERA)
                return true
            }
        });
    };

    const toggleCheckBox2 = () => {
        setCheck2(prev => {
            if (!prev) {
                request(PERMISSIONS.ANDROID.RECORD_AUDIO)
                return true
            }
        });
    };


    const enableContinueButton = () => {
        if (check1 && check2) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    };

    const requestPermissionForMicrophoneAndCamera = async () => {
        if (Platform.OS == "android") {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then(result => {
                if (result[PERMISSIONS.ANDROID.CAMERA] == "granted") {
                    setCheck1(true)
                }
                if (result[PERMISSIONS.ANDROID.RECORD_AUDIO] == "granted") {
                    setCheck2(true)
                }
            })
        }
        else if (Platform.OS == "ios") {

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You need to provide following permissions in order to continue to video call:</Text>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={check1 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        toggleCheckBox1();
                        enableContinueButton();
                    }}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Grant Permission For Camera</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={check2 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        toggleCheckBox2();
                        enableContinueButton();
                    }}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Grant Permission For Microphone</Text>
            </View>
            <TouchableOpacity
                style={[styles.button, isEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
                onPress={isEnabled ? handleContinue : null}
                disabled={!isEnabled}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonEnabled: {
        backgroundColor: '#2196F3',
    },
    buttonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});

export default PermissionScreenForVideoCall;