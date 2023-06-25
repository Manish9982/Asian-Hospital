import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, Platform, StyleSheet } from 'react-native'
import NetInfo, { useNetInfo } from "@react-native-community/netinfo"
import RNRestart from 'react-native-restart'
import { Constants } from './Constants';



export const fontFamily = {
   "regular": "Poppins-Regular",
   "medium": "Poppins-Medium",
   "semibold": "Poppins-SemiBold",
}


export const colors = {
   "darkorange": "#ff5c2c",
   "white": "#ffffff",
   "black": "#000000",
   "darkgray": "#4d4f4e",
   "bgeditext": "#F4FAFC",
   "iconcolor": "#009ED9",
   "blue": '#90E1FF',
   "toobarcolor": "#00aeef",
   "greencolor": "#27b99f",
   "orangecolor": "#f1624b",
   "purplecolor": "#7f7dd1",
   "lightblue": "#c6effe",
   "maroon": "#f54242",
   "doctorCardBlueColor": "#C6EFFE",
   "placeholderColor": "#f09a23",
   "badgeColor": "#fd3b2f"
}

export const fontSizes =
{
   // "EXTRASM": 10,
   // "SM": 12,
   // "default": 14,
   // "XL": 16,
   // "XXL": 18,
   // "XXXL": 20,
   "XXXXSM": 10,
   "EXTRASM": 12,
   "SM": 14,
   "default": 16,
   "XL": 18,
   "XXL": 20,
   "XXXL": 22,
}

export const getAllKeys = async () => {
   let keys = []
   try {
      keys = await AsyncStorage.getAllKeys()
   } catch (e) {
      Alert.alert("Error", e)
   }

   console.log("Async Storage Store:", keys)
}

export const savelocalStorageData = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, value)
   } catch (e) {
      // saving error
      console.log(e)
   }
}


export const getLocalStorageData = async (key) => {
   try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
         return value
      }
   } catch (e) {
      console.log("Value not found in local storage")
      // error reading value
   }
}


export const GetApiData = async (ApiName) => {
   const URL = Constants.API_BASE
   const token = await getLocalStorageData('token')

   var myHeaders = new Headers();
   myHeaders.append("Authorization", `Bearer ${token}`);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };
   console.log(`########Name of Get Api is ${ApiName}====>`, `${ApiName}`)
   try {
      const response = await fetch(`${URL}${ApiName}`, requestOptions)
      const result = await response.json()
      return result
   } catch (error) {
      //Alert.alert('Error', `${error}`)
      Alert.alert('No Response From Server', `Please Try Again.`)
      console.log('Error', `${error}`)
   }

}

export const PostApiData = async (ApiName, formdata) => {
   const netinfo = await NetInfo.fetch()
   console.log("netinfo", netinfo)

   if ((netinfo.isConnected && netinfo.isInternetReachable && Platform.OS == 'android') || (netinfo.isConnected && Platform.OS == 'ios')) {
      // const timeout = setTimeout(() => {
      //    Alert.alert(
      //       'Slow response from server',
      //       'We apologize for the delay. You can wait or try again.'
      //    );
      // }, 12000);
      const URL = Constants.API_BASE
      const token = await getLocalStorageData('token')
      console.log("tokenSignup", token)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
         method: 'POST',
         redirect: 'follow',
         body: formdata,
         headers: myHeaders,
      };
      console.log(`#########formdata of ${ApiName}====>`, formdata)
      try {
         console.log('url======>>>>>', `${URL}${ApiName}`)
         const response = await fetch(`${URL}${ApiName}`, requestOptions)
         const result = await response.json()
         console.log('result=======>', result)
         if (result?.status == 502) {

            try {

               await AsyncStorage.clear()
               RNRestart.Restart()
               Alert.alert('Info', `Your Session Has Expired. Please Login Again.`)
               // clearTimeout(timeout)
            } catch (e) {
               //Alert.alert('No Response From Server', `Please Try Again.`)
               console.log(e)

            }
         }
         else {
            // clearTimeout(timeout)
            return result
         }
      }


      catch (error) {
         // const temp = await getLocalStorageData('user_id')
         console.log(`Api Failure:`, ApiName, JSON.stringify(error))
         Alert.alert('No Response From Server', `Please try again or contact customer support if the problem persists.`)
         // clearTimeout(timeout)
         //Alert.alert('Time Out', 'Please Try Again.')
         // Alert.alert('Message For Developer:', `Api Failure:${ApiName}`)
      }
   }
   else {
      Alert.alert("No Internet Detected!", "Make Sure You Are Connected To Internet Then Try Again.")
   }

}


export function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export const validateName = (name) => {
   var re = /^[a-z ,.'-]+$/i
   return re.test(name);
};







export const timeStampToDateFormatd_m_y = (ts) => {
   const nts = Number.parseInt(ts, 10)
   const date = new Date(nts)
   const day = date.getDate().toString().padStart(2, 0)
   const month = (date.getMonth() + 1).toString().padStart(2, 0)
   const year = (date.getFullYear()).toString().padStart(2, 0)
   return `${day}-${month}-${year}`
}
export const timeStampToDateFormatd_m_y2 = (ts) => {
   //const nts = Number.parseInt(ts, 10)
   const date = new Date(ts)
   const day = date.getDate().toString().padStart(2, 0)
   const month = (date.getMonth() + 1).toString().padStart(2, 0)
   const year = (date.getFullYear()).toString().padStart(2, 0)
   return `${day}-${month}-${year}`
}
export const timeStampToDateFormaty_m_d = (ts) => {
   const nts = Number.parseInt(ts, 10)
   const date = new Date(nts)
   const day = date.getDate().toString().padStart(2, 0)
   const month = (date.getMonth() + 1).toString().padStart(2, 0)
   const year = (date.getFullYear()).toString().padStart(2, 0)
   return `${year}-${month}-${day}`
}

export const strToInt = (str) => {
   return Number.parseInt(str, 10)
}

export function convertTimestampTo12hFormat(timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   let minutes = date.getMinutes();
   let ampm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   minutes = minutes < 10 ? '0' + minutes : minutes;
   let strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
}
export function convert24hTo12hFormat(time) {
   let hours = Number.parseInt(time.substr(0, 2), 10);
   let minutes = time.substr(3, 2);
   let ampm = hours >= 12 && hours < 24 ? 'PM' : 'AM'; // check if hours are between 12 and 23
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   let strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
}

export function convertTimestampToDateString(timestamp) {
   const date = new Date(timestamp);
   const day = date?.getDate();
   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const month = monthNames[date?.getMonth()];
   const year = date?.getFullYear();

   return `${day} ${month} ${year}`;
}

export const globalStyles = StyleSheet.create({
   heading: {
      fontSize: 18,
      marginLeft: 15,
      fontFamily: "Poppins-SemiBold",
   },
   subHeading:
   {

   },
   button:
   {
      width: "95%",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      height: Platform.OS == "ios" ? (Dimensions.get("screen").height) * 0.08 : (Dimensions.get("window").height) * 0.08,
      backgroundColor: "#00aeef",
      borderRadius: 8
   },
   textInput:
   {
      width: "90%",
      alignSelf: "center",
      backgroundColor: "white"
   },
   smallFonts:
   {
      fontSize: fontSizes.SM
   }

})

export const H = Platform.OS == "ios" ? Dimensions.get("screen").height : Dimensions.get("window").height
export const W = Platform.OS == "ios" ? Dimensions.get("screen").width : Dimensions.get("window").width
