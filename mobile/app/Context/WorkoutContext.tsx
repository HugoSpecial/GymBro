// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useState,
// // //   useEffect,
// // //   ReactNode,
// // // } from "react";

// // // // Types based on your backend models
// // // interface Exercise {
// // //   _id: string;
// // //   name: string;
// // //   muscleGroup: string;
// // //   description?: string;
// // // }

// // // interface WorkoutSet {
// // //   weight: number;
// // //   reps: number;
// // // }

// // // interface WorkoutExercise {
// // //   exerciseId: string | Exercise;
// // //   sets: WorkoutSet[];
// // // }

// // // interface Workout {
// // //   _id: string;
// // //   user: string;
// // //   date: string;
// // //   exercises: WorkoutExercise[];
// // // }

// // // interface WorkoutStats {
// // //   totalWorkouts: number;
// // //   totalExercises: number;
// // //   totalSets: number;
// // //   totalReps: number;
// // //   totalWeight: number;
// // //   averageWorkoutsPerWeek: number;
// // //   favoriteExercises: { name: string; count: number }[];
// // //   muscleGroupDistribution: { [key: string]: number };
// // //   recentWorkouts: Workout[];
// // //   personalRecords: { exerciseName: string; maxWeight: number; date: string }[];
// // // }

// // // interface WorkoutContextType {
// // //   // State
// // //   workouts: Workout[];
// // //   exercises: Exercise[];
// // //   loading: boolean;
// // //   error: string | null;
// // //   stats: WorkoutStats;

// // //   // Workout operations
// // //   fetchWorkouts: () => Promise<void>;
// // //   createWorkout: (
// // //     exercises: Omit<WorkoutExercise, "exerciseId"> & { exerciseId: string }[]
// // //   ) => Promise<boolean>;
// // //   deleteWorkout: (id: string) => Promise<boolean>;

// // //   // Exercise operations
// // //   fetchExercises: (search?: string) => Promise<void>;
// // //   createExercise: (exercise: Omit<Exercise, "_id">) => Promise<boolean>;
// // //   createManyExercises: (exercises: Omit<Exercise, "_id">[]) => Promise<boolean>;

// // //   // Utility functions
// // //   refreshData: () => Promise<void>;
// // //   clearError: () => void;
// // // }

// // // const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// // // export const useWorkout = () => {
// // //   const context = useContext(WorkoutContext);
// // //   if (context === undefined) {
// // //     throw new Error("useWorkout must be used within a WorkoutProvider");
// // //   }
// // //   return context;
// // // };

// // // interface WorkoutProviderProps {
// // //   children: ReactNode;
// // // }

// // // export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({
// // //   children,
// // // }) => {
// // //   const [workouts, setWorkouts] = useState<Workout[]>([]);
// // //   const [exercises, setExercises] = useState<Exercise[]>([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // API base URL - adjust according to your setup
// // //   const API_BASE ="http://localhost:4000/api";

// // //   // Generic API call function
// // //   const apiCall = async (endpoint: string, options: RequestInit = {}) => {
// // //     const response = await fetch(`${API_BASE}${endpoint}`, {
// // //       credentials: "include", // Include cookies for authentication
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         ...options.headers,
// // //       },
// // //       ...options,
// // //     });

// // //     if (!response.ok) {
// // //       const errorData = await response
// // //         .json()
// // //         .catch(() => ({ message: "Network error" }));
// // //       throw new Error(
// // //         errorData.message || `HTTP error! status: ${response.status}`
// // //       );
// // //     }

// // //     return response.json();
// // //   };

// // //   // Fetch workouts
// // //   const fetchWorkouts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await apiCall("/workouts/my-workouts");
// // //       if (data.success) {
// // //         setWorkouts(data.workouts);
// // //       }
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to fetch workouts");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Create workout
// // //   const createWorkout = async (
// // //     exercises: Omit<WorkoutExercise, "exerciseId"> & { exerciseId: string }[]
// // //   ): Promise<boolean> => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await apiCall("/workouts/create", {
// // //         method: "POST",
// // //         body: JSON.stringify({ exercises }),
// // //       });

// // //       if (data.success) {
// // //         await fetchWorkouts(); // Refresh workouts
// // //         return true;
// // //       }
// // //       return false;
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to create workout");
// // //       return false;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Delete workout
// // //   const deleteWorkout = async (id: string): Promise<boolean> => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await apiCall(`/workouts/delete/${id}`, {
// // //         method: "DELETE",
// // //       });

