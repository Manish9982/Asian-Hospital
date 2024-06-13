import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderTwo from '../assets/Schemes/HeaderTwo'
import { Text } from 'react-native-paper';
import { colors } from '../assets/Schemes/Schemes';
// Mock function for download
const mockDownloadBill = (transaction) => {
  Alert.alert('Download', `Downloading bill for ${transaction.description}`);
};

const transactions = [
  {
    id: '1',
    date: '2024-06-01',
    amount: 'Rs. 120.00',
    description: 'Grocery Shopping',
    status: 'Completed',
    icon: 'shopping-cart',
    billUrl: 'https://example.com/bill1.pdf',
  },
  {
    id: '2',
    date: '2024-06-03',
    amount: 'Rs. 50.00',
    description: 'Electricity Bill',
    status: 'Pending',
    icon: 'flash-on',
    billUrl: 'https://example.com/bill2.pdf',
  },
  // Add more transactions here
];

const TransactionDetailScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Icon name={item.icon} size={30} color={colors.toobarcolor} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionStatus}>{item.status}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
      <TouchableOpacity style={styles.downloadButton} onPress={() => mockDownloadBill(item)}>
        <Icon name="file-download" size={25} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderTwo />
      <View style={styles.container2}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container2: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
    //backgroundColor:'red',
    width:'90%',
  },
  transactionStatus: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.toobarcolor,
  },
  downloadButton: {
    backgroundColor: colors.toobarcolor,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default TransactionDetailScreen;
