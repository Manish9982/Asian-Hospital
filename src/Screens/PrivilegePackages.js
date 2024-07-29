import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or any other icon library
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import { Text } from 'react-native-paper';
//GOLD SCREEN


const GoldScreen = () => {
    return (
        <>
            <HeaderTwo 
            Title={''}
            color="#000" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Asian Connect</Text>
                        <Text style={styles.headerGoldText}>GOLD</Text>
                        <Text style={styles.headerSubText}>UNLIMITED FREE DELIVERIES & MORE</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹30</Text>
                        <Text style={styles.priceDuration}>for 3 months</Text>
                    </View>

                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitsHeader}>GOLD BENEFITS</Text>
                        <View style={styles.benefitItem}>
                            <Icon name="motorcycle" size={24} color="#FFD700" />
                            <Text style={styles.benefitText}>
                                Free delivery at all restaurants under 7 km, on orders above ₹199. May not be applicable at a few restaurants that manage their own delivery.
                            </Text>
                        </View>
                        <View style={styles.benefitItem}>
                            <Icon name="percent" size={24} color="#FFD700" />
                            <Text style={styles.benefitText}>
                                Up to 30% extra off above all existing offers at 20,000+ partner restaurants across India.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Gold</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerGoldText: {
        fontSize: 48,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    headerSubText: {
        fontSize: 16,
        color: '#FFD700',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    price: {
        fontSize: 40,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    priceDuration: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
    joinButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -90 }], // Center the button horizontally
        width: 180,
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    benefitsContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        marginBottom: 70, // Add some space to avoid overlapping with the button
    },
    benefitsHeader: {
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    benefitText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
        flex: 1,  // Allow text to wrap within the container
    },
});

export default GoldScreen;