// // //       if (data.success) {
// // //         setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
// // //         return true;
// // //       }
// // //       return false;
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to delete workout");
// // //       return false;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Fetch exercises
// // //   const fetchExercises = async (search?: string) => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const endpoint = search
// // //         ? `/exercises?search=${encodeURIComponent(search)}`
// // //         : "/exercises";
// // //       const data = await apiCall(endpoint);

// // //       if (data.success) {
// // //         setExercises(data.exercises);
// // //       }
// // //     } catch (err) {
// // //       setError(
// // //         err instanceof Error ? err.message : "Failed to fetch exercises"
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Create exercise
// // //   const createExercise = async (
// // //     exercise: Omit<Exercise, "_id">
// // //   ): Promise<boolean> => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await apiCall("/exercises", {
// // //         method: "POST",
// // //         body: JSON.stringify(exercise),
// // //       });

// // //       if (data.success) {
// // //         await fetchExercises(); // Refresh exercises
// // //         return true;
// // //       }
// // //       return false;
// // //     } catch (err) {
// // //       setError(
// // //         err instanceof Error ? err.message : "Failed to create exercise"
// // //       );
// // //       return false;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Create many exercises
// // //   const createManyExercises = async (
// // //     exercises: Omit<Exercise, "_id">[]
// // //   ): Promise<boolean> => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const data = await apiCall("/exercises/bulk", {
// // //         method: "POST",
// // //         body: JSON.stringify({ exercises }),
// // //       });

// // //       if (data.success) {
// // //         await fetchExercises(); // Refresh exercises
// // //         return true;
// // //       }
// // //       return false;
// // //     } catch (err) {
// // //       setError(
// // //         err instanceof Error ? err.message : "Failed to create exercises"
// // //       );
// // //       return false;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Calculate comprehensive stats
// // //   const calculateStats = (): WorkoutStats => {
// // //     const totalWorkouts = workouts.length;
// // //     const totalExercises = exercises.length;

// // //     let totalSets = 0;
// // //     let totalReps = 0;
// // //     let totalWeight = 0;
// // //     const exerciseCount: { [key: string]: number } = {};
// // //     const muscleGroupCount: { [key: string]: number } = {};
// // //     const exerciseMaxWeights: {
// // //       [key: string]: { weight: number; date: string };
// // //     } = {};

// // //     workouts.forEach((workout) => {
// // //       workout.exercises.forEach((exercise) => {
// // //         const exerciseData =
// // //           typeof exercise.exerciseId === "string"
// // //             ? exercises.find((e) => e._id === exercise.exerciseId)
// // //             : exercise.exerciseId;

// // //         if (exerciseData) {
// // //           // Count exercise usage
// // //           exerciseCount[exerciseData.name] =
// // //             (exerciseCount[exerciseData.name] || 0) + 1;

// // //           // Count muscle groups
// // //           muscleGroupCount[exerciseData.muscleGroup] =
// // //             (muscleGroupCount[exerciseData.muscleGroup] || 0) + 1;

// // //           exercise.sets.forEach((set) => {
// // //             totalSets++;
// // //             totalReps += set.reps;
// // //             totalWeight += set.weight * set.reps;

// // //             // Track personal records
// // //             const currentMax = exerciseMaxWeights[exerciseData.name];
// // //             if (!currentMax || set.weight > currentMax.weight) {
// // //               exerciseMaxWeights[exerciseData.name] = {
// // //                 weight: set.weight,
// // //                 date: workout.date,
// // //               };
// // //             }
// // //           });
// // //         }
// // //       });
// // //     });

// // //     // Calculate average workouts per week
// // //     const now = new Date();
// // //     const firstWorkoutDate =
// // //       workouts.length > 0
// // //         ? new Date(Math.min(...workouts.map((w) => new Date(w.date).getTime())))
// // //         : now;
// // //     const weeksDiff = Math.max(
// // //       1,
// // //       Math.ceil(
// // //         (now.getTime() - firstWorkoutDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
// // //       )
// // //     );
// // //     const averageWorkoutsPerWeek = totalWorkouts / weeksDiff;

// // //     // Get favorite exercises (top 5)
// // //     const favoriteExercises = Object.entries(exerciseCount)
// // //       .sort(([, a], [, b]) => b - a)
// // //       .slice(0, 5)
// // //       .map(([name, count]) => ({ name, count }));

