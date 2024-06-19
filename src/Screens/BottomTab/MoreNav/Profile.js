import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, Alert } from 'react-native';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, timeStampToDateFormatd_m_y2 } from '../../../assets/Schemes/Schemes';
import HeaderTwo from '../../../assets/Schemes/HeaderTwo';
import Loader from '../../../assets/Loader/Loader';

const Profile = () => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(null);

    const H = Dimensions.get("window").height;
    const W = Dimensions.get("window").width;

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const result = await GetApiData('patient_profile');
        const token = await getLocalStorageData('token');

        if (result.status == '200') {
            setData(result);
        } else {
            Alert.alert('Error', `${result.message}`);
        }
        setLoader(false);
    };

    if (loader) {
        return <Loader />;
    }

    return (
        <>
            <HeaderTwo Title="My Profile" />
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/Images/pbg.png')}
                    style={styles.backgroundImage}
                />
                <View style={styles.profileContainer}>
                    <Text style={styles.profileText}>
                        {`${data?.patient?.salutation} ${data?.patient?.first_name} ${data?.patient?.last_name || ""}`}
                    </Text>
                    <View style={styles.infoRow}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/Images/call.png')}
                        />
                        <Text style={styles.infoText}>{data?.patient?.phone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/Images/email.png')}
                        />
                        <Text style={styles.infoText}>{data?.patient?.email}</Text>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Image
                            style={styles.detailIcon}
                            source={require('../../../assets/Images/files.png')}
                        />
                        <Text style={styles.detailLabel}>UHID</Text>
                    </View>
                    <Text style={styles.detailText}>{data?.patient.his_id}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Image
                            style={styles.detailIcon}
                            source={require('../../../assets/Images/dateofbirth.png')}
                        />
                        <Text style={styles.detailLabel}>Date of Birth</Text>
                    </View>
                    <Text style={styles.detailText}>{timeStampToDateFormatd_m_y2(data?.patient.dob)}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Image
                            style={styles.detailIcon}
                            source={require('../../../assets/Images/gender.png')}
                        />
                        <Text style={styles.detailLabel}>Gender</Text>
                    </View>
                    <Text style={styles.detailText}>{data?.patient?.gender?.replace("GENDER", "")}</Text>
                </View>
                {/* Display Premium Membership Details */}
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Image
                            style={styles.detailIcon}
                            source={require('../../../assets/Images/crown.png')} 
                        />
                        <Text style={styles.detailLabel}>Privileged User Membership</Text>
                    </View>
                    <Text style={styles.detailText}>Expiring on Oct 10th{data?.patient?.premium_membership}</Text>
                </View>
                {/* Add more premium membership details as needed */}
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    backgroundImage: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        position: 'absolute',
        zIndex: -10
    },
    profileContainer: {
        marginLeft: Dimensions.get("window").width * 0.04,
    },
    profileText: {
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.default,
        color: "black",
        marginTop: Dimensions.get("window").height * 0.04,
        marginLeft: Dimensions.get("window").height * 0.03,
        maxWidth: Dimensions.get("window").width * 0.5,
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: Dimensions.get("window").height * 0.005,
    },
    icon: {
        marginLeft: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").height * 0.025,
        width: Dimensions.get("window").height * 0.025,
        resizeMode: 'contain'
    },
    infoText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.SM,
        color: "gray",
        marginLeft: Dimensions.get("window").height * 0.015,
    },
    detailContainer: {
        marginTop: Dimensions.get("window").height * 0.05,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Dimensions.get("window").height * 0.05,
    },
    detailIcon: {
        marginLeft: '10%',
        width: 30,
        aspectRatio: 1,
        resizeMode: 'contain',
        tintColor:colors.darkgray
    },
    detailLabel: {
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.XL,
        color: "white",
        marginLeft: Dimensions.get("window").height * 0.03,
    },
    detailText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.default,
        color: "white",
        marginLeft: Dimensions.get("window").height * 0.1,
    },
});

export default Profile;
