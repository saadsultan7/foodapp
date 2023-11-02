import { NavigationContainer } from "@react-navigation/native";
import Homescreen from "./screens/Homescreen";
import Welcomescreen from "./screens/Welcomescreen";
import Detail from "./screens/Detail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const stack = createNativeStackNavigator();
export default function Navigat()
{           

    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
                <stack.Screen name="Welcome" component={Welcomescreen} />
                <stack.Screen name="Detail" component={Detail} />
                <stack.Screen name="Home" component={Homescreen} />
            </stack.Navigator>
        </NavigationContainer>
    )
    
}
