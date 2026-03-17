import { cn } from "../../lib/utils"
import { Card, CardContent, CardHeader } from "./Card"
import { Badge } from "./badge"
import { 
  Workout, 
  WorkoutType, 
  EffortLevel 
} from "../../types/index"
import {workoutTypeLabelsRu, effortLabels} from "../../types/workout"

const WorkoutTypeIcon = ({ type }: { type: WorkoutType }) => {
    const iconClasses = "w-5 h-5"
    
    switch (type) {
      case "easy":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case "tempo":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case "interval":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      case "long_run":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        )
      case "recovery":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
        case "rest":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
      default:
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  const getWorkoutTypeColor = (type: WorkoutType): string => {
  switch (type) {
    case "easy":
    case "recovery":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "tempo":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "interval":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "long_run":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "rest":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-secondary text-secondary-foreground border-border"
  }
}

const getEffortColor = (effort: EffortLevel): string => {
    switch (effort) {
      case "easy":
        return "bg-emerald-500/20 text-emerald-400"
      case "normal":
        return "bg-amber-500/20 text-amber-400"
      case "hard":
        return "bg-red-500/20 text-red-400"
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "short"
    })
  }

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}ч ${mins}мин`
    }
    return `${mins} мин`
  }
  
  const formatPace = (distanceKm: number, durationMinutes: number): string => {
    if (distanceKm === 0) return "-"
    const paceMinutes = durationMinutes / distanceKm
    const mins = Math.floor(paceMinutes)
    const secs = Math.round((paceMinutes - mins) * 60)
    return `${mins}:${secs.toString().padStart(2, "0")} /км`
  }

  interface WorkoutCardProps {
    workout: Workout
    className?: string
    onClick?: () => void
  }

  export function WorkoutCard({ workout, className, onClick }: WorkoutCardProps) {
    const hasActualData = workout.actualDistanceKm !== undefined || 
                          workout.actualDurationMinutes !== undefined
  
    return (
      <Card 
        className={cn(
          "border-border bg-card hover:border-accent/50 transition-colors cursor-pointer group",
          workout.completed && "border-l-2 border-l-accent",
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Type Icon */}
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center border",
                getWorkoutTypeColor(workout.type)
              )}>
                <WorkoutTypeIcon type={workout.type} />
              </div>
              
              <div>
                {/* Workout Type */}
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {workoutTypeLabelsRu[workout.type]}
                </p>
                {/* Date */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {formatDate(workout.date)}
                </p>
              </div>
            </div>
  
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              {workout.effortLevel && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs uppercase tracking-wider border-0",
                    getEffortColor(workout.effortLevel)
                  )}
                >
                  {effortLabels[workout.effortLevel]}
                </Badge>
              )}
              {workout.completed ? (
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <svg className="w-4 h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
          </div>
        </CardHeader>
  
        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {workout.description}
          </p>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
            {/* Distance */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Дистанция
              </p>
              <p className="text-lg font-bold text-foreground">
                {hasActualData && workout.actualDistanceKm !== undefined ? (
                  <>
                    <span className="text-accent">{workout.actualDistanceKm}</span>
                    <span className="text-muted-foreground text-xs font-normal ml-1">
                      /{workout.distanceKm} км
                    </span>
                  </>
                ) : (
                  <>
                    {workout.distanceKm}
                    <span className="text-sm font-normal text-muted-foreground ml-1">км</span>
                  </>
                )}
              </p>
            </div>
  
            {/* Duration */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Время
              </p>
              <p className="text-lg font-bold text-foreground">
                {hasActualData && workout.actualDurationMinutes !== undefined ? (
                  <>
                    <span className="text-accent">{formatDuration(workout.actualDurationMinutes)}</span>
                  </>
                ) : (
                  formatDuration(workout.durationMinutes)
                )}
              </p>
            </div>
  
            {/* Pace */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Темп
              </p>
              <p className="text-lg font-bold text-foreground">
                {hasActualData && workout.actualDistanceKm && workout.actualDurationMinutes ? (
                  <span className="text-accent">
                    {formatPace(workout.actualDistanceKm, workout.actualDurationMinutes)}
                  </span>
                ) : (
                  formatPace(workout.distanceKm, workout.durationMinutes)
                )}
              </p>
            </div>
          </div>
  
          {/* Pulse (if available) */}
          {workout.actualPulseWork !== undefined && (
            <div className="flex items-center gap-2 pt-2">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="text-sm text-muted-foreground">
                Пульс: <span className="text-foreground font-medium">{workout.actualPulseWork} уд/мин</span>
              </span>
            </div>
          )}
  
          {/* Notes (if available) */}
          {workout.notes && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Заметки
              </p>
              <p className="text-sm text-muted-foreground italic">
                {workout.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }