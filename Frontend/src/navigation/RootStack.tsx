import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfesionalesScreen from "../screens/ProfesionalesScreen"
import ProfesionalDetailScreen from "../screens/ProfesionalDetailScreen"

export type RootStackParamList = {
  Profesionales: undefined
  ProfesionalDetail: { id: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profesionales">
        <Stack.Screen
          name="Profesionales"
          component={ProfesionalesScreen}
          options={{ title: "Lista de Profesionales" }}
        />
        <Stack.Screen
          name="ProfesionalDetail"
          component={ProfesionalDetailScreen}
          options={{ title: "Detalle del Profesional" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack

