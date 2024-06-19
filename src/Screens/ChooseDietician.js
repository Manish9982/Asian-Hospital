import { FlatList, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import DoctorCardWithoutPrice from '../assets/Schemes/DoctorCardWithoutPrice'
import HeaderTwo from '../assets/Schemes/HeaderTwo'

const DATA = {
    status: '200',
    data: [
        {
            profile_url: 'https://images.pexels.com/photos/3902881/pexels-photo-3902881.jpeg',
            first_name: 'Reena Mishra',
            category: 'Dietician',
            designation: 'MBBS, MD',
            education: 'MIT, Harvard'
        }
    ]
}
export default function ChooseDietician({ navigation }) {
    const [dieticians, setDieticians] = useState(null)

    useEffect(() => {
        setDieticians(DATA)
    }, [])

    const onSelectDietician = () => {
        navigation.navigate('BookDietician')
    }

    const renderDieticians = ({ item }) => {
        return (
            <TouchableOpacity onPress={onSelectDietician}>
                <DoctorCardWithoutPrice
                    image={""}
                    profile_url={item?.profile_url}
                    first_name={item?.first_name}
                    category={item?.category}
                    designation={item?.designation}
                    education={item?.education}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <HeaderTwo Title="Choose Dietician" />
            <View style={styles.container}>
                <Text style={styles.header}>🎉 Congratulations! 🎉</Text>
                <Text style={styles.message}>
                    You now have <Text style={styles.highlight}>5 visits</Text> available to help you reach your goal weight!
                </Text>
                <Text style={styles.message}>
                    🔸 <Text style={styles.highlight}>Choose Your Dietician</Text>: Select the best expert for you.
                </Text>
                <Text style={styles.message}>
                    🔸 <Text style={styles.highlight}>Schedule Your Visits</Text>: Set up your 5 sessions as <Text style={styles.highlight}>monthly</Text> or <Text style={styles.highlight}>weekly</Text>.
                </Text>
                <Text style={styles.message}>
                    Don't worry, you can reschedule anytime if needed. Let’s get started on your journey to a healthier you! 🌟
                </Text>
                <Text style={styles.tapToStart}>**Tap on a dietician to start** ⬇️</Text>
                <FlatList
                    data={dieticians?.data}
                    renderItem={renderDieticians}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        margin:8,
        marginLeft:'4%',
        //textAlign:'center',
        //alignSelf:'center'
    },
    highlight: {
        fontWeight: 'bold',
        color: '#4CAF50', // Green color for highlight
    },
    tapToStart: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF5722', // Orange color for tap to start
    },

})