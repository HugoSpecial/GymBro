import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useWorkout } from '../Context/WorkoutContext';
import { Exercise, SelectedExercise, SetInput, Workout } from '../types/workout';

type EditWorkoutProps = NativeStackScreenProps<RootStackParamList, 'EditWorkout'>;

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

  const [workoutName, setWorkoutName] = useState(workout.name);
  const [search, setSearch] = useState('');  
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>(
    workout_exercises.map((ex) => {
      const exerciseDetails = typeof ex.exercised === 'string' 
        ? {
            id: ex.exercised,
            name: 'Exercicio',
            muscleGroup: 'Não especificado',
            description: ''
          }
        : {
            ...ex.exercised,
            muscleGroup: ex.exercised.muscleGroup || 'Não especificado',
            description: ex.exercised.description || ''
          };
      
      return {
        exercised: exerciseDetails,
        name: exerciseDetails.name,
        muscleGroup: exerciseDetails.muscleGroup,
        sets: ex.sets.map((set) => ({
          weight: String(set.weight),
          reps: String(set.reps),
        }))
      };
    })
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length > 1) {
        fetchExercises(search);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const addExercise = (exercise: Exercise) => {
    if (!selectedExercises.some(e => e.exerciseId._id === exercise._id)) {
      setSelectedExercises((prev) => [
        ...prev,
        { 
          exerciseId: exercise,
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
          sets: [{ weight: '', reps: '' }] 
        },
      ]);
      setSearch('');
    }
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof SetInput,
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
      updated[exerciseIndex].sets.push({ weight: '', reps: '' });
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
      prev.filter(e => e.exerciseId._id !== exerciseId)
    );
  };

  const handleUpdateWorkout = async () => {
    if (!workoutName.trim()) {
      Alert.alert('Erro', 'Por favor, dê um nome ao seu treino');
      return;
    }

    if (selectedExercises.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um exercício ao treino');
      return;
    }

    const hasInvalidSets = selectedExercises.some((exercise) =>
      exercise.sets.some(
        (set) => isNaN(parseFloat(set.weight)) || isNaN(parseInt(set.reps, 10))
      )
    );

    if (hasInvalidSets) {
      Alert.alert(
        'Erro',
        'Por favor, insira valores válidos para peso e repetições'
      );
      return;
    }

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
          exercises: selectedExercises.map(ex => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets.map(set => ({
              weight: parseFloat(set.weight),
              reps: parseInt(set.reps, 10),
            })),
          })),
        };
        
        Alert.alert('Sucesso', 'Treino atualizado com sucesso!');
        navigation.navigate('WorkoutDetails', { workout: updatedWorkout });
      }
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o treino');
      console.error('Update workout error:', err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
        <Text className="text-white text-2xl font-bold mb-3">
          Editar Treino
        </Text>

        {error && (
          <View className="flex-row justify-between items-center bg-red-900 p-2 mb-2 rounded">
            <Text className="text-red-300">{error}</Text>
            <TouchableOpacity onPress={clearError}>
              <Ionicons name="close" size={20} color="#fca5a5" />
            </TouchableOpacity>
          </View>
        )}

        <View className="mb-4">
          <Text className="text-white text-base font-medium mb-2">
            Nome do Treino
          </Text>
          <TextInput
            className="bg-gray-800 p-3 rounded-lg text-white border border-gray-600"
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Digite o nome do treino"
            placeholderTextColor="#999"
            maxLength={50}
          />
        </View>

        <View className="flex-row items-center mb-2 bg-gray-800 rounded-lg px-3 border border-gray-600">
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            className="flex-1 p-2 text-white"
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar exercício..."
            placeholderTextColor="#999"
            clearButtonMode="while-editing"
          />
        </View>

        {loading && (
          <ActivityIndicator size="small" color="#ef4444" className="my-2" />
        )}

        {search.length > 1 && searchResults.length > 0 && (
          <View className="bg-gray-900 p-2 rounded-lg">
            <Text className="text-white text-base font-bold my-2">
              Resultados
            </Text>
            {searchResults.map((ex) => {
              const isAdded = selectedExercises.some(e => 
                e.exerciseId._id === ex._id
              );
              return (
                <View
                  key={ex._id}
                  className="flex-row justify-between items-center py-3 border-b border-gray-700"
                >
                  <View className="flex-1">
                    <Text className="text-white font-medium">{ex.name}</Text>
                    <Text className="text-gray-400 text-xs">
                      {ex.muscleGroup}
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled={isAdded}
                    onPress={() => addExercise(ex)}
                    className="p-2"
                  >
                    <Ionicons
                      name={isAdded ? "checkmark-circle" : "add-circle"}
                      size={24}
                      color={isAdded ? "#6b7280" : "#ef4444"}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {selectedExercises.length > 0 && (
          <View className="mt-4">
            <Text className="text-white text-base font-bold my-2">
              Exercícios Selecionados
            </Text>
            {selectedExercises.map((ex, exIndex) => (
              <View
                key={`${ex.exerciseId._id}-${exIndex}`}
                className="border border-gray-700 p-3 rounded-lg mb-4 bg-gray-800"
              >
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      {ex.name}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {ex.muscleGroup}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeExercise(ex.exerciseId._id)}
                    className="p-1"
                  >
                    <Ionicons name="trash" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                {ex.sets.map((set, setIndex) => (
                  <View
                    key={`set-${setIndex}`}
                    className="flex-row gap-2 mb-2 items-center"
                  >
                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-2 border border-gray-600">
                      <Ionicons name="barbell" size={16} color="#999" />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="decimal-pad"
                        placeholder="Peso"
                        placeholderTextColor="#666"
                        value={set.weight}
                        onChangeText={(val) =>
                          updateSet(exIndex, setIndex, "weight", val)
                        }
                      />
                      <Text className="text-gray-400 pr-2">kg</Text>
                    </View>

                    <View className="flex-1 flex-row items-center bg-gray-700 rounded-lg px-2 border border-gray-600">
                      <Ionicons name="repeat" size={16} color="#999" />
                      <TextInput
                        className="flex-1 p-2 text-white"
                        keyboardType="number-pad"
                        placeholder="Reps"
                        placeholderTextColor="#666"
                        value={set.reps}
                        onChangeText={(val) =>
                          updateSet(exIndex, setIndex, "reps", val)
                        }
                      />
                    </View>

                    {ex.sets.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeSet(exIndex, setIndex)}
                        className="p-2"
                      >
                        <Ionicons name="remove" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                <TouchableOpacity
                  onPress={() => addSet(exIndex)}
                  className="flex-row items-center justify-center mt-2 py-2 bg-gray-700 rounded-lg"
                >
                  <Ionicons name="add" size={20} color="#ef4444" />
                  <Text className="text-red-500 ml-2 font-medium">
                    Adicionar Série
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={handleUpdateWorkout}
              disabled={loading}
              className={`flex-row items-center justify-center p-4 rounded-xl mt-6 mb-4 ${
                loading ? "bg-gray-600" : "bg-red-600"
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