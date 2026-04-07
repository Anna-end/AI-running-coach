"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlanFormData } from "@/lib/validations/plan";
import { generateRunningPlan } from "@/lib/ai/deepseek";
import { cookies } from "next/headers"

export async function savePlanAction(formData: PlanFormData) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Не авторизован");

  // 1. генерируем план через DeepSeek
  const aiPlan = await generateRunningPlan(formData);

  console.log(aiPlan)
  // 2. деактивируем старый план
  await supabase
    .from("training_plans")
    .update({ is_active: false })
    .eq("user_id", user.id);

  // 3. сохраняем план
  const startDate = new Date().toISOString().split("T")[0];
  const endDate = new Date(
    Date.now() + aiPlan.totalWeeks * 7 * 24 * 60 * 60 * 1000
  ).toISOString().split("T")[0];

  const { data: plan, error: planError } = await supabase
    .from("training_plans")
    .insert({
      user_id: user.id,
      goal: formData.goal,
      fitness_level: formData.fitnessLevel,
      start_date: startDate,
      end_date: endDate,
      total_weeks: aiPlan.totalWeeks,
      ai_summary: aiPlan.aiSummary,
      is_active: true,
    })
    .select()
    .single();

  if (planError) throw new Error(planError.message);

  // 4. сохраняем недели и тренировки
  for (const week of aiPlan.weeks) {
    const { data: dbWeek, error: weekError } = await supabase
      .from("training_weeks")
      .insert({
        plan_id: plan.id,
        week_number: week.week_number,
        total_distance_km: week.total_distance_km,
        ai_notes: week.ai_notes,
      })
      .select()
      .single();

    if (weekError) throw new Error(weekError.message);

    // сохраняем тренировки недели
    if (week.workouts.length > 0) {
      const { error: workoutsError } = await supabase
        .from("workouts")
        .insert(
          week.workouts.map((workout) => ({
            week_id: dbWeek.id,
            user_id: user.id,
            date: workout.date,
            type: workout.type,
            distance_km: workout.distance_km,
            duration_minutes: workout.duration_minutes,
            description: workout.description,
            completed: false,
          }))
        );

      if (workoutsError) throw new Error(workoutsError.message);
    }
  }

  // 5. обновляем активный план в профиле
  await supabase
    .from("profiles")
    .update({ active_plan_id: plan.id })
    .eq("id", user.id);

  redirect(`/plan/${plan.id}`);
}