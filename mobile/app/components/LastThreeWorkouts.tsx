import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    <View className="mb-6">
      <Text className="text-white mb-4 font-bold text-xl">Últimos Treinos</Text>
      
      {lastThreeWorkouts.length === 0 ? (
        <View className="bg-gray-800 p-4 rounded-lg border border-gray-700 items-center">
          <Ionicons name="barbell-outline" size={24} color="#ef4444" />
          <Text className="text-gray-400 mt-2">Nenhum treino recente</Text>
        </View>
      ) : (
        <View className="space-y-4">
          {lastThreeWorkouts.map((workout) => (
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
          ))}
        </View>
      )}
    </View>
  );
};

export default LastThreeWorkouts;