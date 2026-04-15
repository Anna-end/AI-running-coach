"use client" 

import {TrainingWeek} from "@/types/index"
import { WorkoutCard } from "@/components/plan/WorkoutCard"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
type propsPlan = {
  weekPlan: TrainingWeek[]
}

export function DashboardPlan({weekPlan} : propsPlan) {

  const currentWeek = weekPlan[0];
  const upcomingWorkouts = currentWeek.workouts.filter(d => !d.completed);
  const completedWorkouts = currentWeek.workouts.filter(d => d.completed);
    const currentKm = currentWeek.workouts
    .filter(d => d.completed && d.distance_km)
    .reduce((sum, d) => sum + (d.distance_km || 0), 0)
  
  const weeklyGoalKm = currentWeek.total_distance_km;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Главная страница</h1>
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Недельный план</h2>
            <div className="flex items-center justify-between mb-4">
              
              <h2 className="text-muted-foreground mt-1">Предстоящие тренировки</h2>
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
              <h2 className="text-muted-foreground mt-1">Завершенные</h2>
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