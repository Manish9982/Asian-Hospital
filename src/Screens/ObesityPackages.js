import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import { Text, Button } from 'react-native-paper'
import { colors, fontFamily } from '../assets/Schemes/Schemes'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

const DATA = {
    status: '200',
    data: [
        {
            plan_name: "Starter Plan",
            price: '500',
            currency: 'Rs.',
            period: '/ month',
            isActive: true,
            benefits: [
                'Access to basic workouts',
                'Weekly diet plan',
                'Email support'
            ]
        },
        {
            plan_name: "Advanced Plan",
            price: '1200',
            currency: 'Rs.',
            period: '/ month',
            isActive: false,
            benefits: [
                'Everything from Starter Plan &',
                'Personalized workout routines',
                'Monthly diet consultations',
                '24/7 chat support'
            ]
        },
        {
            plan_name: "Premium Plan",
            price: '2500',
            currency: 'Rs.',
            period: '/ month',
            isActive: false,
            benefits: [
                'Everything from Advanced Plan &',
                'Daily diet consultations',
                'Priority support',
                'Free fitness tracker',
            ]
        },
    ]
}

const ObesityPackages = ({ navigation }) => {
    const [packagesData, setPackagesData] = useState(null)

    useEffect(() => {
        setPackagesData(DATA)
    }, [])

    const renderPackages = ({ item, index }) => {
        const onPressPurchaseButton = () => {
            navigation.navigate("ChooseDietician")
        }
        return (
            <TouchableOpacity style={[styles.cardForPackage, item.isActive && styles.activePackage]}>
                <View style={styles.namePriceContainer}>
                    <Text style={typography.planName}>{item?.plan_name}</Text>
                    <Text>
                        <Text style={typography.price}>{item?.currency}</Text>
                        <Text style={typography.price}>{item?.price} </Text>
                        <Text style={typography.price2}>{item?.period}</Text>
                    </Text>
                </View>

                {item?.benefits?.map((benefit, idx) => {
                    return (
                        <View key={idx} style={styles.benefitsContainer}>
                            <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.toobarcolor} />
                            <Text style={typography.benefitText}>  {benefit}</Text>
                        </View>
                    )
                })}
                <Button
                    mode="contained"
                    onPress={onPressPurchaseButton}
                    style={styles.purchaseButton}
                    labelStyle={typography.buttonText}
                >
                    {item.isActive ? 'Current Plan' : 'Purchase'}
                </Button>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <HeaderTwo Title={"Packages"} />
            <FlatList
                contentContainerStyle={styles.listContainer}
                renderItem={renderPackages}
                data={packagesData?.data}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    )
}

export default ObesityPackages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    listContainer: {
        paddingVertical: 20,
    },
    cardForPackage: {
        minHeight: 250,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    activePackage: {
        borderColor: colors.toobarcolor,
        borderWidth: 2,
    },
    namePriceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    benefitsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    purchaseButton: {
        marginTop: 20,
        backgroundColor: colors.toobarcolor,
    },
})

const typography = StyleSheet.create({
    planName: {
        fontFamily: fontFamily.bold,
        fontWeight: '700',
        fontSize: 24,
        color: colors.toobarcolor,
    },
    price2: {
        fontFamily: fontFamily.semibold,
        fontWeight: '600',
        fontSize: 18,
        color: colors.darkgray,
    },
    price: {
        fontFamily: fontFamily.bold,
        fontWeight: '700',
        fontSize: 24,
        color: colors.black,
    },
    benefitText: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        color: colors.darkgray,
        marginLeft: 10,
    },
    buttonText: {
        fontFamily: fontFamily.semibold,
        fontSize: 16,
        color: '#fff',
    },
})
