import { z } from "zod";

export const PlanFormSchema = z.object({
  goal: z.enum(["3km", "5km", "10km", "half_marathon", "marathon"], {
    error: () => ({ message: "Выбери цель" }),
  }),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"], {
    error: () => ({ message: "Выбери уровень подготовки" }),
  }),
  currentPulseRest: z
  .number({error: "Укажите пульс в покое"})
  .min(0, "Не может быть отрицательным")
  .max(300, "Слишком много"),
  currentPulseWork: z
  .number({error: "Укажите пульс при легком беге"})
  .min(0, "Не может быть отрицательным")
  .max(300, "Слишком много"),
  currentWeeklyKm: z
    .number({ error: "Введи число" })
    .min(0, "Не может быть отрицательным")
    .max(200, "Слишком много"),
  daysPerWeek: z
    .number({ error: "Введи число" })
    .min(1, "Минимум 1 день")
    .max(7, "Максимум 7 дней"),
  targetDate: z.string().optional(),
  injuryHistory: z.string().optional(),
  currentSleep: z.enum(["poor", "average", "good"]),
  currentStress: z.enum(["low", "medium", "high"]),
  currentCaffeine: z.enum(["never", "rarely", "sometimes", "often"]),
  currentAlcohol: z.enum(["never", "rarely", "sometimes", "often"]),
  currentSmoking: z.enum(["never", "rarely", "sometimes", "often"]),
  additionalInfo: z.string().optional(),
});

// тип из схемы — не дублируй вручную
export type PlanFormData = z.infer<typeof PlanFormSchema>;