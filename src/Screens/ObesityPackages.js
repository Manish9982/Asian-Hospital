import { FlatList, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import { Text } from 'react-native-paper'
import { colors, fontFamily } from '../assets/Schemes/Schemes'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const DATA = {
    status: '200',
    data: [
        {
            plan_name: "Basic Plan",
            price: '700',
            currency: 'Rs.',
            period: '/ month',
            isActive: true,
            benefits: [
                'Manage 1 Unit',
                'Upload upto 2 documents'
            ]
        },
        {
            plan_name: "Silver Plan",
            price: '1400',
            currency: 'Rs.',
            period: '/ month',
            isActive: false,
            benefits: [
                'Everything from free plan &',
                'Income and Expense Tracking',
                'Upload upto 10 documents'
            ]
        },
        {
            plan_name: "Gold Plan",
            price: '2000',
            currency: 'Rs.',
            period: '/ month',
            isActive: false,
            benefits: [
                'Everything from silver plan &',
                'Upload upto 15 documents',
                'Free 12 visits to the dietician',
            ]
        },
    ]

}

const ObesityPackages = () => {
    const [packagesData, setPackagesData] = useState(null)

    useEffect(() => {
        setPackagesData(DATA)
    }, [])

    const renderPackages = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.cardForPackage}>
                <View style={styles.namePriceContainer}>
                    <Text style={typography.planName}>{item?.plan_name}</Text>
                    <Text>
                        <Text style={typography.price}>{item?.currency}</Text>
                        <Text style={typography.price}>{item?.price} </Text>
                        <Text style={typography.price2}>{item?.period}</Text>
                    </Text>

                </View>

                {item?.benefits?.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={styles.benefitsContainer}>
                            <MaterialCommunityIcons name="circle" size={20} color={colors.purplecolor} />
                            <Text>  {item}</Text>
                        </View>
                    )
                })}

            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <HeaderTwo Title={"Obesity Packages"} />
            <View style={styles.container}>
                <FlatList
                    renderItem={renderPackages}
                    data={packagesData?.data}
                    keyExtractor={(item, index) => `${index}`} />
            </View>
        </View>
    )
}

export default ObesityPackages

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    cardForPackage:
    {
        minHeight: 200,
        width: '90%',
        alignSelf: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    namePriceContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        alignItems: 'center'
    },
    benefitsContainer:
    {
        flexDirection: 'row',
        marginVertical: 4
    }

})
const typography = StyleSheet.create({
    planName: {
        fontFamily: fontFamily.semibold,
        fontWeight: '600',
        fontSize: 18,
        color: colors.purplecolor
    },
    price2: {
        fontFamily: fontFamily.semibold,
        fontWeight: '600',
        fontSize: 18,
    },
    price: {
        fontFamily: fontFamily.semibold,
        fontWeight: '600',
        fontSize: 25
    }
})