// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { useWorkout } from "../Context/WorkoutContext";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   WorkoutDetails: { workout: any };
// };

// const LastThreeWorkouts = () => {
//   const { lastThreeWorkouts } = useWorkout();
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const handlePress = (workout: any) => {
//     navigation.navigate("WorkoutDetails", { workout });
//   };

//   return (
//     <View>
//       <Text className="text-white mb-4 font-semibold text-lg">Últimos 3 treinos:</Text>
//       <View>
//         {lastThreeWorkouts.map((item) => (
//           <TouchableOpacity
//             key={item._id}
//             onPress={() => handlePress(item)}
//             className="mb-4 p-4 bg-gray-800 rounded-lg"
//           >
//             <Text className="text-[#ef4444] font-bold text-lg mb-1">{item.name}</Text>
//             <Text className="text-gray-400 mb-1">{new Date(item.date).toLocaleDateString()}</Text>
//             <Text className="text-gray-400">{item.exercises.length} exercícios</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default LastThreeWorkouts;
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useWorkout } from "../Context/WorkoutContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  WorkoutDetails: { workout: any };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

const LastThreeWorkouts = () => {
  const { lastThreeWorkouts } = useWorkout();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (workout: any) => {
    navigation.navigate("WorkoutDetails", { workout });
  };

  return (
    <View>
      <View>
        {lastThreeWorkouts.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => handlePress(item)}
            className="mb-4 p-4 bg-gray-800 rounded-lg"
          >
            <Text className="text-[#ef4444] font-bold text-lg mb-1">{item.name}</Text>
            <Text className="text-gray-400 mb-1">{formatDate(item.date)}</Text>
            <Text className="text-gray-400">{item.exercises.length} exercícios</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LastThreeWorkouts;