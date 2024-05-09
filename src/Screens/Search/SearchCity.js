import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Divider, Text, TextInput } from 'react-native-paper'
import { colors, fontFamily, fontSizes, GetApiData, H, W } from '../../assets/Schemes/Schemes'
import DataContext from '../../assets/Context/DataContext'
import Loader from '../../assets/Loader/Loader'

const SearchCity = ({ navigation }) => {

    const { Ncity } = useContext(DataContext)
    const [city, setCity] = Ncity
    const [searchvalue, setSearchValue] = useState("")
    const [filteredCityName, setFilteredCityName] = useState()
    const [data, setData] = useState()
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        getCityNames()
    }, [])

    const getCityNames = async () => {
        const result = await GetApiData('cities')
        // console.log(result)
        if (result.status == '200') {
            setData(result)
            setFilteredCityName(result?.cities)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    const filterSearch = (text) => {
        if (text !== "") {
            const newData = data?.cities.filter(
                function (item) {
                    const itemData = item.AttributeName
                        ? item.AttributeName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredCityName(newData);
            setSearchValue(text);
        } else {
            setSearchValue(text);
            setFilteredCityName(data?.cities)
        }
    }
    const renderItem2 = ({ item, index }) => {
        return (

            <View style={{}}>
                <TouchableOpacity

                    onPress={() => {
                        setCity(item.AttributeName)
                        navigation.goBack()
                    }}

                    // onPress={() => { setState(item.AttributeName) }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View
                        style={{
                            flexDirection: 'column',
                            padding: 5
                        }}>

                        <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium }}>
                            {item.AttributeName}
                        </Text>

                        {/* <Text style={{
                            fontSize: fontSizes.SM, color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.AttributeCode}
                        </Text> */}

                    </View>
                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }


    return (
        loader
            ?
            <Loader />
            :
            <SafeAreaView>
                <TextInput
                    mode={"outlined"}
                    keyboardType='default'
                    // maxLength={10}
                    underlineColor='transparent'
                    activeUnderlineColor={colors.blue}
                    activeOutlineColor={colors.blue}
                    outlineColor={"black"}
                    placeholderTextColor={"gray"}
                    placeholder='Type Your City Name'
                    value={searchvalue}
                    onChangeText={(t) => {
                        filterSearch(t)
                    }}

                    style={{
                        height: H * 0,
                        width: W * 0.95,
                        alignSelf: "center",
                        borderRadius: 8,
                        fontSize: fontSizes.default,
                        backgroundColor: colors.bgeditext,
                        justifyContent: "center",
                        margin: H * 0.02
                    }}

                    right={<TextInput.Icon icon="magnify" />} />
                <FlatList
                    data={filteredCityName}
                    renderItem={renderItem2}
                    keyExtractor={(item, index) => `${index}`}
                />

            </SafeAreaView>

    )

}
export default SearchCity