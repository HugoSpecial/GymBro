import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <-- IMPORTANTE
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LastThreeWorkouts from "../components/LastThreeWorkouts";
import Welcome from "../components/Welcome";

const Home = () => {
  type HomeStackParamList = {
    NewWorkout: undefined;
    Workouts: undefined;
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Welcome />

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            onPress={() => navigation.navigate("NewWorkout")}
            className="bg-gray-800 p-4 rounded-lg items-center w-[49%]"
          >
            <Ionicons name="add-circle" size={28} color="#ef4444" />
            <Text className="text-white mt-2 text-center text-sm">
              Novo Treino
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Workouts")}
            className="bg-gray-800 p-4 rounded-lg items-center w-[49%]"
          >
            <Ionicons name="barbell" size={28} color="#facc15" />
            <Text className="text-white mt-2 text-center text-sm">
              Ver Todos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Last Three Workouts */}
        <Text className="text-white text-xl font-bold mb-3">
          Últimos Treinos
        </Text>
        <LastThreeWorkouts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
