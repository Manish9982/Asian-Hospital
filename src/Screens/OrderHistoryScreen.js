import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, Modal, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GetApiData, PostApiData, colors } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import Loader from '../assets/Loader/Loader';
import LottieView from 'lottie-react-native'; // Import LottieView
import { Rating } from 'react-native-ratings';

const OrderHistoryScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);
    const [ratings, setRatings] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null); // Added state for current order

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const handleRating = (rating) => {
        if (currentItem) {
            // Round the rating to the nearest 0.5
            const roundedRating = Math.round(rating * 2) / 2;
            setRatings(prevRatings => ({
                ...prevRatings,
                [currentItem.itemno]: roundedRating
            }));
        }
    };

    const openModal = (order, cartItem) => {
        setCurrentItem(cartItem);
        setCurrentOrder(order); // Set the current order
        setModalVisible(true);
    };

    const fetchOrderHistory = async () => {
        try {
            const result = await GetApiData('transaction_details');
            if (result?.status === 200) {
                setOrders(result.data);
            } else {
                Alert.alert('Error', result?.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data');
        } finally {
            setLoader(false);
        }
    };

    const setRatingAPI = async () => {
        if (currentItem && currentOrder) { // Ensure both currentItem and currentOrder are set
            const rating = ratings[currentItem.itemno];
            const formdata = new FormData();
            formdata.append("order_id", currentOrder.order_id); // Use order_id from currentOrder
            formdata.append("itemId", currentItem.itemno);
            formdata.append("rating", rating);

            try {
                const result = await PostApiData('item_rating', formdata);
                if (result?.status === 200) {
                    fetchOrderHistory();
                    setModalVisible(false);
                } else {
                    Alert.alert('Error', result?.message || 'Something went wrong');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to submit rating');
            } finally {
                setLoader(false);
            }
        }
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
                <View style={styles.iconContainer}>
                    <Icon name="receipt" size={30} color="#ff6f00" />
                </View>
                <View style={styles.orderDetailsContainer}>
                    <View style={styles.orderDetails}>
                        <Text style={styles.transactionNumber}>Txn no: {item.transaction_number}</Text>
                        <Text style={styles.orderDate}>{item.order_date} at {item.order_time}</Text>
                    </View>
                    {item.pdf_link === '' ? (
                        <View style={styles.pdfIcon} />
                    ) : (
                        <TouchableOpacity onPress={() =>
                            navigation.navigate("ShowBillPdf", { "link": item?.pdf_link })
                        }>
                            <Icon name="picture-as-pdf" size={30} color="#ff0000" style={styles.pdfIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.orderBody}>
                <FlatList
                    data={item.cart_data}
                    keyExtractor={(cartItem) => cartItem.itemno.toString()}
                    renderItem={({ item: cartItem }) => (
                        <View style={styles.cartItemContainer}>
                            <View style={styles.cartItemDetails}>
                                <Text style={styles.productName}>{cartItem.product_name}</Text>
                                <Text style={styles.quantity}>Qty: {cartItem.quantity}</Text>
                                <Text style={styles.hubname}>({cartItem.hub_name})</Text>

                                {
                                    item.order_status === 'Delivered' &&
                                    <View style={styles.ratingContainer}>
                                        <Image
                                            source={require('../assets/Images/star.png')}
                                            style={{
                                                width: 13,
                                                height: 13,
                                                marginTop: 2,
                                                tintColor: colors.toobarcolor
                                            }}
                                        />
                                        {
                                            cartItem.rating_count === '' ?
                                                <View></View>
                                                :
                                                <Text style={styles.rating}> {cartItem.rating}({cartItem.rating_count})
                                                </Text>
                                        }

                                        <TouchableOpacity onPress={() => openModal(item, cartItem)}>
                                            <Text style={[styles.rating, styles.underline]}> Add Rating </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            <View style={styles.cartItemPrices}>
                                <Text style={styles.totalPrice}>₹{cartItem.total_price}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.cartListContent}
                        scrollEnabled={false} // Disable internal scroll to allow parent scroll
                    />
                </View>
                <View style={styles.orderFooter}>
                    {/* Conditionally render Lottie animation */}
                    <View style={styles.leftFooter}>
                        <LottieView
                            source={require('../assets/Loader/animation-1720678078360.json')}
                            autoPlay
                            loop
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                                tintColor: item.color_code
                            }}
                        />
                        <Text style={[styles.orderStatus, { color: item.color_code }]}>{item.order_status}</Text>
                    </View>
                    <Text style={styles.orderAmount}>Total: ₹{item.amount}</Text>

                </View>
                <Text style={styles.orderAmount}>Total: ₹{item.amount}</Text>
            </View>
        </View>
    );

    return (
        loader ?
            <Loader />
            :
            <View style={styles.container}>
                <HeaderTwo Title="My Orders" />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            {currentItem ? (
                                <>
                                    <Text style={styles.modalTitle}>Rate {'\n\n'}{currentItem.product_name} from {currentItem.hub_name}</Text>
                                    <Rating
                                        style={{
                                            marginVertical: 5
                                        }}
                                        startingValue={ratings[currentItem.itemno] || 0}
                                        imageSize={45}
                                        onFinishRating={handleRating}
                                        fractions={1} // Allow fractional ratings only in 0.5 increments
                                    />
                                </>
                            ) : (
                                <Text style={styles.modalTitle}>No item selected</Text>
                            )}

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.cancelbutton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={setRatingAPI}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <FlatList
                    data={orders}
                    renderItem={renderOrder}
                    keyExtractor={(item, index) => `${index}`}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    flatListContent: {
        padding: 20,
    },
    orderContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    iconContainer: {
        marginRight: 10,
    },
    orderDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderDetails: {
        flex: 1,
    },
    pdfIcon: {
        marginLeft: 10,
    },
    transactionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#888',
    },
    orderBody: {
        padding: 15,
    },
    cartItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    cartItemDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    quantity: {
        fontSize: 14,
        color: '#888',
    },
    cartItemPrices: {
        alignItems: 'flex-end',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    leftFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 0,
    },
    hubname: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888',
    },
    rating: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    orderAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cartListContent: {
        paddingBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.toobarcolor,
        alignItems: 'center',
    },
    cancelbutton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'grey',
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
});

export default OrderHistoryScreen;
