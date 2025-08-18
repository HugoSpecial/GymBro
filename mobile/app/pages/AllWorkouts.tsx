// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { useWorkout } from "../Context/WorkoutContext";

// type RootStackParamList = {
//   WorkoutDetails: { workout: any };
//   MainTabs: undefined;
// };

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// const AllWorkouts = () => {
//   const { workouts } = useWorkout();
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const handlePress = (workout: any) => {
//     navigation.navigate("WorkoutDetails", { workout });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-black">
//       <View className="flex-row items-center justify-between p-4 bg-black border-b border-gray-800">
//         <TouchableOpacity
//           onPress={() => navigation.navigate("MainTabs")}
//           className="flex-row items-center"
//         >
//           <Ionicons name="arrow-back" size={24} color="#ef4444" />
//           <Text className="text-[#ef4444] ml-2 font-semibold">Voltar</Text>
//         </TouchableOpacity>

//         <Text className="text-white text-xl font-bold">Todos os Treinos</Text>
        
//         <View style={{ width: 24 }} /> {/* Espaço vazio para alinhamento */}
//       </View>

//       <ScrollView className="flex-1 p-4">
//         {workouts.length === 0 ? (
//           <View className="flex-1 items-center justify-center mt-10">
//             <Ionicons name="sad-outline" size={48} color="#ef4444" />
//             <Text className="text-gray-400 mt-4 text-lg">
//               Nenhum treino encontrado
//             </Text>
//           </View>
//         ) : (
//           workouts.map((workout) => (
//             <TouchableOpacity
//               key={workout._id}
//               onPress={() => handlePress(workout)}
//               className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
//             >
//               <View className="flex-row justify-between items-start">
//                 <Text className="text-[#ef4444] font-bold text-lg flex-1">
//                   {workout.name}
//                 </Text>
//                 <Ionicons 
//                   name="chevron-forward" 
//                   size={20} 
//                   color="#ef4444" 
//                 />
//               </View>
              
//               <Text className="text-gray-400 mt-2">
//                 {formatDate(workout.date)}
//               </Text>
              
//               <View className="flex-row items-center mt-3">
//                 <Ionicons name="barbell" size={16} color="#ef4444" />
//                 <Text className="text-gray-400 ml-2">
//                   {workout.exercises.length} exercício{workout.exercises.length !== 1 ? 's' : ''}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AllWorkouts;

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useWorkout } from "../Context/WorkoutContext";

type RootStackParamList = {
  WorkoutDetails: { workout: any };
  MainTabs: undefined;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AllWorkouts = () => {
  const { workouts } = useWorkout();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (workout: any) => {
    navigation.navigate("WorkoutDetails", { workout });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4 bg-black border-b border-gray-800">
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs")}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={24} color="#ef4444" />
          <Text className="text-[#ef4444] ml-2 font-semibold">Voltar</Text>
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold">Todos os Treinos</Text>
        
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1 p-4">
        {workouts.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Ionicons name="sad-outline" size={48} color="#ef4444" />
            <Text className="text-gray-400 mt-4 text-lg">
              Nenhum treino encontrado
            </Text>
          </View>
        ) : (
          workouts.map((workout) => (
            <TouchableOpacity
              key={workout._id}
              onPress={() => handlePress(workout)}
              className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <View className="flex-row justify-between items-start">
                <Text className="text-[#ef4444] font-bold text-lg flex-1">
                  {workout.name}
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color="#ef4444" 
                />
              </View>
              
              <Text className="text-gray-400 mt-2">
                {formatDate(workout.date)}
              </Text>
              
              <View className="flex-row items-center mt-3">
                <Ionicons name="barbell" size={16} color="#ef4444" />
                <Text className="text-gray-400 ml-2">
                  {workout.exercises.length} exercício{workout.exercises.length !== 1 ? 's' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllWorkouts;