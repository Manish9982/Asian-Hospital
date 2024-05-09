import { Dimensions, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, fontFamily, fontSizes } from '../assets/Schemes/Schemes'

const H = Dimensions.get('window').height

const Buttons = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#90E1FF', '#00AEEF', '#00AEEF']}
                style={styles.linearGradient}>
                <Text
                    style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Buttons

const styles = StyleSheet.create({
    linearGradient:
    {
        height: H * 0.07,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 10
    },
    text:
    {
        textAlign: 'center',
        color: colors.white,
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.XL
    }

})