import { WorkoutType, EffortLevel, Goal } from "../types";

export const workoutTypeLabelsRu: Record<WorkoutType, string> = {
    easy: "Легкий бег",
    tempo: "Темповый бег",
    interval: "Интервалы",
    long_run: "Длительная",
    recovery: "Восстановление",
    rest: "День отдыха"
}

export const workoutTypeColors: Record<WorkoutType, string> = {
  easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  tempo: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  interval: "bg-red-500/20 text-red-400 border-red-500/30",
  long_run: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  rest: "bg-muted text-muted-foreground border-border",
  recovery: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
}


export const effortLabels: Record<EffortLevel, string> = {
    easy: "Легко",
    normal: "Нормально",
    hard: "Тяжело"
}

// 4. названия целей на русском
export const goalLabels: Record<Goal, string> = {
  '3km': '3км',
  '10km': '10км',
  '5km': '5км',
  'half_marathon': 'полумарафон',
  'marathon': 'марафон',
  
}