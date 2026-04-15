"use client";

import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { EffortLevel } from "@/types";

export function usePlan(planId: string) {
  return useQuery({
      queryKey: ["plan", planId],
      queryFn: async () => {
        const res = await fetch(`/api/plans/${planId}`);
        if(!res.ok) throw new Error("Ощибка загрузки плана");
        return res.json();
      }
  })
}

export function useCompleteWorkout(planId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      workoutId,
      effortLevel,
      actualData,
    } : {
      workoutId: string;
      effortLevel: EffortLevel;
      actualData?: {
        actualDistanceKm?: number;
        actualDurationMinutes?: number;
        actualPulseWork?: number;
        notes?: string;
      }
    }) => {
      const res = await fetch(`/api/workouts/${workoutId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ effortLevel, ...actualData }),
      });
      if (!res.ok) throw new Error("Ошибка при созранении");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan", planId] });
    }
  })
}