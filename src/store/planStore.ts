import { create } from "zustand";
import { TrainingPlan, Workout, EffortLevel } from "@/types";

interface PlanStore {
  plan: TrainingPlan | null;
  setPlan: (plan: TrainingPlan | null) => void;
  completeWorkout: (
    workoutId: string,
    effort: EffortLevel
  ) => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  plan: null,

  setPlan: (plan) => set({ plan }),

  completeWorkout: (workoutId, effort) =>
    set((state) => {
      if (!state.plan) return state;

      const updatedWeeks = state.plan.weeks.map((week) => ({
        ...week,
        workouts: week.workouts.map((workout) =>
          workout.id === workoutId
            ? { ...workout, completed: true, effortLevel: effort }
            : workout
        ),
      }));

      return { plan: { ...state.plan, weeks: updatedWeeks } };
    }),
}));