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
    ai_notes: string;
    created_at: string;
    id: string;
    plan_id: string; 
    total_distance_km: number;
    week_number: number;
    workouts: Workout[];
}

export interface Workout {
    actual_distance_km? : number;
    actual_duration_minutes?: number;
    actual_pulse_work?: number;
    completed: boolean;
    created_at: string;
    date: string;
    description: string;
    distance_km: number;
    duration_minutes: number;
    effort_level? : EffortLevel;
    id: string;
    notes?: string;
    type: WorkoutType;
    user_id: string;
    week_id: string;
}

export interface AIPlanResponse {
    weeks: TrainingWeek[];
    totalWeeks: number;
    aiSummary: string;
}

export interface TrainingPlan {
    ai_summary: string;
    created_at: string;
    end_date: string;
    fitness_level: FitnessLevel;
    goal: Goal;
    id: string;
    is_active: boolean;
    start_date: string;
    total_weeks: number;
    training_weeks: TrainingWeek[];
    user_id: string;
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
  
