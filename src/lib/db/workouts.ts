import { createServerClientFromCookies } from "@/lib/supabase/server";

export async function getWorkoutsByWeek(userId:string, weekId: string) {
  const supabase = await createServerClientFromCookies();

  const { data, error } = await supabase 
    .from("workouts")
    .select("*")
    .eq("week_id", weekId)
    .eq("user_id", userId)
    .order("data", { ascending: true});

  if (error) return [];
  return data;
}

export async function completeWorkout(
  workoutId: string,
  userId: string,
  effortLevel: "easy" | "normal" | "hard",
  actualData?: {
    actualDistanceKm?: number;
    actualDurationMinutes?: number;
    actualPulseWork?: number;
    notes?: string;
  }
) {
  const supabase = await createServerClientFromCookies();

  const { error } = await supabase
    .from("workouts")
    .update({
      completed: true,
      effort_level: effortLevel,
      actual_distance_km: actualData?.actualDistanceKm,
      actual_duration_minutes: actualData?.actualDurationMinutes,
      actual_pulse_work: actualData?.actualPulseWork,
      notes: actualData?.notes,
    })
    .eq("id", workoutId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}