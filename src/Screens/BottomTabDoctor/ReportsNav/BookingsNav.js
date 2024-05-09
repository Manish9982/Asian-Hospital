import { View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes } from '../../../assets/Schemes/Schemes'



const H = Dimensions.get("window").height
const W = Dimensions.get("window").width


const BookingsNav = () => {
  return (

<View style={{alignSelf:'center', justifyContent:'center',alignItems:'center',height:H}}>
<Text style={{fontSize:30, fontFamily:fontFamily.medium}}>
  Coming Soon
</Text>
</View>




    // <View>

    //   <Text

    //     style={{
    //       zIndex: 3,
    //       alignSelf: 'center',
    //       fontFamily: fontFamily.medium,
    //       fontSize: fontSizes.XL,
    //       color: colors.white,
    //       marginTop: H * 0.025,
    //       color: "white",
    //       fontSize: fontSizes.XL
    //     }}>Reports</Text>

    //   <Image
    //     source={require('../../../assets/Images/bgimage.png')}
    //     style={{
    //       height: H * 0.4,
    //       width: W, position: 'absolute'
    //     }} />

    //   <View
    //     style={{
    //       marginTop: H * 0.05,
    //       paddingHorizontal: W * 0.05
    //     }}>

    //     <View style={{
    //       flexDirection: "row",
    //       backgroundColor: "white",
    //       borderRadius: 8,
    //       alignItems: "center",
    //       elevation: 10,
    //       justifyContent: "space-between",
    //       paddingVertical: H * 0.02,
    //       paddingHorizontal: W * 0.05
    //     }}>

    //       <Image
    //         source={{ uri: "https://cdn-icons-png.flaticon.com/512/2750/2750657.png" }}

    //         style={{
    //           height: H * 0.11,
    //           width: H * 0.11,
    //           borderRadius: H * 0.11 / 2,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           alignSelf: "center",
    //           backgroundColor: "silver"
    //         }}
    //       />
    //       <Text style={{ fontFamily: fontFamily.medium }}>Rahul Kumar</Text>



    //       <View>
    //         <Text style={{

    //           fontSize: fontSizes.EXTRASM,
    //           color: "gray",
    //           fontFamily: fontFamily.medium
    //         }}>Weight</Text>

    //         <Text style={{

    //           fontSize: fontSizes.EXTRASM,
    //           color: "gray", fontFamily: fontFamily.regular
    //         }}>72 Kg</Text>
    //       </View>
    //       <View>
    //         <Text style={{
    //           fontSize: fontSizes.EXTRASM,
    //           color: "gray",
    //           fontFamily: fontFamily.medium
    //         }}>Height</Text>
    //         <Text style={{
    //           fontSize: fontSizes.EXTRASM,
    //           color: "gray", fontFamily: fontFamily.regular
    //         }}>5' 11"</Text>

    //       </View>
    //     </View>
    //   </View>
    //   <View style={{
    //     paddingVertical: H * 0.02,
    //     paddingHorizontal: W * 0.05,
    //   }}>
    //     <View style={{
    //       flexDirection: "row",
    //       backgroundColor: "white",
    //       elevation: 8,
    //       paddingVertical: H * 0.02,
    //       paddingHorizontal: W * 0.05,
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       borderRadius: 8

    //     }}>
    //       <View>
    //         <Image 
    //         source = {{ uri: "https://cdn-icons-png.flaticon.com/512/5508/5508928.png" }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             backgroundColor: "white"
    //           }} />

              
    //         <Text 
    //         style={{fontFamily:fontFamily.regular,fontSize:fontSizes.default}}>Pulse Rate</Text>

    //         <Text style={{
    //           textAlign: "center",
    //           color: colors.darkgray,
    //           fontWeight:'bold',
    //           fontSize: fontSizes.SM,
    //         }}>70</Text>
    //       </View>
    //       <View>
    //         <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/4428/4428234.png" }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             backgroundColor: "white",ontSize:fontSizes.default
    //           }} />
    //         <Text>Blood Pressure</Text>
    //         <Text style={{
    //           textAlign: "center",
    //           color: colors.darkgray,
    //           fontWeight:'bold',
    //           fontSize: fontSizes.SM,
    //         }}>120/80</Text>
    //       </View>
    //       <View>
    //         <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/7296/7296405.png" }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             backgroundColor: "white",ontSize:fontSizes.default
    //           }} />
    //         <Text>SO2</Text>
    //         <Text style={{
    //           textAlign: "center",
    //           color: colors.darkgray,
    //           fontWeight:'bold',
    //           fontSize: fontSizes.SM,
    //         }}>99.8</Text>
    //       </View>
    //     </View>
    //   </View>
    //   {/* ////////////////////// */}
    //   <View style={{
    //     justifyContent: "space-evenly",
    //     backgroundColor: "white",
    //     elevation: 8,
    //     borderRadius: 8,
    //     marginHorizontal: W * 0.05,
    //     paddingVertical: H * 0.02,
    //   }}>

    //     <View

    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         paddingVertical: H * 0.02,
    //         paddingHorizontal: W * 0.04,
    //         backgroundColor: "white",
    //         marginHorizontal: W * 0.03,
    //         borderRadius: 8,
    //         marginVertical: H * 0.01
    //       }}>
    //       <View style={{
    //         flexDirection: "row"
    //       }}>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/893/893529.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             marginRight: W * 0.05,
    //             backgroundColor: "white"
    //           }}
    //         />
    //         <View>
    //           <Text style={{fontFamily:fontFamily.medium}}>Haemoglobin</Text>
    //           <Text
    //             style={{
    //               color: "gray",
    //               fontSize: fontSizes.EXTRASM,fontWeight:'bold'
    //             }}>26/12/2022, 5:00 PM</Text>
    //         </View>
    //       </View>
    //       <View>
    //         <Text style={{
    //           color: "green",
    //           textAlign: "center",fontFamily:fontFamily.medium,fontSize:fontSizes.default
    //         }}>Normal
    //         </Text>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/2382/2382067.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             top: H * 0.006
    //           }}
    //         />
    //       </View>
    //     </View>


    //     <Divider style={{ marginHorizontal: W * 0.0, borderColor: 'black', borderWidth: 0.2 }} />

    //     <View style={{
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       paddingVertical: H * 0.03,
    //       paddingHorizontal: W * 0.04,
    //       backgroundColor: "white",
    //       marginHorizontal: W * 0.03,
    //       borderRadius: 8,
    //       marginVertical: H * 0.01
    //     }}>
    //       <View style={{
    //         flexDirection: "row"
    //       }}>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/893/893529.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             marginRight: W * 0.05,
    //             backgroundColor: "white"
    //           }}
    //         />
    //         <View>
    //           <Text>Haemoglobin</Text>
    //           <Text
    //             style={{
    //               color: "silver",
    //               fontWeight: "bold",
    //               fontSize: fontSizes.SM,
    //             }}>(26/12/2022, 5:00 PM)</Text>
    //         </View>
    //       </View>
    //       <View>
    //         <Text style={{
    //           color: "green",
    //           textAlign: "center"
    //         }}>Normal
    //         </Text>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/2382/2382067.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             top: H * 0.006
    //           }}
    //         />
    //       </View>
    //     </View>

    //     <Divider style={{ marginHorizontal: W * 0.0, borderColor: 'black', borderWidth: 0.2 }} />

    //     <View style={{
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       paddingVertical: H * 0.02,
    //       paddingHorizontal: W * 0.04,
    //       backgroundColor: "white",
    //       marginHorizontal: W * 0.03,
    //       borderRadius: 8,
    //       marginVertical: H * 0.01
    //     }}>
    //       <View style={{
    //         flexDirection: "row"
    //       }}>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/893/893529.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             marginRight: W * 0.05,
    //             backgroundColor: "white"
    //           }}
    //         />
    //         <View>
    //           <Text>Haemoglobin</Text>
    //           <Text
    //             style={{
    //               color: "silver",
    //               fontWeight: "bold",
    //               fontSize: fontSizes.SM,
    //             }}>(26/12/2022, 5:00 PM)</Text>
    //         </View>
    //       </View>
    //       <View>
    //         <Text style={{
    //           color: "green",
    //           textAlign: "center"
    //         }}>Normal
    //         </Text>
    //         <Image source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/2382/2382067.png"
    //         }}
    //           style={{
    //             height: H * 0.025,
    //             width: H * 0.025,
    //             alignSelf: "center",
    //             top: H * 0.006
    //           }}
    //         />
    //       </View>
    //     </View>



    //   </View>
    // </View>
  )
}

export default BookingsNav