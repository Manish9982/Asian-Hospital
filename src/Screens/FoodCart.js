import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Platform, Dimensions, TouchableOpacity, Alert, Modal, Animated, Easing } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { GetApiData, H, PostApiData, W, colors, fontFamily, fontSizes } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import LinearGradient from 'react-native-linear-gradient'
const { height, width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.45; // Adjust the item size as needed
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FoodCard from '../components/FoodCard';
import DataContext from '../assets/Context/DataContext';


const FoodCart = ({ navigation }) => {
    const [price, setPrice] = useState(null)
    const [loaderItem, setLoaderItem] = useState(false)

    const { Ncart } = useContext(DataContext)
    const [cart, setCart] = Ncart
    const goAhead = (cart?.every(item => item.product_status == "1"))
    useEffect(() => { getCartDetails() }, [])
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const getCartDetails = async () => {
        setLoaderItem(true)
        try {
            const result = await GetApiData('cart_details');
            if (result?.status == 200) {
                setPrice(result.data.order_total)
                setCart(result.data.orders)
            } else if (result?.status == '201') {
                setPrice(null)
                await setCart([])
                navigation.goBack()
                Alert.alert('Info', result?.message);
            }
            else {
                Alert.alert('Error', result?.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data');
        }
        setLoaderItem(false)
    };
    const onPressPlus = async (item) => {
        setLoaderItem(true)
        var formdata = new FormData()
        formdata.append('product_name', item?.product_name)
        formdata.append('itemno', item?.itemno)
        formdata.append('product_price', item?.product_price)
        formdata.append('quantity', '1')
        formdata.append('pos_code', "")
        const result = await PostApiData('add_to_cart', formdata)
        await getCartDetails()

        if (result?.status == '200') {
            //setFoodItems(result?.data)
        }
        setLoaderItem(false)
    }
    const onPressMinus = async (item) => {
        setLoaderItem(true)
        var formdata = new FormData()
        formdata.append('product_name', item?.product_name)
        formdata.append('itemno', item?.itemno)
        formdata.append('product_price', item?.product_price)
        formdata.append('quantity', '-1')
        formdata.append('pos_code', "")
        const result = await PostApiData('add_to_cart', formdata)
        await getCartDetails()
        if (result?.status == '200') {
            //setFoodItems(result?.data)
        }
        setLoaderItem(false)
    }

    const onPressProceedToPayment = () => {
        if (goAhead) {
            navigation.navigate('PaymentFoodApp')
        }
    }

    const renderFoodCard = ({ item }) => {
        return (
            <FoodCard
                name={item.product_name}
                price={item.product_price}
                image={item.product_image}
                totalPriceNeeded={true}
                quantity={item.quantity}
                onPressAddToCart={() => onPressPlus(item)}
                onPressMinus={() => onPressMinus(item)}
                productStatus={item.product_status}
                availableQuantity={Number.parseInt(item?.available_quantity, 10)}
                crossButtonPress={() => removeFromCart(item.itemno)}
                adjustQuantity={() => adjustQuantity(item.itemno)}
            />
        )
    }

    const removeFromCart = async (num) => {
        setLoaderItem(true)
        var formdata = new FormData()
        formdata.append('itemId', num)
        const result = await PostApiData('remove_from_cart', formdata)
        if (result?.status == '200') {
            getCartDetails()
        }
    }
    const adjustQuantity = async (num) => {
        setLoaderItem(true)
        var formdata = new FormData()
        formdata.append('itemId', num)
        const result = await PostApiData('set_valid_quantity', formdata)
        if (result?.status == '200') {
            getCartDetails()
        }
    }

    return (

        <View style={styles.container}>
            <Modal
                visible={loaderItem}
                transparent={true}
            >
                <View style={styles.loader}>
                    <Animated.Image
                        style={{
                            height: '12%',
                            aspectRatio: 1,
                            transform: [{ rotate: spin }]
                        }}
                        source={require('../assets/Images/favicon.png')} />
                </View>
            </Modal>
            <HeaderTwo Title="Review Order" />
            <FlatList
                data={cart}
                renderItem={renderFoodCard}
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
            {
                !goAhead
                &&
                <Text style={styles.stopText}>Please remove all unavailable items from cart to proceed.</Text>
            }
            <View style={styles.totalSection}>
                {
                    price &&
                    <TouchableOpacity
                        onPress={onPressProceedToPayment}
                        style={[styles.payButtonContainer, { opacity: goAhead ? 1 : 0.5 }]}
                    >
                        <View style={styles.payButtonContent}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.payButtonPriceText}>₹ {price}</Text>
                                <Text style={styles.totalText}>Total</Text>
                            </View>
                            <View style={styles.payButtonTextContainer}>
                                <Text style={styles.payButtonText}>Proceed to Pay</Text>
                            </View>
                        </View>
                    </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE / 1.4, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    totalText: {
        fontSize: fontSizes.default,
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
    },
    flatListContent: {
        paddingBottom: 10, // Adjust based on your design needs
    },
    contentContainerStyle: {
        //paddingBottom: 200,
        // Ensure space for the summary section
    },

    itemText: {
        color: '#fff',
        fontSize: 16
    },
    arrowIcon: {
        marginLeft: 5,
    },
    payButtonTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    payButtonContainer: {
        width: '97%',
        backgroundColor: colors.toobarcolor,
        alignSelf: 'center',
        borderRadius: 15,
        padding: 8,
    },
    image:
    {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: 8,
    },
    payButtonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    payButtonPriceText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: fontSizes.XL,
    },
    totalButtonPriceText: {
        color: colors.white,
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.default,
    },
    contentContainerStyle:
    {
        alignItems: 'center',
        height: ITEM_SIZE * 1.2
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    totalSection: {
        marginTop: 5,
        margin: 20
        //alignItems: 'center',
    },
    totalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black
    },
    totalAmountText: {
        fontWeight: 'bold',
        color: colors.greencolor
    },
    payButton: {
        backgroundColor: '#007bff',
        marginTop: 16,
        borderRadius: 4,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    loader:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    stopText:
    {
        color: colors.maroon,
        marginHorizontal: 20,
        alignSelf: 'center'
    }
});

export default FoodCart;