// // //     // Get recent workouts (last 5)
// // //     const recentWorkouts = [...workouts]
// // //       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
// // //       .slice(0, 5);

// // //     // Get personal records
// // //     const personalRecords = Object.entries(exerciseMaxWeights)
// // //       .map(([exerciseName, { weight, date }]) => ({
// // //         exerciseName,
// // //         maxWeight: weight,
// // //         date,
// // //       }))
// // //       .sort((a, b) => b.maxWeight - a.maxWeight);

// // //     return {
// // //       totalWorkouts,
// // //       totalExercises,
// // //       totalSets,
// // //       totalReps,
// // //       totalWeight,
// // //       averageWorkoutsPerWeek,
// // //       favoriteExercises,
// // //       muscleGroupDistribution: muscleGroupCount,
// // //       recentWorkouts,
// // //       personalRecords,
// // //     };
// // //   };

// // //   // Refresh all data
// // //   const refreshData = async () => {
// // //     await Promise.all([fetchWorkouts(), fetchExercises()]);
// // //   };

// // //   // Clear error
// // //   const clearError = () => setError(null);

// // //   // Calculate stats whenever workouts or exercises change
// // //   const stats = calculateStats();

// // //   // Initial data fetch
// // //   useEffect(() => {
// // //     refreshData();
// // //   }, []);

// // //   const value: WorkoutContextType = {
// // //     workouts,
// // //     exercises,
// // //     loading,
// // //     error,
// // //     stats,
// // //     fetchWorkouts,
// // //     createWorkout,
// // //     deleteWorkout,
// // //     fetchExercises,
// // //     createExercise,
// // //     createManyExercises,
// // //     refreshData,
// // //     clearError,
// // //   };

// // //   return (
// // //     <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
// // //   );
// // // };

// // // export default WorkoutContext;

// // import React, {
// //     createContext,
// //     useContext,
// //     useState,
// //     useEffect,
// //     ReactNode,
// //   } from "react";
  
// //   // Types based on your backend models
// //   interface Exercise {
// //     _id: string;
// //     name: string;
// //     muscleGroup: string;
// //     description?: string;
// //   }
  
// //   interface WorkoutSet {
// //     weight: number;
// //     reps: number;
// //   }
  
// //   interface WorkoutExercise {
// //     exerciseId: string;
// //     sets: WorkoutSet[];
// //   }
  
// //   interface Workout {
// //     _id: string;
// //     user: string;
// //     date: string;
// //     exercises: WorkoutExercise[];
// //   }
  
// //   interface WorkoutStats {
// //     totalWorkouts: number;
// //     totalExercises: number;
// //     totalSets: number;
// //     totalReps: number;
// //     totalWeight: number;
// //     averageWorkoutsPerWeek: number;
// //     favoriteExercises: { name: string; count: number }[];
// //     muscleGroupDistribution: { [key: string]: number };
// //     recentWorkouts: Workout[];
// //     personalRecords: { exerciseName: string; maxWeight: number; date: string }[];
// //   }
  
// //   interface WorkoutContextType {
// //     // State
// //     workouts: Workout[];
// //     exercises: Exercise[];
// //     loading: boolean;
// //     error: string | null;
// //     stats: WorkoutStats;
  
// //     // Workout operations
// //     fetchWorkouts: () => Promise<void>;
// //     createWorkout: (exercises: WorkoutExercise[]) => Promise<boolean>;
// //     deleteWorkout: (id: string) => Promise<boolean>;
  
// //     // Exercise operations
// //     fetchExercises: (search?: string) => Promise<void>;
// //     createExercise: (exercise: Omit<Exercise, "_id">) => Promise<boolean>;
// //     createManyExercises: (exercises: Omit<Exercise, "_id">[]) => Promise<boolean>;
  
// //     // Utility functions
// //     refreshData: () => Promise<void>;
// //     clearError: () => void;
// //   }
  
// //   const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
  
// //   export const useWorkout = () => {
// //     const context = useContext(WorkoutContext);
// //     if (context === undefined) {
// //       throw new Error("useWorkout must be used within a WorkoutProvider");
// //     }
// //     return context;
// //   };
  
// //   interface WorkoutProviderProps {
// //     children: ReactNode;
// //   }
  
