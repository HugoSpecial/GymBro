import { View, Text } from "react-native";
import React from "react";
import { useUser } from "../Context/UserContext";

const Welcome = () => {
  const { user } = useUser();

  return (
    <View>
      <Text className="text-white text-2xl font-bold mb-1">
        {user ? `Bem-vindo, ${user.name}! 💪` : "Bem-vindo ao nosso app!"}
      </Text>

      <Text className="text-gray-400 mb-6">
        {user
          ? "Pronto para superar o treino de ontem?"
          : "Vamos começar sua jornada!"}
      </Text>
    </View>
  );
};

export default Welcome;
