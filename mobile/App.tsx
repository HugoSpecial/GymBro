// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { AuthProvider, useAuth } from "./app/Context/AuthContext";
// import { UserProvider } from "./app/Context/UserContext";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationOptions,
// } from "@react-navigation/native-stack";
// import Login from "./app/pages/Login";
// import Register from "./app/pages/Register";
// import RecoverPassword from "./app/pages/RecoverPassword";
// import PassOTP from "./app/pages/PassOTP";
// import NewPassword from "./app/pages/NewPassword";
// import MainTabs from "./app/components/MainTabs";
// import ProfileEdit from "./app/pages/ProfileEdit";
// import { WorkoutProvider } from "./app/Context/WorkoutContext";
// import WorkoutDetails from "./app/pages/DetailsWorkout";
// import EditWorkout from "./app/pages/EditWorkout";
// import AllWorkouts from "./app/pages/AllWorkouts";
// import "./global.css";

// // Definindo os tipos das rotas
// export type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   RecoverPassword: undefined;
//   PassOTP: undefined;
//   NewPassword: undefined;
//   MainTabs: undefined;
//   ProfileEdit: undefined;
//   WorkoutDetails: { workout: Workout };
//   EditWorkout: { workout: Workout };
//   Workouts: undefined;
// };

// interface Workout {
//   _id: string;
//   name: string;
//   date: string;
//   exercises: Array<{
//     exerciseId: string | { _id: string; name: string };
//     sets: Array<{
//       weight: number;
//       reps: number;
//     }>;
//   }>;
// }

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <>
//       <StatusBar style="light" />
//       <AuthProvider>
//         <UserProvider>
//           <WorkoutProvider>
//             <Layout />
//           </WorkoutProvider>
//         </UserProvider>
//       </AuthProvider>
//     </>
//   );
// }

// export const Layout = () => {
//   const { authState } = useAuth();

//   // Opções comuns de header
//   const commonHeaderOptions: NativeStackNavigationOptions = {
//     headerStyle: {
//       backgroundColor: "#ff6347",
//     },
//     headerTitleStyle: {
//       fontWeight: "bold",
//     },
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={commonHeaderOptions}>
//         {authState?.authenticated ? (
//           <>
//             <Stack.Screen
//               name="MainTabs"
//               component={MainTabs}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="ProfileEdit"
//               component={ProfileEdit}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="WorkoutDetails"
//               component={WorkoutDetails}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="EditWorkout"
//               component={EditWorkout}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Workouts"
//               component={AllWorkouts}
//               options={{ headerShown: false }}
//             />
//           </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="Login"
//               component={Login}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Register"
//               component={Register}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="RecoverPassword"
//               component={RecoverPassword}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="PassOTP"
//               component={PassOTP}
//               options={{
//                 headerShown: false,
//                 title: "Verificação OTP",
//               }}
//             />
//             <Stack.Screen
//               name="NewPassword"
//               component={NewPassword}
//               options={{
//                 headerShown: false,
//                 title: "Nova Senha",
//               }}
//             />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// // // import { StatusBar } from "expo-status-bar";
// // // import React from "react";
// // // import { AuthProvider, useAuth } from "./app/Context/AuthContext";
// // // import { UserProvider } from "./app/Context/UserContext";
// // // import { NavigationContainer } from "@react-navigation/native";
// // // import {
// // //   createNativeStackNavigator,
// // //   NativeStackNavigationOptions,
// // // } from "@react-navigation/native-stack";
// // // import Login from "./app/pages/Login";
// // // import Register from "./app/pages/Register";
// // // import RecoverPassword from "./app/pages/RecoverPassword";
// // // import PassOTP from "./app/pages/PassOTP";
// // // import NewPassword from "./app/pages/NewPassword";
// // // import MainTabs from "./app/components/MainTabs";
// // // import ProfileEdit from "./app/pages/ProfileEdit";
// // // import { WorkoutProvider } from "./app/Context/WorkoutContext";
// // // import WorkoutDetails from "./app/pages/DetailsWorkout";
// // // import EditWorkout from "./app/pages/EditWorkout";
// // // import AllWorkouts from "./app/pages/AllWorkouts";
// // // import "./global.css";

// // // // Definindo os tipos das rotas
// // // export type RootStackParamList = {
// // //   Login: undefined;
// // //   Register: undefined;
// // //   RecoverPassword: undefined;
// // //   PassOTP: undefined;
// // //   NewPassword: undefined;
// // //   MainTabs: undefined;
// // //   ProfileEdit: undefined;
// // //   WorkoutDetails: { workout: Workout };
// // //   EditWorkout: { workout: Workout };
// // //   Workouts: undefined;
// // // };

