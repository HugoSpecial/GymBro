import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios, { AxiosError } from "axios";
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
    name: string;
    exercises: WorkoutExercise[];
  }
  
  interface WorkoutContextType {
    workouts: Workout[];
    lastThreeWorkouts: Workout[]; // <- novo
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
  
    fetchWorkouts: () => Promise<void>;
    createWorkout: (
      name: string,
      exercises: WorkoutExercise[]
    ) => Promise<boolean>;
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
  
  const getApiBase = () => {
    return "http://127.0.0.1:4000/api";
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
    const [lastThreeWorkouts, setLastThreeWorkouts] = useState<Workout[]>([]); // novo estado
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleError = (err: unknown, fallback: string) => {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(axiosErr.response?.data?.message || axiosErr.message || fallback);
    };
  
    // ===== Workout operations =====
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/workout/my-workouts");
        if (data.success) {
          setWorkouts(data.workouts);
  
          // Ordena por data (mais recente primeiro)
          const sorted = data.workouts.sort(
            (a: Workout, b: Workout) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
  
          // Pega só os 3 mais recentes
          setLastThreeWorkouts(sorted.slice(0, 3));
        }
      } catch (err) {
        handleError(err, "Failed to fetch workouts");
      } finally {
        setLoading(false);
      }
    };
  
    const createWorkout = async (
      name: string,
      exercises: WorkoutExercise[]
    ): Promise<boolean> => {
      try {
        setLoading(true);
        const { data } = await axios.post("/workout/create", {
          name: name.trim(),
          exercises,
        });
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
  
          // Atualiza lastThreeWorkouts também, removendo o excluído e reordenando
          setLastThreeWorkouts((prev) =>
            prev.filter((w) => w._id !== id).slice(0, 3)
          );
  
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
          lastThreeWorkouts, // expõe aqui
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
  