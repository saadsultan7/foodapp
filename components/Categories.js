import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categoryData } from '../Dumidata';
import Animated,{FadeInDown} from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Categories({categories ,activecategory,handlechangecat}) {
  return (
    <Animated.View style={styles.container} entering={FadeInDown.duration(1000).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {
          categories.map((category, index) => {
            let isactive = category.strCategory==activecategory;
            let activebutton = isactive ? {backgroundColor:'orange',borderRadius:hp(100)} : {backgroundColor:'transparent'};
          return(
                <TouchableOpacity key={index} style={styles.category} onPress={()=>handlechangecat(category.strCategory)}>
                  <View style={[styles.imageContainer,activebutton]}>
                    <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />                  
                  </View>
                  <Text style={styles.categoryText}>{category.strCategory}</Text>
                </TouchableOpacity>
              )
          })
        }
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: hp(40),
  },
  scrollContainer: {
    // paddingHorizontal: wp(3), // Use responsive units for horizontal padding
  },
  category: {
    marginTop: hp(1),
    padding: hp(1),
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    padding:hp(0.5),
    borderRadius: hp(100),
  },
  image: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(100),
  },
  categoryText: {
    fontSize: hp(1.7),
    color:"black"   // Use responsive units for font size
  },
});
