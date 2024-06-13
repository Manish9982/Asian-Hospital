import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import { Divider, SegmentedButtons, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { colors } from '../../assets/Schemes/Schemes';

const appointments = [
    { id: '1', time: '10:00 AM', date: '2024-06-12', name: 'John Doe', billNumber: 'B001', gender: 'M', age: 30, uhid: 'U12345', mobile: '123-456-7890', paymentType: 'CC' },
    { id: '2', time: '11:00 AM', date: '2024-06-12', name: 'Jane Smith', billNumber: 'B002', gender: 'F', age: 25, uhid: 'U123456789012', mobile: '098-765-4321', paymentType: 'Cash' },
    // Add more appointments here
];

const AppointmentCard = ({ appointment }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [newDate, setNewDate] = useState('');

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setNewDate(date.toString());
        hideDatePicker();
    };

    const navigateToDetails = () => {
        navigation.navigate('DieticianAppointmentDetails', { appointmentId: appointment.id });
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.name}>{appointment.name}</Text>
                <View style={styles.paymentContainer}>
                    <Icon name="credit-card" size={16} color="#666" style={styles.detailIcon} />
                    <Text style={styles.detailText}>{appointment.paymentType}</Text>
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailRow}>
                <Icon name="calendar" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>Date: </Text>
                <Text style={styles.detailText}>{appointment.date}</Text>
                <View style={styles.detailSpacer} />
                <Icon name="clock-o" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>Time: </Text>
                <Text style={[styles.detailText]}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="user" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>Gender: </Text>
                <Text style={styles.detailText}>{appointment.gender}</Text>
                <View style={styles.detailSpacer} />
                <Icon name="birthday-cake" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>Age: </Text>
                <Text style={styles.detailText}>{appointment.age}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="id-card" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>UHID: </Text>
                <Text style={styles.detailText}>{appointment.uhid}</Text>
                <View style={styles.detailSpacer} />
                <Icon name="phone" size={16} color="#666" style={styles.detailIcon} />
                <Text style={[styles.detailText, styles.bold]}>Mobile: </Text>
                <Text style={styles.detailText}>{appointment.mobile}</Text>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={navigateToDetails}
                >
                    <Text style={styles.buttonText}>View</Text>
                    <Icon name="arrow-right" size={16} color="#fff" />
                </TouchableOpacity>
                <Divider style={styles.buttonDivider} />
                <TouchableOpacity
                    style={[styles.button, styles.rescheduleButton]}
                    onPress={showModal}
                >
                    <Text style={styles.buttonText}>Reschedule</Text>
                    <Icon name="calendar" size={16} color="#fff" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Reschedule</Text>
                    <Button title="Pick new date & time" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text>New Date & Time: {newDate}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={hideModal}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const AppointmentScreen = () => {
    const renderAppointment = ({ item }) => <AppointmentCard appointment={item} />;

    return (
        <View style={styles.container}>
            <HeaderTwo Title="Package Appts" />
            <SegmentedButtons
                multiSelect
                style={{
                    borderRadius:8,
                    //height:50,
                    margin: 10,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                //value={value}
                onValueChange={(t) => console.log(t)}
                buttons={
                    [
                        {
                            showSelectedCheck: true,
                            value: 'Pending',
                            label: <Text style={{
                                //color: value?.includes('Pending') ? "white" : "black",
                                //fontSize: 14
                            }}>Pending</Text>,
                            style: {
                                backgroundColor: '#ffffff',
                                borderRadius: 8,
                            }
                        },
                        {
                            showSelectedCheck: true,
                            value: 'Completed',
                            label: <Text style={{
                                //color: value?.includes('Completed') ? "white" : "black",
                                //fontSize: 14
                            }}>Completed</Text>,
                            style: {
                                backgroundColor: '#ffffff',
                                borderRadius: 8,
                            }
                        },
                    ]}
            />
            <FlatList
                data={appointments}
                renderItem={renderAppointment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    card: {
        width: "95%",
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.toobarcolor,
    },
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    detailIcon: {
        marginRight: 5,
    },
    detailText: {
        fontSize: 16,
        color: '#666',
    },
    bold: {
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.toobarcolor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
    },
    rescheduleButton: {
        backgroundColor: colors.toobarcolor2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonDivider: {
        width: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: colors.toobarcolor,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    detailSpacer: {
        marginRight: 20,
    },
});

export default AppointmentScreen;
