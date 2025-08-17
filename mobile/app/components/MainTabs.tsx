// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";
// import { View } from "react-native";
// import NewWorkout from "../pages/NewWorkout";

// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#ef4444", 
//         tabBarInactiveTintColor: "#ffffff",
//         tabBarStyle: {
//           backgroundColor: "#000000",
//           borderTopWidth: 0,
//           height: 70, 
//           paddingBottom: 0,
//           elevation: 8,
//         },
//         tabBarLabel: () => null, // Remove os textos
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color, focused }) => (
//             <View className="items-center justify-center flex-1">
//               <Ionicons
//                 name={focused ? "home" : "home-outline"}
//                 color={color}
//                 size={26} 
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="NewWorkout"
//         component={NewWorkout}
//         options={{
//           tabBarIcon: ({ color, focused }) => (
//             <View className="items-center justify-center flex-1">
//               <Ionicons
//                 name={focused ? "add-circle" : "add-circle-outline"}
//                 color={color}
//                 size={26} 
//               />
//             </View>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color, focused }) => (
//             <View className="items-center justify-center flex-1">
//               <Ionicons
//                 name={focused ? "person" : "person-outline"}
//                 color={color}
//                 size={26} 
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import Home from "../pages/Home";
import NewWorkout from "../pages/NewWorkout";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ef4444",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          height: 70,
          elevation: 8,
        },
        tabBarLabel: () => null, // remove textos
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex-1">
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={26}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="NewWorkout"
        component={NewWorkout}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex-1">
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                color={color}
                size={28}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center flex-1">
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={26}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
