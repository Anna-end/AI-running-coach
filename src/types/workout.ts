import {WorkoutType, EffortLevel} from './index'
export const workoutTypeLabels: Record<WorkoutType, string> = {
    easy: "Easy Run",
    tempo: "Tempo Run",
    interval: "Intervals",
    long_run: "Long Run",
    recovery: "Recovery",
    rest: "Rest Day"
  }
  
  export const workoutTypeLabelsRu: Record<WorkoutType, string> = {
    easy: "Легкий бег",
    tempo: "Темповый бег",
    interval: "Интервалы",
    long_run: "Длительная",
    recovery: "Восстановление",
    rest: "День отдыха"
  }
  
  export const effortLabels: Record<EffortLevel, string> = {
    easy: "Легко",
    normal: "Нормально",
    hard: "Тяжело"
  }
  