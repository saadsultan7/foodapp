import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import Animated,{FadeInDown, FadeInLeft, FadeInRight} from 'react-native-reanimated';
import YoutubeIframe from 'react-native-youtube-iframe';
import Loading from '../components/Loading';
export default function Detail(props) {
    let details = props.route.params;
    const [isfavorte,serisfavorte] = useState(false);
    const [meal,setmeal] = useState(null);
    const [load,setloading] = useState(true)
    const navigation = useNavigation();

    useEffect(()=>{
        getmealdata(details.idMeal);
    },[])
    const getmealdata = async (id)=>{
        try{
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            if(response && response.data){
            setmeal(response.data.meals[0])
            setloading(false)
          }
        }catch(err){
          console.log("i am detail error ")
        }
      }
    const ingrediants_index = (meal)=>{
        if(!meal) return [];
        let index = [];
        for(let i = 1 ; i<=20 ; i++)
        {   if(meal['strIngredient'+i])
            index.push(i)
        }
        return index;
    }
    const getvideoid =  (url) => {
            const regex =  /[?&]v=([^&]+)/;
            const match =  url.match(regex);
            if (match && match[1]) {
                return match[1];
            }
            return null;
    };
    return (
        <>
            <ScrollView>
                {/* Set the StatusBar background to translucent */}
                <StatusBar
                    barStyle="dark-content"
                    translucent
                    backgroundColor="transparent"
                    />
                <Animated.View style={{ justifyContent: "center", alignItems: "center", padding: hp(0.5),backgroundColor:"white" }}
                    entering={FadeInDown.duration(1000)}
                >
                        <ImageBackground
                            source={{ uri: details.strMealThumb }}
                            style={{ width: wp(98), height: hp(50), borderRadius: 30, overflow: 'hidden' }}
                        >
                        </ImageBackground>
                    <View style={{ position: 'absolute', top: hp(2), left: wp(2), padding:hp(1.5) ,flexDirection:'row',
                                    alignItems:"center",justifyContent:"space-between", width:hp(41) ,height:hp(8)}}>
                        <TouchableOpacity style={{width:hp(4),height:hp(4),justifyContent:'center',alignItems:'center',
                                                    borderWidth:hp(3),borderRadius:hp(3) ,borderColor:"white" }}
                                                    onPress={()=>navigation.goBack()}    >
                            <ChevronLeftIcon size={hp(4)} color={"#ff9500"} strokeWidth={hp(0.4)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:hp(6),height:hp(6),justifyContent:'center',alignItems:'center',
                                                    borderColor:"white" ,backgroundColor:"white",borderRadius:100}} 
                                                     onPress={()=>{ isfavorte ? serisfavorte(false) : serisfavorte(true)}}>
                            <HeartIcon size={hp(4)} color={isfavorte ? "#ff9500":"grey"} strokeWidth={hp(0.2)} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/*meal description */}
                {
                    load?(
                        <Loading size={hp(2)} />
                        ):
                        (
                            <View style={{flex:1,backgroundColor:"white"}} >
                                {/* name and area */}
                                <View style={{padding:hp(1)}}  >
                                    <Animated.Text style={{fontSize:hp(3.3),fontWeight:"bold",color:"black"}} entering={FadeInLeft.duration(300)}>
                                        {meal?.strMeal}
                                    </Animated.Text>
                                    <Animated.Text style={{fontSize:hp(2.3),color:"black"}} entering={FadeInLeft.duration(600)}>
                                        {meal?.strArea}
                                    </Animated.Text>
                                </View>
                                {/*misc */}
                                <View style={{flex:1,flexDirection:"row",padding:hp(1),justifyContent:"center",alignItems:"center"}}>
                                        <Animated.View style={styles.clock} entering={FadeInDown.duration(400).springify()} >
                                            <View style={styles.insideclock}>
                                                <ClockIcon size={hp(4)} strokeWidth={hp(0.2)} color={"black"}/>
                                            </View>
                                            <Text style={{fontSize:hp(2),fontWeight:"bold",color:"black"}} >35</Text>
                                            <Text style={{fontSize:hp(1.8),fontWeight:"bold",color:"black"}} >mins</Text>
                                        </Animated.View>

                                        <Animated.View style={styles.clock} entering={FadeInDown.duration(400).springify()} >
                                            <View style={styles.insideclock}>
                                                <UserIcon size={hp(4)} strokeWidth={hp(0.2)} color={"black"}/>
                                            </View>
                                            <Text style={{fontSize:hp(2),fontWeight:"bold",color:"black"}} >03</Text>
                                            <Text style={{fontSize:hp(1.4),fontWeight:"bold",color:"black"}} >Servings</Text>
                                        </Animated.View>

                                        <Animated.View style={styles.clock} entering={FadeInDown.duration(400).springify()} >
                                            <View style={styles.insideclock}>
                                                <FireIcon size={hp(4)} strokeWidth={hp(0.2)} color={"black"}/>
                                            </View>
                                            <Text style={{fontSize:hp(2),fontWeight:"bold",color:"black"}} >103</Text>
                                            <Text style={{fontSize:hp(1.8),fontWeight:"bold",color:"black"}} >Cal</Text>
                                        </Animated.View>

                                        <Animated.View style={styles.clock} entering={FadeInDown.duration(400).springify()} >
                                            <View style={styles.insideclock}>
                                                <Square3Stack3DIcon size={hp(4)} strokeWidth={hp(0.2)} color={"black"}/>
                                            </View>
                                            <Text style={{fontSize:hp(2),fontWeight:"bold",color:"black"}} >Easy</Text>
                                            <Text style={{fontSize:hp(1.8),fontWeight:"bold",color:"black"}} ></Text>
                                        </Animated.View>
                                </View>
                                {/*ingrediants */}
                                <Animated.View style={{padding:hp(2)}} entering={FadeInDown.duration(400).springify()} >
                                    <Text style={{fontSize:hp(3),fontWeight:"bold",color:"black"}} >Ingredients</Text>
                                     {ingrediants_index(meal).map(i=>{
                                        return(
                                            <View key={i} style={{padding:hp(0.4),marginLeft:hp(1),flexDirection:"row"}}>
                                                <View style={{margin:hp(0.9),width:hp(1.5),height:hp(1.5),backgroundColor:"orange",
                                                            borderRadius:hp(100)}}>
                                                </View>
                                                <Text style={{fontSize:hp(2),fontWeight:"bold",color:"black"}}>{meal["strMeasure"+i]}  </Text>
                                                <Text style={{fontSize:hp(1.9),color:"black"}}>{meal["strIngredient"+i]}</Text>
                                            </View>       
                                            )
                                        })}
                                </Animated.View>
                            {/*Instructions */}
                            <Animated.View style={{padding:hp(1),left:hp(1)}} entering={FadeInDown.duration(400).springify()} >
                                <Text style={{fontSize:hp(3),fontWeight:"bold",color:"black"}} >Instructions</Text>
                                <Text style={{fontSize:hp(2),color:"black"}} >
                                    {meal?.strInstructions}
                                </Text>
                                
                            </Animated.View>
                            {/*recipe Video */}
                            {
                                meal.strYoutube && (
                                    <View>
                                        <Text style={{color:"black"}}>
                                            Recipe Video
                                        </Text>
                                        <View>
                                            <YoutubeIframe
                                              videoId={getvideoid(meal.strYoutube)}
                                            webViewStyle={{opacity: 0.99}}
                                            play={false}
                                            height={hp(40)} />
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                        )
                }
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    clock:
    { 
        width:hp(8),height:hp(14),backgroundColor:"orange",borderRadius:hp(100),
        justifyContent:"center",alignItems:"center",margin:hp(1)
    },
    insideclock:
        {
            backgroundColor:"white",width:hp(6),height:hp(6),borderRadius:hp(100),
            justifyContent:"center",alignItems:"center",bottom:hp(0.2)
        }
})