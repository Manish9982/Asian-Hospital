import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GetApiData } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import { Text } from 'react-native-paper';
import Loader from '../assets/Loader/Loader';
import LottieView from 'lottie-react-native'; // Import LottieView
import { Colors } from 'react-native/Libraries/NewAppScreen';

const OrderHistoryScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const result = await GetApiData('transaction_details');
            if (result?.status == 200) {
                setOrders(result.data);
                console.log("PDF ", result);
            } else {
                Alert.alert('Error', result?.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data');
        }
        finally {
            setLoader(false);
        }
    };

    const renderOrder = ({ item }) => {
        return (
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
                        keyExtractor={(cartItem) => cartItem.itemno}
                        renderItem={({ item: cartItem }) => (
                            <View style={styles.cartItemContainer}>
                                <View style={styles.cartItemDetails}>
                                    <Text style={styles.productName}>{cartItem.product_name}</Text>
                                    <Text style={styles.quantity}>Qty: {cartItem.quantity}</Text>
                                    <Text style={styles.hubname}>({cartItem.hub_name})</Text>
                                </View>
                                <View style={styles.cartItemPrices}>
                                    <Text style={styles.totalPrice}>₹{cartItem.total_price}</Text>
                                </View>
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
                                source={require('./animation-1720678078360.json')}
                                autoPlay
                                loop
                                style={{ width: 30, height: 30,
                                     marginRight: 10, 
                                     tintColor: item.color_code }}
                            />
                            <Text style={[styles.orderStatus, { color: item.color_code }]}>{item.order_status}</Text>
                        </View>
                    <Text style={styles.orderAmount}>Total: ₹{item.amount}</Text>
                </View>
            </View>
        );
    };

    return (
        loader ?
            <Loader />
            :
            <View style={styles.container}>
                <HeaderTwo Title="My Orders" />
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
        marginLeft: 0, // Adjust as needed to separate animation from text
    },
    hubname: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888',
    },
    orderAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cartListContent: {
        paddingBottom: 10, // Adjust padding if necessary
    },
});

export default OrderHistoryScreen;
