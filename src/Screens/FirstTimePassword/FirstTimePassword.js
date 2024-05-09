import { Alert, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { Text, TextInput } from 'react-native-paper'
import { styles } from '../../components/Styles'
import { colors, PostApiData, savelocalStorageData } from '../../assets/Schemes/Schemes'
import DataContext from '../../assets/Context/DataContext'

const FirstTimePassword = () => {
    const { NsignedState } = useContext(DataContext)
    const [signedState, setSignedState] = NsignedState

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const changePassword = async () => {
        if ((newPassword == confirmPassword) && (newPassword?.length !== 0)) {
            var formdata = new FormData()
            formdata.append("new_password", newPassword)
            formdata.append("confirm_password", confirmPassword)
            const result = await PostApiData('reset_pass', formdata)
            console.log(result)
            if (result?.status == '200') {
                //await Alert.alert("Info", "Password Changed Successfully!")
                await savelocalStorageData("token", result?.token)
                await setSignedState('doctor')
            }
            else {
                Alert.alert("Error", `${result?.message}`)
            }
        }
        else {
            Alert.alert("Info", "Passwords do not match")
        }
    }


    return (
        <View>
            <HeaderTwo Title="Change Password" />
            <Text style={styles.infotext}>We recommend you to change your password for security reasons.</Text>
            <Text style={styles.textInputHeadings}>
                New Password:
            </Text>
            <TextInput
                secureTextEntry
                value={newPassword}
                style={styles.textInput}
                onChangeText={setNewPassword}
                activeUnderlineColor={colors.toobarcolor}
            />
            <Text style={styles.textInputHeadings}>
                Confirm New Password:
            </Text>
            <TextInput
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.textInput}
                activeUnderlineColor={colors.toobarcolor}
            />

            <TouchableOpacity
                onPress={changePassword}
                style={styles.button}>
                <Text style={styles.whiteText}>Change Password</Text>
            </TouchableOpacity>
            <Text style={styles.infotext}>Note: You can only reset your password once. After this you will need to contact admin in order to reset password.</Text>
        </View>
    )
}

export default FirstTimePassword