import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, GetApiData } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import { Toast } from 'toastify-react-native';
import Loader from '../assets/Loader/Loader';

const AnimatedCard = ({ item, onPressPurchase, onPressView }) => {
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.card, { transform: [{ scale: animatedValue }] }]}>
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.cardContent}
            >
                {item?.isActive && (
                    <View style={styles.activeFlag}>
                        <Text style={styles.activeText}>ACTIVE</Text>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <View style={styles.leftAlign}>
                        <Text style={styles.serviceName}>{item.ServiceName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.serviceNameLocal}>{item.ServiceNameLocalLang}</Text>
                            <View style={styles.rightAlign}>
                                <Text style={styles.price}>{item.currency}{item.price}</Text>
                            </View>
                        </View>
                        <Text style={styles.instructions}>{item.ServiceProcessInstructions}</Text>
                    </View>

                </View>
                {
                    item?.isActive
                        ?
                        <TouchableOpacity style={styles.purchaseButton} onPress={() => onPressView(item?.ServiceCode)}>
                            <Text style={styles.purchaseText}>View</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.purchaseButton} onPress={() => onPressPurchase(item?.ServiceCode)}>
                            <Text style={styles.purchaseText}>Proceed</Text>
                        </TouchableOpacity>
                }

            </TouchableOpacity>
        </Animated.View>
    );
};

const ObesityPackages = ({ navigation }) => {
    const [packageData, setPackageData] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getPackageListing()
    }, [])

    const getPackageListing = async () => {
        const result = await GetApiData('dietician_plan_list')
        if (result?.status == '200') {
            setPackageData(result)
        }
        else {
            Toast.error(result?.message)
        }
        setLoader(false)
    }

    const BuyPackage = (prop) => {
        console.log(prop)
        navigation.navigate('ChooseDietician', { service_id: prop })
    }

    const ViewPackage = (prop) => {
        console.log(prop)
        navigation.navigate('ActivePackageDetails', { service_id: prop })
    }

    return (
        <>
            <HeaderTwo
                Title={'Obesity Packages'}
            />
            <Modal visible={loader}>
                <View>
                    <Loader />
                </View>
            </Modal>
            <FlatList
                data={packageData?.data}
                renderItem={({ item }) => <AnimatedCard item={item}
                    onPressPurchase={BuyPackage}
                    onPressView={ViewPackage}
                />}
                keyExtractor={item => item.ServiceCode}
                contentContainerStyle={styles.container}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: colors.toobarcolor2,
    },
    cardContent: {
        alignItems: 'flex-start',
    },
    activeFlag: {
        backgroundColor: colors.greencolor,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    activeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 5,
    },
    leftAlign: {
        flex: 3,
    },
    rightAlign: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
        color: colors.toobarcolor,
    },
    serviceNameLocal: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.orangecolor,
        marginBottom: 5,
    },
    purchaseButton: {
        marginTop: 10,
        backgroundColor: colors.toobarcolor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    purchaseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ObesityPackages;
