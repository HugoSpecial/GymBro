import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LastThreeWorkouts from "../components/LastThreeWorkouts"; // ajuste o caminho se necessário

const Home = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold mb-4">Home</Text>
      <LastThreeWorkouts />
    </SafeAreaView>
  );
};

export default Home;
