"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { EffortLevel } from "@/types";
import { cookies } from "next/headers"
export async function completeWorkoutAction(
  workoutId: string,
  effortLevel: EffortLevel,
  actualData?: {
    actualDistanceKm?: number;
    actualDurationMinutes?: number;
    notes?: string;
  }
) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Не авторизован");

    const { error } = await supabase
      .from("workouts")
      .update({
        completed: true,
        effort_level: effortLevel,
        actual_distance_km: actualData?.actualDistanceKm,
        actual_duration_minutes: actualData?.actualDurationMinutes,
        notes: actualData?.notes,
      })
      .eq("id", workoutId)
      .eq("user_id", user.id);

      if (error) throw new Error(error.message);

      revalidatePath("/dashboard");
      revalidatePath("/plan/[id]");
}