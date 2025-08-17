export interface ExerciseSet {
    weight: number;
    reps: number;
  }
  
  export interface Exercise {
    _id: string;
    name: string;
    muscleGroup: string;
    description?: string;
  }
  
  export interface WorkoutExercise {
    exerciseId: string | Exercise;
    sets: ExerciseSet[];
  }
  
  export interface Workout {
    _id: string;
    name: string;
    date: string;
    exercises: WorkoutExercise[];
  }
  
  export interface SetInput {
    weight: string;
    reps: string;
  }
  
  export interface SelectedExercise {
    exerciseId: Exercise;
    name: string;
    muscleGroup: string;
    sets: SetInput[];
  }