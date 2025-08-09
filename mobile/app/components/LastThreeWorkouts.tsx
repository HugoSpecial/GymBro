import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useWorkout } from "../Context/WorkoutContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Defina os tipos para sua stack de navegação
type RootStackParamList = {
  WorkoutDetails: { workout: any }; // Você pode substituir 'any' por uma interface mais específica
  // Adicione outras rotas aqui se necessário
};

const LastThreeWorkouts = () => {
  const { lastThreeWorkouts } = useWorkout();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (workout: any) => {
    navigation.navigate("WorkoutDetails", { workout });
  };

  return (
    <View>
      <Text>Últimos 3 treinos:</Text>
      <FlatList
        data={lastThreeWorkouts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
            <Text>{item.exercises.length} exercícios</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LastThreeWorkouts;