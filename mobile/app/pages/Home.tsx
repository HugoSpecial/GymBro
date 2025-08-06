import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold mb-4">Home</Text>
    </SafeAreaView>
  );
};

export default Home;
