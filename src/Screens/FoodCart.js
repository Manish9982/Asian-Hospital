import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Modal, Animated, Easing, ScrollView } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { GetApiData, PostApiData, colors, fontFamily, fontSizes } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import FoodCard from '../components/FoodCard';
import DataContext from '../assets/Context/DataContext';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import ToastManager, { Toast } from 'toastify-react-native';

const FoodCart = ({ navigation }) => {
    const [price, setPrice] = useState(null)
    const [itemCount, setItemCount] = useState('')
    const [charges, setCharges] = useState(null)
    const [loaderItem, setLoaderItem] = useState(false)
    const [showSnack, setShowSnack] = useState(false)
    const { Ncart } = useContext(DataContext)
    const [cart, setCart] = Ncart
    const goAhead = (cart?.some(item => item.product_status == "1"))
    const goAheadAbsolute = (cart?.every(item => item.product_status == "1"))
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
                console.log("price===>", result?.data?.order_total)
                setPrice(result?.data?.order_total)
                setCart(result?.data?.orders)
                setCharges(result?.data?.charges)
                setItemCount(result?.data?.item_count)
            } else if (result?.status == '201') {
                Toast.info('Cart is empty!')
                setPrice(null)
                await setCart([])
                navigation.goBack()
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
        formdata.append('tax_amount', item?.tax_amount)
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
        formdata.append('tax_amount', item?.tax_amount)
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
        else {
            navigation.goBack()
        }
    }

    const renderFoodCardUnavailable = (item, index) => {
        if (item?.product_status == '0') {
            return (
                <FoodCard
                    key={index}
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
    }
    const renderFoodCard = (item, index) => {
        if (item?.product_status == '1') {
            return (
                <FoodCard
                    key={index}
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

    const renderCharges = (item, index) => {
        return (
            <View
                key={index}
                style={styles.chargesRow}
            >
                <View style={styles.chargeNameContainer}>
                    <MaterialCommunityIcons
                        color={'#000'}
                        name={item?.icon_name}
                        size={30}
                        style={styles.iconStyle}
                    />
                    <Text>{item?.charge_name}</Text>
                </View>
                <View>
                    <Text style={styles.priceText}>₹ {item?.charges}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <HeaderTwo Title="Review Order" />
            <ScrollView contentContainerStyle={styles.container}>
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
                <View style={{ flex: 1 }}>
                    {
                        (goAhead && !goAheadAbsolute)
                        &&
                        <Text style={styles.stopText}>These items are not available at the moment. You can Proceed without them.</Text>
                    }
                    {
                        (!goAhead)
                        &&
                        <Text style={styles.stopText}>These items are not available. Please add other available items to proceed.</Text>
                    }
                    {
                        cart?.map((item, index) => renderFoodCardUnavailable(item, index))
                    }
                    {
                        goAhead &&
                        <View style={styles.billSummaryContainer}>
                            <Text style={styles.billHeading}>Cart</Text>
                        </View>
                    }
                    {
                        cart?.map((item, index) => renderFoodCard(item, index))
                    }
                </View>
                {
                    goAhead
                    &&
                    <View>
                        <View style={styles.billSummaryContainer}>
                            <Text style={styles.billHeading}>Bill Summary</Text>
                        </View>
                        {
                            charges?.map((item, index) => renderCharges(item, index))
                        }
                    </View>
                }
            </ScrollView>
            <View style={styles.totalSection}>
                {
                    price &&
                    <TouchableOpacity
                        onPress={onPressProceedToPayment}
                        style={[styles.payButtonContainer, { justifyContent: goAhead ? 'space-between' : 'center', alignItems: goAhead ? null : 'center' }]}
                    >
                        <View style={styles.payButtonContent}>
                            {
                                goAhead
                                &&
                                <View style={styles.priceContainer}>
                                    <Text style={styles.payButtonPriceText}>₹ {price}</Text>
                                    <Text style={styles.totalText}>Total</Text>
                                </View>
                            }
                            <View style={styles.payButtonTextContainer}>
                                {
                                    goAhead
                                        ?
                                        <Text style={styles.payButtonText}>Proceed to Pay ({itemCount == 1 ? `${itemCount} item` : `${itemCount} items`})</Text>
                                        :
                                        <Text style={styles.payButtonText}>Go back to menu</Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: '30%'
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
        height: 70,
        width: '97%',
        backgroundColor: colors.toobarcolor,
        alignSelf: 'center',
        borderRadius: 15,
        padding: 8,
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
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    totalSection: {
        marginTop: 5,
        margin: 20,
        position: 'absolute',
        bottom: 10,
        width: '97%',
        alignSelf: 'center'
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
    },
    billSummaryContainer:
    {
        backgroundColor: '#d3d3d3',
        padding: 10,
        margin: 10,
        marginBottom: 0,
        borderRadius: 8,
    },
    billImage:
    {
        height: 20,
        width: 20
    },
    chargesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //margin: 5,
        padding: 5
    },
    chargeNameContainer:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle:
    {
        marginRight: 10
    },
    billHeading:
    {
        fontWeight: '600'
    },
    priceText:
    {
        fontWeight: '600'
    }
});

export default FoodCart;
