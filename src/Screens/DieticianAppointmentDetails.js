import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title, Paragraph, DataTable, Divider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTwo from '../assets/Schemes/HeaderTwo';

const appointments = [
    { date: '2024-06-13', time: '10:00 AM', status: 'Upcoming' },
    { date: '2024-06-14', time: '02:00 PM', status: 'Pending' },
    { date: '2024-06-15', time: '11:00 AM', status: 'Completed' },
];

const DieticianAppointmentDetails = () => {
    return (
        <>
            <HeaderTwo Title="Details" />
            <ScrollView style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Title style={styles.primaryText}>Patient Details</Title>

                    <View style={styles.detailRow}>
                        <Icon name="account" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Name: </Text>
                        <Text style={styles.detailText}>John Doe</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.detailRow}>
                        <Icon name="identifier" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> UHID: </Text>
                        <Text style={styles.detailText}>123456</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Icon name="gender-male-female" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Gender: </Text>
                        <Text style={styles.detailText}>Male</Text>
                        <Divider style={styles.verticalDivider} />
                        <Icon name="calendar-account" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Age: </Text>
                        <Text style={styles.detailText}>45</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Icon name="file-document" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Bill Number: </Text>
                        <Text style={styles.detailText}>78910</Text>
                        <Divider style={styles.verticalDivider} />
                        <Icon name="currency-usd" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Amount: </Text>
                        <Text style={styles.detailText}>$500</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Icon name="calendar" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Date: </Text>
                        <Text style={styles.detailText}>2024-06-12</Text>
                        <Divider style={styles.verticalDivider} />
                        <Icon name="clock" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Time: </Text>
                        <Text style={styles.detailText}>04:00 PM</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Icon name="cash" size={20} color={styles.iconColor.color} />
                        <Text style={styles.detailTextBold}> Payment Type: </Text>
                        <Text style={styles.detailText}>Cash</Text>
                    </View>
                </View>

                <Title style={[styles.primaryText, { marginTop: 20 }]}>Appointments</Title>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Time</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                    </DataTable.Header>

                    {appointments.map((appointment, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{appointment.date}</DataTable.Cell>
                            <DataTable.Cell>{appointment.time}</DataTable.Cell>
                            <DataTable.Cell
                                //style={appointment.status === 'Upcoming' ? styles.upcoming : appointment.status === 'Pending' ? styles.pending : styles.completed}
                                style={{ display: 'flex' }}
                            >
                                <Text style={appointment.status === 'Upcoming' ? styles.upcoming : appointment.status === 'Pending' ? styles.pending : styles.completed}>{appointment.status}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    detailsContainer: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    primaryText: {
        color: '#00aeef',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    detailTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    detailText: {
        fontSize: 16,
        color: '#000',
    },
    iconColor: {
        color: '#ffa500',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e0e0e0',
        marginHorizontal: 8,
    },
    divider: {
        marginVertical: 8,
    },
    upcoming: {
        color: 'gray', // Gray color for completed
    },
    pending: {
        color: '#FF6347', // Tomato color for pending
    },
    completed: {
        color: 'green',
    },
});

export default DieticianAppointmentDetails;
