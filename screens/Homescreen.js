  import React, { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TextInput } from 'react-native';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
  import axios from 'axios';
  import { Recipes, RecipeCard } from '../components/Recipes';
  import Categories from '../components/Categories';
  export default function Homescreen() {
    const [activecategory,setactivecategory] = useState('Beef')
    const [allcategories,setallcategories] = useState([])
    const [recipes,setrecipes] = useState([])
    const [searchText, setSearchText] = useState(''); 

    useEffect(()=>{
      getcategories()
      getrecipes()
    },[])

    function handlechangecat(category)
    {
        getrecipes(category)
        setactivecategory(category)
        setrecipes([])
    }

    const getcategories = async ()=>{
      try{
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        if(response && response.data){
          setallcategories(response.data.categories)
        }
      }catch(err){
        console.log("I am categor error")
      }
    }
    const getrecipes = async (category = "Beef") => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        if (response && response.data) {
          setrecipes(response.data.meals);
        } else {
          setrecipes([]);
        }
      } catch (err) {
        console.log("I am recipe error", err);
        setrecipes([]);
      }
    };
    return (
      <>
        <StatusBar  backgroundColor="#ffffff" barStyle="dark-content" />
        {/* this is the top */}
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Image source={require('../assets/avatar.png')} style={{ width: hp(5), height: hp(5) }} />
              <BellIcon size={hp(5)} color={"grey"} />
            </View>
            {/* this the home main font */}
            <View style={{ paddingTop: hp(2)}}>
              <Text style={{ fontSize: hp(2), paddingTop: hp(1),color:"black"}}>Hello, Saad!</Text>
              <Text style={{ fontSize: hp(4), fontStyle: "italic", fontWeight: "bold" ,color:"black"}}>Make your own food,</Text>
              <Text style={{ fontSize: hp(4), fontStyle: "italic", fontWeight: "bold",color:"black" }}
              >stay at <Text style={{ color: "#ff9500" }}>Home</Text>
              </Text>
            </View>
            {/* this is the search bar */}
            <View style={styles.searchone}>
              <TextInput placeholder='Search any recipe' placeholderTextColor={"gray"}
                style={{ fontSize: hp(2.5) ,color:"black"}}  
                value={searchText} // Bind value to searchText
                onChangeText={text => setSearchText(text)} // Update searchText

                />
              <View style={styles.magnifyingglass} >
                <MagnifyingGlassIcon size={hp(4)} color={"grey"} strokeWidth={2} />
              </View>
            </View>

            {/* this is categories */}
            <View>
              {allcategories.length>0 ? <Categories categories={allcategories} activecategory={activecategory} handlechangecat={handlechangecat} />:null} 
            </View>

            {/* this is recipes */}
            <View>
                <Recipes meals={recipes} categories={allcategories} searchText={searchText} /> 

            </View>

            
          </ScrollView>
        </View>
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: hp(0.4),
      flexDirection: 'row',
      justifyContent: "space-between",
    },
    searchone: {
      // padding: hp(0.8),
      flexDirection: "row",
      backgroundColor: "#ebebeb",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: hp(3),
      borderRadius: hp(100),
      width: wp(90), // Responsive width
      height: hp(6),
      marginLeft:hp(0.3),
      marginTop: hp(3), // Adjust the marginTop to fine-tune the positioning
      borderWidth: hp(0.1), // Add a border for debugging
    },
    magnifyingglass: {
      backgroundColor: "white",
      width: hp(5),
      height: hp(5),
      right:hp(0.6),
      borderRadius: hp(100),
      alignItems: "center",
      borderWidth: 1,
      justifyContent: "center",
    }
  });
