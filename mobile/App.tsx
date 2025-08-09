import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider, useAuth } from "./app/Context/AuthContext";
import { UserProvider } from "./app/Context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import RecoverPassword from "./app/pages/RecoverPassword";
import PassOTP from "./app/pages/PassOTP";
import NewPassword from "./app/pages/NewPassword";
import "./global.css";
import MainTabs from "./app/components/MainTabs";
import ProfileEdit from "./app/pages/ProfileEdit";
import { WorkoutProvider } from "./app/Context/WorkoutContext";
import WorkoutDetails from "./app/pages/DetailsWorkout";

// Definindo os tipos das rotas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  PassOTP: undefined;
  NewPassword: undefined;
  MainTabs: undefined;
  ProfileEdit: undefined;
  WorkoutDetails: { workout: Workout };
};

// Tipo para o workout (deve corresponder ao usado em WorkoutDetails)
interface Workout {
  _id: string;
  name: string;
  date: string;
  exercises: Array<{
    exerciseId: string;
    sets: Array<{
      weight: number;
      reps: number;
    }>;
  }>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <UserProvider>
          <WorkoutProvider>
            <Layout />
          </WorkoutProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  
  // Opções comuns de header
  const commonHeaderOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: "#ff6347", // Cor de fundo do header
    },
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileEdit"
              component={ProfileEdit}
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="WorkoutDetails"
              component={WorkoutDetails}
              options={{ headerShown: false }}

            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PassOTP"
              component={PassOTP}
              options={{
                headerShown: false,
                title: "Verificação OTP",
              }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{
                headerShown: false,
                title: "Nova Senha",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};