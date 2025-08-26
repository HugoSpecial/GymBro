import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type DetailsWorkoutStackParamList = {
  MainTabs: undefined;
  EditWorkout: { workout: Workout };
};

interface ExerciseDetails {
  _id: string;
  name: string;
  muscleGroup?: string;
  description?: string;
}

interface WorkoutSet {
  weight: number;
  reps: number;
}

interface WorkoutExercise {
  exerciseId: string | ExerciseDetails;
  sets: WorkoutSet[];
}

interface Workout {
  _id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
}

interface WorkoutDetailsProps {
  route: {
    params: {
      workout: Workout;
    };
  };
}

const WorkoutDetails = ({ route }: WorkoutDetailsProps) => {
  const { workout } = route.params;

  const getExerciseDetails = (
    exercise: string | ExerciseDetails
  ): ExerciseDetails => {
    if (typeof exercise === "string") {
      return {
        _id: exercise,
        name: "Exercício desconhecido",
        muscleGroup: "Não especificado",
      };
    }
    return exercise;
  };

  const navigation =
    useNavigation<NavigationProp<DetailsWorkoutStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4 bg-black">
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs")}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={24} color="#ef4444" />
          <Text className="text-[#ef4444] ml-2 font-semibold">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditWorkout", { workout })}
          className="bg-[#ef4444] rounded-lg p-3 items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">
            Editar Treino
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-[#ef4444] text-2xl font-bold mb-2">
          {workout.name}
        </Text>
        <Text className="text-gray-400 mb-6">
          Data: {new Date(workout.date).toLocaleDateString()}
        </Text>

        <Text className="text-[#ef4444] text-xl font-bold mb-4">
          Exercícios:
        </Text>

        <View>
          {workout.exercises.map((item, index) => {
            const exercise = getExerciseDetails(item.exerciseId);

            return (
              <View
                key={`${exercise._id}-${index}`}
                className="mb-6 border-b border-gray-700 pb-4"
              >
                <Text className="text-white font-bold text-lg mb-1">
                  Exercício:{" "}
                  <Text className="text-[#ef4444]">{exercise.name}</Text>
                </Text>
                {exercise.muscleGroup && (
                  <Text className="text-gray-400 mb-3">
                    Grupo muscular:{" "}
                    <Text className="text-[#ef4444]">
                      {exercise.muscleGroup}
                    </Text>
                  </Text>
                )}

                {item.sets.map((set, idx) => (
                  <View key={idx} className="flex-row gap-2 mb-3 items-center">
                    {/* Weight display with icon */}
                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-2 border border-gray-600">
                      <Ionicons
                        name="barbell"
                        size={16}
                        color="#ef4444"
                        className="mr-2"
                      />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="decimal-pad"
                        placeholder="Peso"
                        placeholderTextColor="#666"
                        value={String(set.weight)}
                        editable={false}
                      />
                      <Text className="text-gray-400 pr-2">kg</Text>
                    </View>

                    {/* Reps display with icon */}
                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-2 border border-gray-600">
                      <Ionicons
                        name="repeat"
                        size={16}
                        color="#ef4444"
                        className="mr-2"
                      />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="number-pad"
                        placeholder="Reps"
                        placeholderTextColor="#666"
                        value={String(set.reps)}
                        editable={false}
                      />
                      <Text className="text-gray-400 pr-2">reps</Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDetails;