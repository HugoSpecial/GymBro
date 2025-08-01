import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./app/Context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import RecoverPassword from "./app/pages/RecoverPassword";
import PassOTP from "./app/pages/PassOTP";
import NewPassword from "./app/pages/NewPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <Layout />
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
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Início',
              headerRight: () => (
                <Button 
                  onPress={onLogout} 
                  title="Sair" 
                  color="#FF3B30"
                />
              ),
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPassword}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PassOTP"
              component={PassOTP}
              options={{
                headerShown: false,
                title: 'Verificação OTP'
              }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{
                headerShown: false,
                title: 'Nova Senha'
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};