// // // interface Workout {
// // //   _id: string;
// // //   name: string;
// // //   date: string;
// // //   exercises: Array<{
// // //     exerciseId: string | { _id: string; name: string };
// // //     sets: Array<{
// // //       weight: number;
// // //       reps: number;
// // //     }>;
// // //   }>;
// // // }

// // // const Stack = createNativeStackNavigator<RootStackParamList>();

// // // export default function App() {
// // //   return (
// // //     <>
// // //       <StatusBar style="light" />
// // //       <AuthProvider>
// // //         <UserProvider>
// // //           <WorkoutProvider>
// // //             <Layout />
// // //           </WorkoutProvider>
// // //         </UserProvider>
// // //       </AuthProvider>
// // //     </>
// // //   );
// // // }

// // // export const Layout = () => {
// // //   const { authState } = useAuth();

// // //   // Opções comuns de header
// // //   const commonHeaderOptions: NativeStackNavigationOptions = {
// // //     headerStyle: {
// // //       backgroundColor: "#ff6347",
// // //     },
// // //     headerTitleStyle: {
// // //       fontWeight: "bold",
// // //     },
// // //   };

// // //   return (
// // //     <NavigationContainer>
// // //       <Stack.Navigator screenOptions={commonHeaderOptions}>
// // //         {authState?.authenticated ? (
// // //           <>
// // //             <Stack.Screen
// // //               name="MainTabs"
// // //               component={MainTabs}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="ProfileEdit"
// // //               component={ProfileEdit}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="WorkoutDetails"
// // //               component={WorkoutDetails}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="EditWorkout"
// // //               component={EditWorkout}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="Workouts"
// // //               component={AllWorkouts}
// // //               options={{ headerShown: false }}
// // //             />
// // //           </>
// // //         ) : (
// // //           <>
// // //             <Stack.Screen
// // //               name="Login"
// // //               component={Login}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="Register"
// // //               component={Register}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="RecoverPassword"
// // //               component={RecoverPassword}
// // //               options={{ headerShown: false }}
// // //             />
// // //             <Stack.Screen
// // //               name="PassOTP"
// // //               component={PassOTP}
// // //               options={{
// // //                 headerShown: false,
// // //                 title: "Verificação OTP",
// // //               }}
// // //             />
// // //             <Stack.Screen
// // //               name="NewPassword"
// // //               component={NewPassword}
// // //               options={{
// // //                 headerShown: false,
// // //                 title: "Nova Senha",
// // //               }}
// // //             />
// // //           </>
// // //         )}
// // //       </Stack.Navigator>
// // //     </NavigationContainer>
// // //   );
// // // };

// // import { StatusBar } from "expo-status-bar";
// // import React from "react";
// // import { View, ActivityIndicator } from "react-native";
// // import { AuthProvider, useAuth } from "./app/Context/AuthContext";
// // import { UserProvider } from "./app/Context/UserContext";
// // import { NavigationContainer } from "@react-navigation/native";
// // import {
// //   createNativeStackNavigator,
// //   NativeStackNavigationOptions,
// // } from "@react-navigation/native-stack";
// // import Login from "./app/pages/Login";
// // import Register from "./app/pages/Register";
// // import RecoverPassword from "./app/pages/RecoverPassword";
// // import PassOTP from "./app/pages/PassOTP";
// // import NewPassword from "./app/pages/NewPassword";
// // import MainTabs from "./app/components/MainTabs";
// // import ProfileEdit from "./app/pages/ProfileEdit";
// // import { WorkoutProvider } from "./app/Context/WorkoutContext";
// // import WorkoutDetails from "./app/pages/DetailsWorkout";
// // import EditWorkout from "./app/pages/EditWorkout";
// // import AllWorkouts from "./app/pages/AllWorkouts";
// // import "./global.css";

// // // Definindo os tipos das rotas
// // export type RootStackParamList = {
// //   Login: undefined;
// //   Register: undefined;
// //   RecoverPassword: undefined;
// //   PassOTP: undefined;
// //   NewPassword: undefined;
// //   MainTabs: undefined;
// //   ProfileEdit: undefined;
// //   WorkoutDetails: { workout: Workout };
// //   EditWorkout: { workout: Workout };
// //   Workouts: undefined;
// // };

