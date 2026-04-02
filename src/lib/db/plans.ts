import { createClient } from "@/lib/supabase/server";
import { TrainingPlan } from "@/types";
import { cookies } from "next/headers";

export async function getActivePlan(userId: string) { 
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase
    .from("training_plans")
    .select(`
      *, 
      training_weeks (
      *, workouts (*)
      )`
    )
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();

    if (error) {
      return null;
    }
    return data;
}

export async function createPlan(
  userId: string,
  plan: Omit<TrainingPlan, "id" | "userId" | "createAt" | "isActive">
) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data, error } = await supabase
    .from("training_plan")
    .insert({
      user_id: userId,
      goal: plan.goal,
      fitness_level: plan.fitnessLevel,
      start_date: plan.startDate,
      end_date: plan.endDate,
      total_weeks: plan.totalWeeks,
      is_active: true,
    })
    .select()
    .single()

    if (error) {
      return error.message;
    }
    return data;
}

