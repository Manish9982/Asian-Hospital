import notifee, {
    TimestampTrigger,
    TriggerType,
    RepeatFrequency,
    AuthorizationStatus,
    AndroidNotificationSetting,
    AndroidImportance,
    AndroidCategory
} from '@notifee/react-native'
import { AndroidColor } from '@notifee/react-native';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { openSettings } from 'react-native-permissions';



export async function checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();


    if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        // 2. ask your users to disable the feature
        Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please enable notifications for the app.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await openSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }
    // }

}

export const displayNotification = async (title, body) => {
    const channelId = await notifee.createChannel({
        id: 'Alarm',
        name: 'Alarm',
        importance: AndroidImportance.HIGH,
        sound: 'hollow',
    });

    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            pressAction: {
                id: 'default',
                mainComponent: 'custom-component',
            },
            importance: AndroidImportance.HIGH,
            sound: 'hollow',
        },
    });

}



export async function onCreateTriggerNotification(timestamp, title, body, id) {
    const settings = await notifee.getNotificationSettings();

    if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
        const trigger = {
            alarmManager: true,
            type: TriggerType.TIMESTAMP,
            timestamp: timestamp,
            sound: 'hollow',

        };
        const channelId = await notifee.createChannel({
            id: 'trump',
            name: 'reminders2trump',
            importance: AndroidImportance.HIGH,
            alarmManager: true,
            sound: 'hollow',

        });
        await notifee.createTriggerNotification(
            {
                id: `${id}`,
                title: `${title}`,
                body: `${body}`,
                android: {
                    channelId,
                    pressAction: {
                        id: 'default',
                        mainComponent: 'custom-component',
                    },
                    importance: AndroidImportance.HIGH,
                    sound: 'hollow',
                    alarmManager: true,
                },
            },
            trigger,
        );
    }
    else {
        Alert.alert(
            'Alarm Permission Not Granted',
            'To set an alarm, kindly provide us access to the alarm manager.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openAlarmPermissionSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }
    //console.log(settings)
}
export async function onCreateTriggerNotificationDaily(timestamp, title, body, id) {
    const settings = await notifee.getNotificationSettings();
    if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
        const trigger = {
            alarmManager: true,
            type: TriggerType.TIMESTAMP,
            timestamp: timestamp,
            repeatFrequency: RepeatFrequency.DAILY,
            sound: 'hollow',
        };
        const channelId = await notifee.createChannel({
            id: 'dailyChannel',
            name: 'dailyChannel',
            importance: AndroidImportance.HIGH,
            alarmManager: true,
            sound: 'hollow',
        });
        await notifee.createTriggerNotification(
            {
                id: `${id}`,
                title: `${title}`,
                body: `${body}`,
                android: {
                    channelId,
                    pressAction: {
                        id: 'default',
                        mainComponent: 'custom-component',
                    },
                    importance: AndroidImportance.HIGH,
                    sound: 'hollow',
                    alarmManager: true,
                },
            },
            trigger,
        );
    }
    else {
        Alert.alert(
            'Alarm Permission Not Granted',
            'To set an alarm, kindly provide us access to the alarm manager.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openAlarmPermissionSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }
    //console.log(settings)
}
export async function onCreateTriggerNotificationWeekly(timestamp, title, body, id) {
    const settings = await notifee.getNotificationSettings();
    if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
        const trigger = {
            alarmManager: true,
            type: TriggerType.TIMESTAMP,
            timestamp: timestamp,
            repeatFrequency: RepeatFrequency.WEEKLY,
            sound: 'hollow',
        };
        const channelId = await notifee.createChannel({
            id: 'dailyChannel',
            name: 'dailyChannel',
            importance: AndroidImportance.HIGH,
            alarmManager: true,
            sound: 'hollow',
        });
        await notifee.createTriggerNotification(
            {
                id: `${id}`,
                title: `${title}`,
                body: `${body}`,
                android: {
                    channelId,
                    pressAction: {
                        id: 'default',
                        mainComponent: 'custom-component',
                    },
                    importance: AndroidImportance.HIGH,
                    sound: 'hollow',
                    alarmManager: true,
                },
            },
            trigger,
        );
    }
    else {
        Alert.alert(
            'Alarm Permission Not Granted',
            'To set an alarm, kindly provide us access to the alarm manager.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openAlarmPermissionSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }
   // console.log(settings)
}
export async function onCreateTriggerNotificationHourly(timestamp, title, body, id) {
    const settings = await notifee.getNotificationSettings();
    if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
        const trigger = {
            alarmManager: true,
            type: TriggerType.TIMESTAMP,
            timestamp: timestamp,
            repeatFrequency: RepeatFrequency.HOURLY,
            sound: 'hollow',
        };
        const channelId = await notifee.createChannel({
            id: 'dailyChannel',
            name: 'dailyChannel',
            importance: AndroidImportance.HIGH,
            alarmManager: true,
            sound: 'hollow',
        });
        await notifee.createTriggerNotification(
            {
                id: `${id}`,
                title: `${title}`,
                body: `${body}`,
                android: {
                    channelId,
                    pressAction: {
                        id: 'default',
                        mainComponent: 'custom-component',
                    },
                    importance: AndroidImportance.HIGH,
                    sound: 'hollow',
                    alarmManager: true,
                },
            },
            trigger,
        );
    }
    else {
        Alert.alert(
            'Alarm Permission Not Granted',
            'To set an alarm, kindly provide us access to the alarm manager.',
            [
                // 3. launch intent to navigate the user to the appropriate screen
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openAlarmPermissionSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }
    // console.log(settings)
}


export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log("remoteMessage.notification");
        //  navigation.navigate("Coach")


        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    // console.log(
                    //     'Notification caused app to open from quit state:',
                    //     remoteMessage.notification,
                    // );
                }
            });
    });
}
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
       // console.log('Authorization status:', authStatus);
    }
}