// //   export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({
// //     children,
// //   }) => {
// //     const [workouts, setWorkouts] = useState<Workout[]>([]);
// //     const [exercises, setExercises] = useState<Exercise[]>([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);
  
// //     // API base URL - adjust according to your setup
// //     const API_BASE = "http://localhost:4000/api";
  
// //     // Generic API call function
// //     const apiCall = async (endpoint: string, options: RequestInit = {}) => {
// //       const response = await fetch(`${API_BASE}${endpoint}`, {
// //         credentials: "include", // Include cookies for authentication
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...options.headers,
// //         },
// //         ...options,
// //       });
  
// //       if (!response.ok) {
// //         const errorData = await response
// //           .json()
// //           .catch(() => ({ message: "Network error" }));
// //         throw new Error(
// //           errorData.message || `HTTP error! status: ${response.status}`
// //         );
// //       }
  
// //       return response.json();
// //     };
  
// //     // Fetch workouts
// //     const fetchWorkouts = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const data = await apiCall("/workouts/my-workouts");
// //         if (data.success) {
// //           setWorkouts(data.workouts);
// //         }
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Failed to fetch workouts");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Create workout
// //     const createWorkout = async (exercises: WorkoutExercise[]): Promise<boolean> => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const data = await apiCall("/workouts/create", {
// //           method: "POST",
// //           body: JSON.stringify({ exercises }),
// //         });
  
// //         if (data.success) {
// //           await fetchWorkouts(); // Refresh workouts
// //           return true;
// //         }
// //         return false;
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Failed to create workout");
// //         return false;
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Delete workout
// //     const deleteWorkout = async (id: string): Promise<boolean> => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const data = await apiCall(`/workouts/delete/${id}`, {
// //           method: "DELETE",
// //         });
  
// //         if (data.success) {
// //           setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
// //           return true;
// //         }
// //         return false;
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Failed to delete workout");
// //         return false;
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Fetch exercises
// //     const fetchExercises = async (search?: string) => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const endpoint = search
// //           ? `/exercises?search=${encodeURIComponent(search)}`
// //           : "/exercises";
// //         const data = await apiCall(endpoint);
  
// //         if (data.success) {
// //           setExercises(data.exercises);
// //         }
// //       } catch (err) {
// //         setError(
// //           err instanceof Error ? err.message : "Failed to fetch exercises"
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Create exercise
// //     const createExercise = async (
// //       exercise: Omit<Exercise, "_id">
// //     ): Promise<boolean> => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const data = await apiCall("/exercises", {
// //           method: "POST",
// //           body: JSON.stringify(exercise),
// //         });
  
// //         if (data.success) {
// //           await fetchExercises(); // Refresh exercises
// //           return true;
// //         }
// //         return false;
// //       } catch (err) {
// //         setError(
// //           err instanceof Error ? err.message : "Failed to create exercise"
// //         );
// //         return false;
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Create many exercises
// //     const createManyExercises = async (
// //       exercises: Omit<Exercise, "_id">[]
// //     ): Promise<boolean> => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const data = await apiCall("/exercises/bulk", {
// //           method: "POST",
// //           body: JSON.stringify({ exercises }),
// //         });
  
// //         if (data.success) {
// //           await fetchExercises(); // Refresh exercises
// //           return true;
// //         }
// //         return false;
// //       } catch (err) {
// //         setError(
// //           err instanceof Error ? err.message : "Failed to create exercises"
// //         );
// //         return false;
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     // Calculate comprehensive stats
// //     const calculateStats = (): WorkoutStats => {
// //       const totalWorkouts = workouts.length;
// //       const totalExercises = exercises.length;
  
// //       let totalSets = 0;
// //       let totalReps = 0;
// //       let totalWeight = 0;
// //       const exerciseCount: { [key: string]: number } = {};
// //       const muscleGroupCount: { [key: string]: number } = {};
// //       const exerciseMaxWeights: {
// //         [key: string]: { weight: number; date: string };
// //       } = {};
  
// //       workouts.forEach((workout) => {
// //         workout.exercises.forEach((exercise) => {
// //           const exerciseData = exercises.find((e) => e._id === exercise.exerciseId);
  
// //           if (exerciseData) {
// //             // Count exercise usage
// //             exerciseCount[exerciseData.name] =
// //               (exerciseCount[exerciseData.name] || 0) + 1;
  
// //             // Count muscle groups
// //             muscleGroupCount[exerciseData.muscleGroup] =
// //               (muscleGroupCount[exerciseData.muscleGroup] || 0) + 1;
  
