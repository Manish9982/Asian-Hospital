import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { configureFonts, DefaultTheme, TextInput } from 'react-native-paper'
import { colors, fontSizes, getLocalStorageData, W } from '../../assets/Schemes/Schemes'
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../assets/Context/DataContext';





const fontConfig = {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSizes.default,
    color: "white"
};
const theme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: fontConfig })
};


const OtpInputComponent = ({ props }) => {
    const { NotpGlobal } = useContext(DataContext)
    const [otpGlobal, setOtpGlobal] = NotpGlobal
    const navigation = useNavigation()
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    const [text4, setText4] = useState('')
    const firstTextInput = useRef()
    const secondTextInput = useRef()
    const thirdTextInput = useRef()
    const fourthTextInput = useRef()
    const [otp, setOtp] = useState()




    return (
        <View style={styles.mainContainer}>

            <View style={styles.otpBox}>
                <TextInput mode='flat'
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            //console.log("do nothing")
                        }
                    }}
                    theme={theme}
                    style={{ backgroundColor: colors.blue, height: 55, width: 55, borderRadius: 55 / 2, borderTopLeftRadius: 55 / 2, borderTopRightRadius: 55 / 2, textAlign: "center" }}
                    ref={firstTextInput}
                    underlineColor='transparent'
                    activeUnderlineColor={'transparent'}
                    maxLength={1}
                    keyboardType='number-pad'
                    value={text1}
                    onChangeText={(text) => {
                        setText1(text)
                        secondTextInput.current.focus()
                    }
                    }
                    onFocus={() => {

                        firstTextInput.current.clear()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput mode='flat'
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            firstTextInput.current.focus()
                        }
                    }}
                    theme={theme}
                    style={{ backgroundColor: colors.blue, height: 55, width: 55, borderRadius: 55 / 2, borderTopLeftRadius: 55 / 2, borderTopRightRadius: 55 / 2, textAlign: "center" }}
                    ref={secondTextInput}
                    underlineColor='transparent'
                    activeUnderlineColor={'transparent'}
                    maxLength={1}
                    keyboardType='number-pad'
                    value={text2}
                    onChangeText={(text) => {
                        setText2(text)
                        thirdTextInput.current.focus()
                    }
                    }
                    onFocus={() => {

                        secondTextInput.current.clear()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput mode='flat'
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            secondTextInput.current.focus()
                        }
                    }}
                    theme={theme}
                    style={{
                        textAlign: "center",
                        backgroundColor: colors.blue,
                        height: 55,
                        width: 55,
                        borderRadius: 55 / 2,
                        borderTopLeftRadius: 55 / 2,
                        borderTopRightRadius: 55 / 2
                    }}
                    ref={thirdTextInput}
                    underlineColor='transparent'
                    activeUnderlineColor={'transparent'}
                    maxLength={1}
                    keyboardType='number-pad'
                    value={text3}
                    onChangeText={(text) => {
                        setText3(text)
                        fourthTextInput.current.focus()
                    }
                    }
                    onFocus={() => {

                        thirdTextInput.current.clear()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput mode='flat'
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            {
                                text4.length == 0 &&
                                    thirdTextInput.current.focus()
                            }
                        }
                    }}
                    theme={theme}
                    style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: colors.blue,
                        height: 55,
                        width: 55,
                        borderRadius: 55 / 2,
                        borderTopLeftRadius: 55 / 2,
                        borderTopRightRadius: 55 / 2
                    }}
                    ref={fourthTextInput}
                    underlineColor='transparent'
                    activeUnderlineColor={'transparent'}
                    maxLength={1}
                    keyboardType='number-pad'
                    value={text4}
                    onChangeText={(text) => {
                        setText4(text)
                        setOtp(`${text1}${text2}${text3}${text}`)
                        //console.log('otp--->', `${text1}${text2}${text3}${text}`)
                        setOtpGlobal(`${text1}${text2}${text3}${text}`)
                        //navigation.navigate("BottomTab")
                    }
                    }
                    onFocus={() => {
                        fourthTextInput.current.clear()
                    }}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:
    {
        backgroundColor: "white",
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpBox:
    {
        width: W * 0.15,
        margin: 10,
    },
})
export default OtpInputComponent