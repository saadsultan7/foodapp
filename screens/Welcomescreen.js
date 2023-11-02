// olo
import React, { useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, StyleSheet, Image, Text, StatusBar } from 'react-native';
import Animated,{useSharedValue,withSpring} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Welcomescreen() {
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(()=>{
    ring1.value=0;
    ring2.value=0;
    setTimeout(()=>ring1.value = withSpring(ring1.value+hp(5)),100)
    setTimeout(()=>ring2.value = withSpring(ring2.value+hp(5.5)),300)
    setTimeout(()=>navigation.replace('Home'),2000)
  },[])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff9500" />
      <Animated.View style={[styles.roundedBackground1,{padding:ring1}]}>
        <Animated.View style={[styles.roundedBackground2,{padding:ring2}]}>
          <Image source={require("../assets/welcome.png")} style={styles.image} />
        </Animated.View>
      </Animated.View>
      <Text style={{ fontSize: hp(10), color: "white"}}>Foody</Text>
      <Text style={{ fontSize: hp(3), color: "#f7f7f7"}}>Food is always right</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff9500",
    alignItems: "center",
    justifyContent: "center",
  },
  roundedBackground1: {
     // Adjust as needed
    backgroundColor: "rgba(255, 255, 255,0.4)", // Background color for the rounded view
    borderRadius: 1000, // Half of the width and height to make it rounded
    alignItems: "center",
    justifyContent: "center",
  },
  roundedBackground2: { // Adjust as needed
    backgroundColor: "rgba(255, 255, 255,0.3)", // Background color for the rounded view
    borderRadius: 1000, // Half of the width and height to make it rounded
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: hp(20),
    height: hp(20),
    resizeMode: "cover", // Adjust as needed
    borderRadius: 1000, // Half of the width and height to make it rounded
  },
});
