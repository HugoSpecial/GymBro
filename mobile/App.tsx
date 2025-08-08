import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider, useAuth } from "./app/Context/AuthContext";
import { UserProvider } from "./app/Context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import RecoverPassword from "./app/pages/RecoverPassword";
import PassOTP from "./app/pages/PassOTP";
import NewPassword from "./app/pages/NewPassword";
import "./global.css";
import MainTabs from "./app/components/MainTabs";
import ProfileEdit from "./app/pages/ProfileEdit";
import { WorkoutProvider } from "./app/Context/WorkoutContext";

const Stack = createNativeStackNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
              options={{
                title: "Editar Perfil",
                headerStyle: {
                  backgroundColor: "#f5f5f5",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPassword}
              options={{
                headerShown: false,
              }}
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
