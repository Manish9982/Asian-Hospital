import { Alert, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, W } from './Schemes';

const Timer = (props) => {

    const minutes = String(Math.floor(props.TimeRemaining / 60)).padStart(2, '0');
    const seconds = String(props.TimeRemaining % 60).padStart(2, '0');

    return (
        <View style={{
            width: W,
            backgroundColor: colors.toobarcolor,
            paddingHorizontal: W * 0.03,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        }}>
            <Text style={{
                color: "white"
            }}>We have temporarily reserved your slot for {`${minutes}:${seconds}`} minutes</Text>
        </View>
    );
};

export default Timer;