// // interface Workout {
// //   _id: string;
// //   name: string;
// //   date: string;
// //   exercises: Array<{
// //     exerciseId: string | { _id: string; name: string };
// //     sets: Array<{
// //       weight: number;
// //       reps: number;
// //     }>;
// //   }>;
// // }

// // const Stack = createNativeStackNavigator<RootStackParamList>();

// // // Tela de loading (enquanto verifica token no SecureStore)
// // const LoadingScreen = () => (
// //   <View
// //     style={{
// //       flex: 1,
// //       justifyContent: "center",
// //       alignItems: "center",
// //       backgroundColor: "#fff",
// //     }}
// //   >
// //     <ActivityIndicator size="large" color="#ff6347" />
// //   </View>
// // );

// // export default function App() {
// //   return (
// //     <>
// //       <StatusBar style="light" />
// //       <AuthProvider>
// //         <UserProvider>
// //           <WorkoutProvider>
// //             <Layout />
// //           </WorkoutProvider>
// //         </UserProvider>
// //       </AuthProvider>
// //     </>
// //   );
// // }

// // export const Layout = () => {
// //   const { authState } = useAuth();

// //   // Opções comuns de header
// //   const commonHeaderOptions: NativeStackNavigationOptions = {
// //     headerStyle: {
// //       backgroundColor: "#ff6347",
// //     },
// //     headerTitleStyle: {
// //       fontWeight: "bold",
// //     },
// //   };

// //   // enquanto o token está a ser carregado
// //   if (authState.authenticated === null) {
// //     return <LoadingScreen />;
// //   }

// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator screenOptions={commonHeaderOptions}>
// //         {authState.authenticated ? (
// //           // Rotas privadas
// //           <>
// //             <Stack.Screen
// //               name="MainTabs"
// //               component={MainTabs}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="ProfileEdit"
// //               component={ProfileEdit}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="WorkoutDetails"
// //               component={WorkoutDetails}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="EditWorkout"
// //               component={EditWorkout}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="Workouts"
// //               component={AllWorkouts}
// //               options={{ headerShown: false }}
// //             />
// //           </>
// //         ) : (
// //           // Rotas públicas
// //           <>
// //             <Stack.Screen
// //               name="Login"
// //               component={Login}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="Register"
// //               component={Register}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="RecoverPassword"
// //               component={RecoverPassword}
// //               options={{ headerShown: false }}
// //             />
// //             <Stack.Screen
// //               name="PassOTP"
// //               component={PassOTP}
// //               options={{
// //                 headerShown: false,
// //                 title: "Verificação OTP",
// //               }}
// //             />
// //             <Stack.Screen
// //               name="NewPassword"
// //               component={NewPassword}
// //               options={{
// //                 headerShown: false,
// //                 title: "Nova Senha",
// //               }}
// //             />
// //           </>
// //         )}
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./app/Context/AuthContext";
import { UserProvider } from "./app/Context/UserContext";
import { WorkoutProvider } from "./app/Context/WorkoutContext";

import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import RecoverPassword from "./app/pages/RecoverPassword";
import PassOTP from "./app/pages/PassOTP";
import NewPassword from "./app/pages/NewPassword";
import MainTabs from "./app/components/MainTabs";
import ProfileEdit from "./app/pages/ProfileEdit";
import WorkoutDetails from "./app/pages/DetailsWorkout";
import EditWorkout from "./app/pages/EditWorkout";
import AllWorkouts from "./app/pages/AllWorkouts";

import "./global.css";

// Tipagem das rotas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  PassOTP: undefined;
  NewPassword: undefined;
  MainTabs: undefined;
  ProfileEdit: undefined;
  WorkoutDetails: { workout: Workout };
  EditWorkout: { workout: Workout };
  Workouts: undefined;
};

interface Workout {
  _id: string;
  name: string;
  date: string;
  exercises: Array<{
    exerciseId: string | { _id: string; name: string };
    sets: Array<{ weight: number; reps: number }>;
  }>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

// Tela de loading (quando verifica token no SecureStore)
const LoadingScreen = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <ActivityIndicator size="large" color="#ef4444" />
  </View>
);

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
  const { authState } = useAuth();

  const commonHeaderOptions: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: "#ff6347" },
    headerTitleStyle: { fontWeight: "bold" },
  };

  // ainda carregando token
  if (authState.authenticated === null) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        {authState.authenticated ? (
          // Rotas privadas
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
            <Stack.Screen
              name="EditWorkout"
              component={EditWorkout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Workouts"
              component={AllWorkouts}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Rotas públicas
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