// //             exercise.sets.forEach((set) => {
// //               totalSets++;
// //               totalReps += set.reps;
// //               totalWeight += set.weight * set.reps;
  
// //               // Track personal records
// //               const currentMax = exerciseMaxWeights[exerciseData.name];
// //               if (!currentMax || set.weight > currentMax.weight) {
// //                 exerciseMaxWeights[exerciseData.name] = {
// //                   weight: set.weight,
// //                   date: workout.date,
// //                 };
// //               }
// //             });
// //           }
// //         });
// //       });
  
// //       // Calculate average workouts per week
// //       const now = new Date();
// //       const firstWorkoutDate =
// //         workouts.length > 0
// //           ? new Date(Math.min(...workouts.map((w) => new Date(w.date).getTime()))
// //           : now;
// //       const weeksDiff = Math.max(
// //         1,
// //         Math.ceil(
// //           (now.getTime() - firstWorkoutDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
// //         )
// //       );
// //       const averageWorkoutsPerWeek = totalWorkouts / weeksDiff;
  
// //       // Get favorite exercises (top 5)
// //       const favoriteExercises = Object.entries(exerciseCount)
// //         .sort(([, a], [, b]) => b - a)
// //         .slice(0, 5)
// //         .map(([name, count]) => ({ name, count }));
  
// //       // Get recent workouts (last 5)
// //       const recentWorkouts = [...workouts]
// //         .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
// //         .slice(0, 5);
  
// //       // Get personal records
// //       const personalRecords = Object.entries(exerciseMaxWeights)
// //         .map(([exerciseName, { weight, date }]) => ({
// //           exerciseName,
// //           maxWeight: weight,
// //           date,
// //         }))
// //         .sort((a, b) => b.maxWeight - a.maxWeight);
  
// //       return {
// //         totalWorkouts,
// //         totalExercises,
// //         totalSets,
// //         totalReps,
// //         totalWeight,
// //         averageWorkoutsPerWeek,
// //         favoriteExercises,
// //         muscleGroupDistribution: muscleGroupCount,
// //         recentWorkouts,
// //         personalRecords,
// //       };
// //     };
  
// //     // Refresh all data
// //     const refreshData = async () => {
// //       await Promise.all([fetchWorkouts(), fetchExercises()]);
// //     };
  
// //     // Clear error
// //     const clearError = () => setError(null);
  
// //     // Calculate stats whenever workouts or exercises change
// //     const stats = calculateStats();
  
// //     // Initial data fetch
// //     useEffect(() => {
// //       refreshData();
// //     }, []);
  
// //     const value: WorkoutContextType = {
// //       workouts,
// //       exercises,
// //       loading,
// //       error,
// //       stats,
// //       fetchWorkouts,
// //       createWorkout,
// //       deleteWorkout,
// //       fetchExercises,
// //       createExercise,
// //       createManyExercises,
// //       refreshData,
// //       clearError,
// //     };
  
// //     return (
// //       <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
// //     );
// //   };
  
// //   export default WorkoutContext;
// import React, {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     ReactNode,
//   } from "react";
  
//   interface Exercise {
//     _id: string;
//     name: string;
//     muscleGroup: string;
//     description?: string;
//   }
  
//   interface WorkoutSet {
//     weight: number;
//     reps: number;
//   }
  
//   interface WorkoutExercise {
//     exerciseId: string;
//     sets: WorkoutSet[];
//   }
  
//   interface Workout {
//     _id: string;
//     user: string;
//     date: string;
//     exercises: WorkoutExercise[];
//   }
  
//   interface WorkoutContextType {
//     workouts: Workout[];
//     exercises: Exercise[];
//     loading: boolean;
//     error: string | null;
    
//     // Workout operations
//     fetchWorkouts: () => Promise<void>;
//     createWorkout: (exercises: WorkoutExercise[]) => Promise<boolean>;
//     deleteWorkout: (id: string) => Promise<boolean>;
    
//     // Exercise operations
//     fetchExercises: (search?: string) => Promise<void>;
//     createExercise: (exercise: Omit<Exercise, "_id">) => Promise<boolean>;
//     createManyExercises: (exercises: Omit<Exercise, "_id">[]) => Promise<boolean>;
    
//     // Utility
//     clearError: () => void;
//   }
  
//   const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
  
