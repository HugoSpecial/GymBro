import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const { onLogout } = useAuth();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold mb-4">Home</Text>
      <Button
        title="Logout"
        color="#841584"
        accessibilityLabel="Logout"
        onPress={onLogout}
      />
    </SafeAreaView>
  );
};

export default Home;
