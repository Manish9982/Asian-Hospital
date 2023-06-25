import { Alert, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { colors, globalStyles, H, PostApiData, validateEmail, validateName, W } from '../../assets/Schemes/Schemes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../assets/Loader/Loader'

const ContactUs = ({ navigation }) => {

    const [emailAddress, setEmailAddress] = useState("")
    const [issue, setIssue] = useState("")
    const [comment, setComment] = useState("")
    const [loader, setLoader] = useState(false)

    const submitFeedback = async () => {
        if (validateEmail(emailAddress) && (issue?.length !== 0) && (comment?.length !== 0)) {
            setLoader(true)
            var formdata = new FormData()
            formdata.append("email", emailAddress)
            formdata.append("query", issue)
            formdata.append("description", comment)
            const result = await PostApiData('contact-us', formdata)
            if (result?.status == '200') {
                Alert.alert('Success', result?.message)
                navigation.goBack()
            }
            else {
                Alert.alert('Info', result?.message)
            }
            //console.log(result)
        }
        else {
            Alert.alert("Error", "Please Check All The Fields.")
        }
        setLoader(false)
    }

    return (
        <KeyboardAwareScrollView>
            {loader ?
                <>
                    <Loader />
                </>
                :
                <>
                    <HeaderTwo Title="Contact Us" />
                    <Text style={{
                        margin: W * 0.04,

                    }}>Email Address:</Text>
                    <TextInput
                        maxLength={100}
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                        activeUnderlineColor={colors.toobarcolor}
                        style={globalStyles.textInput} />
                    <Text style={{
                        margin: W * 0.04,

                    }}>Issue Faced:</Text>
                    <TextInput
                        maxLength={100}
                        value={issue}
                        onChangeText={setIssue}
                        activeUnderlineColor={colors.toobarcolor}
                        style={globalStyles.textInput} />
                    <Text style={{
                        margin: W * 0.04,

                    }}>Comment:</Text>
                    <TextInput
                        multiline
                        value={comment}
                        onChangeText={setComment}
                        activeUnderlineColor={colors.toobarcolor}
                        textAlignVertical="top"
                        numberOfLines={4}
                        style={[globalStyles.textInput, { textAlignVertical: 'top' }]}
                        maxLength={200}
                    />
                    <TouchableOpacity
                        onPress={() => { submitFeedback() }}
                        style={[globalStyles.button, { marginVertical: H * 0.02 }]}>
                        <Text style={{
                            color: "white",
                            fontWeight: "600",
                        }}>Submit</Text>
                    </TouchableOpacity>
                </>}

        </KeyboardAwareScrollView>
    )
}

export default ContactUs