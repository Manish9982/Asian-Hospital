import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

//import QRCodeScanner from 'react-native-qrcode-scanner';
//import { RNCamera } from 'react-native-camera';

const OrderFood = () => {

    const device = useCameraDevice('back')

    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
        />
    );
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export default OrderFood
