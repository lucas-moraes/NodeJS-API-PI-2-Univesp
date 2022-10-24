import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home } from "../screens/home";
import { Register } from "../screens/register";

export function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
}
