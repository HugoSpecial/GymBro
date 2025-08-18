import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useWorkout } from "../Context/WorkoutContext";

type EditWorkoutProps = NativeStackScreenProps<
  RootStackParamList,
  "EditWorkout"
>;

interface ExerciseDetails {
  _id: string;
  name: string;
  muscleGroup: string;
  description?: string;
}

interface SelectedExercise {
  exerciseId: ExerciseDetails;
  name: string;
  muscleGroup: string;
  sets: {
    weight: string;
    reps: string;
  }[];
}

const EditWorkout: React.FC<EditWorkoutProps> = ({ route, navigation }) => {
  const { workout } = route.params;
  const {
    exercises: searchResults,
    fetchExercises,
    updateWorkout,
    loading,
    error,
    clearError,
  } = useWorkout();

  // estado inicial - usa exerciseDetails se existir
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >(
    workout.exercises.map((ex: any) => {
      const details: ExerciseDetails | undefined = ex.exerciseDetails; // backend devolve aqui
      return {
        exerciseId: details
          ? details
          : {
              _id: ex.exerciseId,
              name: "Exercício",
              muscleGroup: "Não especificado",
              description: "",
            },
        name: details ? details.name : "Exercício",
        muscleGroup: details ? details.muscleGroup : "Não especificado",
        sets: ex.sets.map((set: any) => ({
          weight: String(set.weight),
          reps: String(set.reps),
        })),
      };
    })
  );

  const [workoutName, setWorkoutName] = useState(workout.name);
  const [search, setSearch] = useState("");

  // pesquisa exercícios
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length > 1) {
        fetchExercises(search);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const addExercise = (exercise: ExerciseDetails) => {
    if (!selectedExercises.some((e) => e.exerciseId._id === exercise._id)) {
      setSelectedExercises((prev) => [
        ...prev,
        {
          exerciseId: exercise,
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
          sets: [{ weight: "", reps: "" }],
        },
      ]);
      setSearch("");
    }
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => {
    setSelectedExercises((prev) => {
      const updated = [...prev];
      updated[exerciseIndex].sets[setIndex][field] = value;
      return updated;
    });
  };

  const addSet = (exerciseIndex: number) => {
    setSelectedExercises((prev) => {
      const updated = [...prev];
      updated[exerciseIndex].sets.push({ weight: "", reps: "" });
      return updated;
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setSelectedExercises((prev) => {
      const updated = [...prev];
      if (updated[exerciseIndex].sets.length > 1) {
        updated[exerciseIndex].sets.splice(setIndex, 1);
      }
      return updated;
    });
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.filter((e) => e.exerciseId._id !== exerciseId)
    );
  };

  const handleUpdateWorkout = async () => {
    if (!workoutName.trim()) {
      Alert.alert("Erro", "Por favor, dê um nome ao seu treino");
      return;
    }

    if (selectedExercises.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um exercício ao treino");
      return;
    }

    const hasInvalidSets = selectedExercises.some((exercise) =>
      exercise.sets.some(
        (set) => isNaN(parseFloat(set.weight)) || isNaN(parseInt(set.reps, 10))
      )
    );
    if (hasInvalidSets) {
      Alert.alert(
        "Erro",
        "Por favor, insira valores válidos para peso e repetições"
      );
      return;
    }

    // envia para API sempre só os IDs
    const workoutToUpdate = selectedExercises.map((exercise) => ({
      exerciseId: exercise.exerciseId._id,
      sets: exercise.sets.map((set) => ({
        weight: parseFloat(set.weight),
        reps: parseInt(set.reps, 10),
      })),
    }));

    try {
      const success = await updateWorkout(
        workout._id,
        workoutName,
        workoutToUpdate
      );

      if (success) {
        const updatedWorkout = {
          ...workout,
          name: workoutName,
          exercises: selectedExercises.map((ex) => ({
            exerciseId: ex.exerciseId._id,
            sets: ex.sets.map((set) => ({
              weight: parseFloat(set.weight),
              reps: parseInt(set.reps, 10),
            })),
            exerciseDetails: ex.exerciseId, // mantém populado
          })),
        };

        Alert.alert("Sucesso", "Treino atualizado com sucesso!");
        navigation.navigate("WorkoutDetails", { workout: updatedWorkout });
      }
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o treino");
      console.error("Update workout error:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center"
          >
            <Ionicons name="arrow-back" size={24} color="#ef4444" />
            <Text className="text-[#ef4444] ml-2 font-semibold">Voltar</Text>
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold">Editar Treino</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-900 p-3 rounded-lg mb-4 flex-row justify-between items-center">
            <Text className="text-red-300 flex-1">{error}</Text>
            <TouchableOpacity onPress={clearError}>
              <Ionicons name="close" size={20} color="#fca5a5" />
            </TouchableOpacity>
          </View>
        )}

        {/* Workout Name Input */}
        <View className="mb-6">
          <Text className="text-white text-base font-medium mb-2">
            Nome do Treino
          </Text>
          <TextInput
            className="bg-gray-800 p-4 rounded-lg text-white border border-gray-600"
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Digite o nome do treino"
            placeholderTextColor="#999"
          />
        </View>

        {/* Exercise Search */}
        <View className="flex-row items-center mb-4 bg-gray-800 rounded-lg px-4 border border-gray-600">
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            className="flex-1 p-3 text-white"
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar exercício..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Search Results */}
        {loading && (
          <ActivityIndicator size="small" color="#ef4444" className="my-2" />
        )}

        {search.length > 1 && searchResults.length > 0 && (
          <View className="bg-gray-900 p-3 rounded-lg mb-6">
            <Text className="text-white text-base font-bold mb-3">
              Resultados
            </Text>
            {searchResults.map((exercise) => {
              const isAdded = selectedExercises.some(
                (e) => e.exerciseId._id === exercise._id
              );
              return (
                <View
                  key={exercise._id}
                  className="border-b border-gray-700 py-3"
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-white font-medium">
                        {exercise.name}
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        {exercise.muscleGroup}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => !isAdded && addExercise(exercise)}
                      disabled={isAdded}
                    >
                      <Ionicons
                        name={isAdded ? "checkmark-circle" : "add-circle"}
                        size={24}
                        color={isAdded ? "#6b7280" : "#ef4444"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <View className="mb-6">
            <Text className="text-white text-base font-bold mb-3">
              Exercícios Selecionados
            </Text>

            {selectedExercises.map((exercise, exIndex) => (
              <View
                key={`${exercise.exerciseId._id}-${exIndex}`}
                className="border border-gray-700 p-4 rounded-lg mb-4 bg-gray-800"
              >
                {/* Exercise Header */}
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      {exercise.name}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {exercise.muscleGroup}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeExercise(exercise.exerciseId._id)}
                  >
                    <Ionicons name="trash" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                {/* Sets */}
                {exercise.sets.map((set, setIndex) => (
                  <View
                    key={`set-${setIndex}`}
                    className="flex-row items-center mb-3"
                  >
                    {/* Weight Input */}
                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-3 mr-2 border border-gray-600">
                      <Ionicons
                        name="barbell"
                        size={16}
                        color="#999"
                        className="mr-2"
                      />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="decimal-pad"
                        placeholder="Peso"
                        placeholderTextColor="#666"
                        value={set.weight}
                        onChangeText={(value) =>
                          updateSet(exIndex, setIndex, "weight", value)
                        }
                      />
                      <Text className="text-gray-400">kg</Text>
                    </View>

                    {/* Reps Input */}
                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-3 border border-gray-600">
                      <Ionicons
                        name="repeat"
                        size={16}
                        color="#999"
                        className="mr-2"
                      />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="number-pad"
                        placeholder="Reps"
                        placeholderTextColor="#666"
                        value={set.reps}
                        onChangeText={(value) =>
                          updateSet(exIndex, setIndex, "reps", value)
                        }
                      />
                    </View>

                    {/* Remove Set Button */}
                    {exercise.sets.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeSet(exIndex, setIndex)}
                        className="ml-2 p-2"
                      >
                        <Ionicons name="close" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {/* Add Set Button */}
                <TouchableOpacity
                  onPress={() => addSet(exIndex)}
                  className="flex-row items-center justify-center py-2 bg-gray-700 rounded-lg mt-2"
                >
                  <Ionicons name="add" size={20} color="#ef4444" />
                  <Text className="text-[#ef4444] ml-2 font-medium">
                    Adicionar Série
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleUpdateWorkout}
              disabled={loading}
              className={`flex-row items-center justify-center p-4 rounded-xl ${
                loading ? "bg-gray-600" : "bg-[#ef4444]"
              }`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="save" size={20} color="white" />
                  <Text className="text-white text-lg font-bold ml-2">
                    Salvar Alterações
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditWorkout;