//   export const useWorkout = () => {
//     const context = useContext(WorkoutContext);
//     if (context === undefined) {
//       throw new Error("useWorkout must be used within a WorkoutProvider");
//     }
//     return context;
//   };
  
//   interface WorkoutProviderProps {
//     children: ReactNode;
//   }
  
//   export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
//     const [workouts, setWorkouts] = useState<Workout[]>([]);
//     const [exercises, setExercises] = useState<Exercise[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
  
//     //const API_BASE = "http://localhost:4000/api";
//     // const API_BASE = "http://192.168.1.99:4000/api";
//     const API_BASE = "http://127.0.0.1:4000/api";
  
//     const apiCall = async (endpoint: string, options: RequestInit = {}) => {
//       const response = await fetch(`${API_BASE}${endpoint}`, {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...options.headers,
//         },
//         ...options,
//       });
  
//       if (!response.ok) {
//         const errorData = await response
//           .json()
//           .catch(() => ({ message: "Network error" }));
//         throw new Error(
//           errorData.message || `HTTP error! status: ${response.status}`
//         );
//       }
  
//       return response.json();
//     };
  
//     // Workout operations
//     const fetchWorkouts = async () => {
//       try {
//         setLoading(true);
//         const data = await apiCall("/workouts/my-workouts");
//         if (data.success) {
//           setWorkouts(data.workouts);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch workouts");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const createWorkout = async (exercises: WorkoutExercise[]): Promise<boolean> => {
//       try {
//         setLoading(true);
//         const data = await apiCall("/workouts/create", {
//           method: "POST",
//           body: JSON.stringify({ exercises }),
//         });
//         if (data.success) {
//           await fetchWorkouts();
//           return true;
//         }
//         return false;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to create workout");
//         return false;
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const deleteWorkout = async (id: string): Promise<boolean> => {
//       try {
//         setLoading(true);
//         const data = await apiCall(`/workouts/delete/${id}`, {
//           method: "DELETE",
//         });
//         if (data.success) {
//           setWorkouts(prev => prev.filter(workout => workout._id !== id));
//           return true;
//         }
//         return false;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to delete workout");
//         return false;
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     // Exercise operations
//     const fetchExercises = async (search?: string) => {
//       try {
//         setLoading(true);
//         const endpoint = search 
//           ? `/exercises?search=${encodeURIComponent(search)}` 
//           : "/exercises";
//         const data = await apiCall(endpoint);
//         if (data.success) {
//           setExercises(data.exercises);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch exercises");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const createExercise = async (exercise: Omit<Exercise, "_id">): Promise<boolean> => {
//       try {
//         setLoading(true);
//         const data = await apiCall("/exercises", {
//           method: "POST",
//           body: JSON.stringify(exercise),
//         });
//         if (data.success) {
//           await fetchExercises();
//           return true;
//         }
//         return false;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to create exercise");
//         return false;
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const createManyExercises = async (exercises: Omit<Exercise, "_id">[]): Promise<boolean> => {
//       try {
//         setLoading(true);
//         const data = await apiCall("/exercises/bulk", {
//           method: "POST",
//           body: JSON.stringify({ exercises }),
//         });
//         if (data.success) {
//           await fetchExercises();
//           return true;
//         }
//         return false;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to create exercises");
//         return false;
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     // Initial data fetch
//     useEffect(() => {
//       const loadData = async () => {
//         await Promise.all([fetchWorkouts(), fetchExercises()]);
//       };
//       loadData();
//     }, []);
  
//     return (
//       <WorkoutContext.Provider value={{
//         workouts,
//         exercises,
//         loading,
//         error,
//         fetchWorkouts,
//         createWorkout,
//         deleteWorkout,
//         fetchExercises,
//         createExercise,
//         createManyExercises,
//         clearError: () => setError(null),
//       }}>
//         {children}
//       </WorkoutContext.Provider>
//     );
//   };
  
//   export default WorkoutContext;
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios, { AxiosError, AxiosResponse } from "axios";
  import { Platform } from "react-native";
  
  // ===== Interfaces =====
  interface Exercise {
    _id: string;
    name: string;
    muscleGroup: string;
    description?: string;
  }
  
  interface WorkoutSet {
    weight: number;
    reps: number;
  }
  
  interface WorkoutExercise {
    exerciseId: string;
    sets: WorkoutSet[];
  }
  
  interface Workout {
    _id: string;
    user: string;
    date: string;
    exercises: WorkoutExercise[];
  }
  
  interface WorkoutContextType {
    workouts: Workout[];
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
  
    fetchWorkouts: () => Promise<void>;
    createWorkout: (exercises: WorkoutExercise[]) => Promise<boolean>;
    deleteWorkout: (id: string) => Promise<boolean>;
  
    fetchExercises: (search?: string) => Promise<void>;
    createExercise: (exercise: Omit<Exercise, "_id">) => Promise<boolean>;
    createManyExercises: (exercises: Omit<Exercise, "_id">[]) => Promise<boolean>;
  
    clearError: () => void;
  }
  
  // ===== Context =====
  const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
  
  export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
      throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
  };
  
  // ===== Configuração de API_BASE adaptável =====
//   const getApiBase = () => {
//     if (Platform.OS === "ios") {
//       return "http://127.0.0.1:4000/api"; // iOS Simulator no Mac
//     }
//     if (Platform.OS === "android") {
//       return "http://10.0.2.2:4000/api"; // Android Emulator
//     }
//     return "http://localhost:4000/api"; // Web
//   };
const getApiBase = () => {
        //  return "http://localhost:4000/api"; // Web
return  "http://127.0.0.1:4000/api";

};
  
  const API_BASE = getApiBase();
  
  axios.defaults.baseURL = API_BASE;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  
  // ===== Provider =====
  interface WorkoutProviderProps {
    children: ReactNode;
  }
  
  export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // ===== Função utilitária de erro =====
    const handleError = (err: unknown, fallback: string) => {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(
        axiosErr.response?.data?.message || axiosErr.message || fallback
      );
    };
  
    // ===== Workout operations =====
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/workout/my-workouts");
        if (data.success) {
          setWorkouts(data.workouts);
        }
      } catch (err) {
        handleError(err, "Failed to fetch workouts");
      } finally {
        setLoading(false);
      }
    };
  
    const createWorkout = async (
      exercises: WorkoutExercise[]
    ): Promise<boolean> => {
      try {
        setLoading(true);
        const { data } = await axios.post("/workout/create", { exercises });
        if (data.success) {
          await fetchWorkouts();
          return true;
        }
        return false;
      } catch (err) {
        handleError(err, "Failed to create workout");
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    const deleteWorkout = async (id: string): Promise<boolean> => {
      try {
        setLoading(true);
        const { data } = await axios.delete(`/workout/delete/${id}`);
        if (data.success) {
          setWorkouts((prev) => prev.filter((w) => w._id !== id));
          return true;
        }
        return false;
      } catch (err) {
        handleError(err, "Failed to delete workout");
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    // ===== Exercise operations =====
    const fetchExercises = async (search?: string) => {
      try {
        setLoading(true);
        const endpoint = search
          ? `/exercise?search=${encodeURIComponent(search)}`
          : "/exercise";
        const { data } = await axios.get(endpoint);
        if (data.success) {
          setExercises(data.exercises);
        }
      } catch (err) {
        handleError(err, "Failed to fetch exercises");
      } finally {
        setLoading(false);
      }
    };
  
    const createExercise = async (
      exercise: Omit<Exercise, "_id">
    ): Promise<boolean> => {
      try {
        setLoading(true);
        const { data } = await axios.post("/exercise", exercise);
        if (data.success) {
          await fetchExercises();
          return true;
        }
        return false;
      } catch (err) {
        handleError(err, "Failed to create exercise");
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    const createManyExercises = async (
      exercises: Omit<Exercise, "_id">[]
    ): Promise<boolean> => {
      try {
        setLoading(true);
        const { data } = await axios.post("/exercise/bulk", { exercises });
        if (data.success) {
          await fetchExercises();
          return true;
        }
        return false;
      } catch (err) {
        handleError(err, "Failed to create exercises");
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    // ===== Initial load =====
    useEffect(() => {
      (async () => {
        await Promise.all([fetchWorkouts(), fetchExercises()]);
      })();
    }, []);
  
    return (
      <WorkoutContext.Provider
        value={{
          workouts,
          exercises,
          loading,
          error,
          fetchWorkouts,
          createWorkout,
          deleteWorkout,
          fetchExercises,
          createExercise,
          createManyExercises,
          clearError: () => setError(null),
        }}
      >
        {children}
      </WorkoutContext.Provider>
    );
  };
  
  export default WorkoutContext;
  