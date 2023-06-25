import { FlatList, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { colors, convertTimestampTo12hFormat, fontFamily, fontSizes, H, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { styles } from '../../components/Styles'
import { useNavigation } from '@react-navigation/native'


const DoCIpdBillingList = (props) => {

    const navigation = useNavigation()

    const getFirstLetterOfName = (str) => {
        let index = str.indexOf(" ")
        return str[index + 1]
    }


    const renderItem = ({ item, index }) => {

        return (

            <TouchableOpacity
                style={[styles.ipdPatientCard, { backgroundColor: item?.color, }]}
                onPress={() => {
                    //savelocalStorageData("ID", `${item?.id}`)
                    navigation.navigate("DoCIpdReports", { 'ipcase': item?.PatientIPCaseNumber })
                }} >
                <View style={[styles.horizontalContainer, { color: item?.text_color }]}>
                    <Text
                        style={[styles.ipdPatientName, styles.boldLarge, { color: item?.text_color }]}>{`${item?.Patientname}`}</Text>
                </View>
                <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>DOA:</Text>
                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.doa}</Text>
                </Text>
                <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>Gender: </Text>
                    <Text style={[styles.whiteText, { color: item?.text_color }]}>
                        {item?.Sex?.replace("GENDER", "")}
                    </Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>       Age:
                    </Text>
                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.Age}</Text>
                </Text>
                <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>IP:</Text>
                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.PatientIPCaseNumber}</Text>
                    <Text>
                        <Text
                            style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>       Bed:</Text>
                        <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.PatientIPCurrentBedCode}</Text>
                    </Text>
                </Text>
                <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>UHID:</Text>

                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.PatientCode}</Text>
                    <Text>
                        <Text
                            style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>       M:</Text>
                        <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.phone}</Text>
                    </Text>
                </Text>
                {/* <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>{"Ward Name:"}</Text>

                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.Wardname}</Text>
                </Text> */}
                <Text>
                    <Text
                        style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>Pay:</Text>
                    <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.p_type}</Text>
                </Text>
                {
                    item?.p_name !== "" &&
                    <Text>
                        <Text
                            style={[styles.boldMedium, styles.whiteText, { color: item?.text_color }]}>Inst:</Text>
                        <Text style={[styles.whiteText, { color: item?.text_color }]}> {item?.p_name}</Text>
                    </Text>
                }


            </TouchableOpacity>

        )
    }


    return (
        <View>
            <FlatList
                data={props.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `_key${index}`}
            />
        </View>
    )
}

export default DoCIpdBillingList