export type Goal = "3km" | "5km" | "10km" | "half_marathon" | "marathon";

export type WorkoutType = "easy" | "tempo" | "long_run" | "interval" | "recovery" | "rest";

export type EffortLevel = "easy" | "normal" | "hard";

export type FitnessLevel = "beginner" | "intermediate" | "advanced";

export type HabitFrequency = "never" | "rarely" | "sometimes" | "often";

export interface PlanFormData {
    goal: Goal;
    fitnessLevel: FitnessLevel;
    currentWeeklyKm: number;
    dayPerWeek: number;
    currentPulseRest: number;
    currentPulseWork: number;
    targetDate?: string;
    injuryHistory?: string;
    currentSleep: "poor" | "average" | "good";
    currentStress: "low" | "medium" | "high";
    currentCaffeine: HabitFrequency;
    currentAlcohol: HabitFrequency;
    currentSmoking: HabitFrequency;
    additionalInfo?: string;    
}

export interface TrainingWeek {
    weekNumber: number;
    totalDistanceKm: number;
    workouts: Workout[];
    aiNotes?: string;
}

export interface Workout {
    id: string;
    date: string;
    type: WorkoutType;
    distanceKm: number;
    durationMinutes: number;
    description: string;
    completed: boolean;
    effortLevel? : EffortLevel;
    actualDistanceKm?: number;
    actualDurationMinutes?: number;
    actualPulseWork?: number;
    notes?: string;
}

export interface AIPlanResponse {
    weeks: TrainingWeek[];
    totalWeeks: number;
    aiSummary: string;
}

export interface TrainingPlan {
    id: string;
    userId: string;
    goal: Goal;
    fitnessLevel: FitnessLevel;
    startDate: string;
    endDate: string;
    totalWeeks: number;
    weeks: TrainingWeek[];
    createdAt: string;
    isActive: boolean;
  }

  export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    plan?: TrainingPlan;
  }

  export type CreateWorkout = Omit<Workout, "id" | "completed" | "effortLevel">
  export type UpdateWorkout = Partial<Omit<Workout, "id">> & { id: string }
  export type WorkoutPreview = Pick<Workout, "id" | "date" | "type" | "distanceKm" | "completed">
