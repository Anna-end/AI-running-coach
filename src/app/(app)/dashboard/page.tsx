"use client"
  
import { WorkoutCard } from "../../../components/ui/WorkoutCard"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card"
import { Workout } from "../../../types"

const weekPlan = [
  { day: "Понедельник", shortDay: "Пн", completed: true, distance: 5.2, targetDistance: 5 },
  { day: "Вторник", shortDay: "Вт", completed: true, distance: 8.1, targetDistance: 8 },
  { day: "Среда", shortDay: "Ср", completed: false, targetDistance: 0 },
  { day: "Четверг", shortDay: "Чт", completed: true, distance: 6.5, targetDistance: 6 },
  { day: "Пятница", shortDay: "Пт", completed: false, targetDistance: 5 },
  { day: "Суббота", shortDay: "Сб", completed: false, targetDistance: 15 },
  { day: "Воскресенье", shortDay: "Вс", completed: false, targetDistance: 0 },
]

const upcomingWorkouts: Workout[] = [
  {
    id: "1",
    date: "2026-03-17",
    type: "easy",
    distanceKm: 5,
    durationMinutes: 30,
    description: "Легкий восстановительный бег в комфортном темпе. Держите пульс в зоне 2.",
    completed: false,
    effortLevel: "easy",
  },
  {
    id: "2",
    date: "2026-03-18",
    type: "interval",
    distanceKm: 8,
    durationMinutes: 45,
    description: "Разминка 2км, затем 6x800м с отдыхом 400м трусцой. Заминка 1.5км.",
    completed: false,
    effortLevel: "hard",
  },
  {
    id: "3",
    date: "2026-03-20",
    type: "tempo",
    distanceKm: 10,
    durationMinutes: 55,
    description: "Темповый бег на пороге ПАНО. Разминка 2км, основная часть 6км, заминка 2км.",
    completed: false,
    effortLevel: "normal",
  },
]

const completedWorkouts: Workout[] = [
  {
    id: "4",
    date: "2026-03-16",
    type: "long_run",
    distanceKm: 18,
    durationMinutes: 105,
    description: "Длительная тренировка для развития выносливости. Бег в разговорном темпе.",
    completed: true,
    effortLevel: "normal",
    actualDistanceKm: 18.5,
    actualDurationMinutes: 108,
    actualPulseWork: 145,
    notes: "Отличная тренировка! Погода была идеальной, чувствовал себя сильным на протяжении всей дистанции.",
  },
  {
    id: "5",
    date: "2026-03-14",
    type: "interval",
    distanceKm: 10,
    durationMinutes: 50,
    description: "Интервальная тренировка 8x400м с отдыхом 200м.",
    completed: true,
    effortLevel: "hard",
    actualDistanceKm: 10.2,
    actualDurationMinutes: 52,
    actualPulseWork: 168,
  },
]

export default function DashboardPage() {
  const currentKm = weekPlan
    .filter(d => d.completed && d.distance)
    .reduce((sum, d) => sum + (d.distance || 0), 0)
  
  const weeklyGoalKm = weekPlan
    .filter(d => d.targetDistance)
    .reduce((sum, d) => sum + (d.targetDistance || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Обзор вашего тренировочного прогресса</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Всего км</p>
                <p className="text-2xl font-bold text-foreground mt-1">127.5</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Тренировок</p>
                <p className="text-2xl font-bold text-foreground mt-1">24</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Ср. темп</p>
                <p className="text-2xl font-bold text-foreground mt-1">5:42</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Калории</p>
                <p className="text-2xl font-bold text-foreground mt-1">8,420</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       

        {/* Workouts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Workouts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Предстоящие тренировки</h2>
              <button className="text-sm text-accent hover:underline uppercase tracking-wider font-medium">
                Все
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </div>

          {/* Completed Workouts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Завершенные</h2>
              <button className="text-sm text-accent hover:underline uppercase tracking-wider font-medium">
                История
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <Card className="border-accent/30 bg-card overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 p-8">
              <CardDescription className="text-xs uppercase tracking-wider text-accent mb-2">
                Мотивация дня
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-foreground mb-4 text-balance">
                {"\"Каждый шаг приближает тебя к финишу. Не останавливайся.\""}
              </CardTitle>
              <p className="text-muted-foreground">
                До следующей тренировки осталось несколько часов. Подготовьте экипировку и отдохните перед пробежкой.
              </p>
            </div>
            <div className="w-full md:w-64 h-48 md:h-auto bg-secondary/50 flex items-center justify-center">
              <svg className="w-24 h-24 text-accent/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
