"use client"

import { useState } from "react"
import { EffortLevel, Workout } from "@/types/index"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface CompleteWorkoutModalProps {
  workout: Workout
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (data: {
    workoutId: string
    effortLevel: EffortLevel
    actualDistanceKm?: number
    actualDurationMinutes?: number
    actualPulseWork?: number
    notes?: string
  }) => void
  isPending?: boolean
}

const effortOptions: { value: EffortLevel; label: string; emoji: string; colorClass: string }[] = [
  { 
    value: "easy", 
    label: "Легко", 
    emoji: "😊",
    colorClass: "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
  },
  { 
    value: "normal", 
    label: "Нормально", 
    emoji: "😐",
    colorClass: "border-amber-500 bg-amber-500/10 text-amber-400" 
  },
  { 
    value: "hard", 
    label: "Тяжело", 
    emoji: "😓",
    colorClass: "border-red-500 bg-red-500/10 text-red-400" 
  },
]

export function CompleteWorkoutModal({
  workout,
  open,
  onOpenChange,
  onComplete,
  isPending = false,
}: CompleteWorkoutModalProps) {
  const [effort, setEffort] = useState<EffortLevel | null>(null)
  const [actualKm, setActualKm] = useState(workout.distance_km.toString())
  const [actualMinutes, setActualMinutes] = useState(workout.duration_minutes.toString())
  const [actualPulse, setActualPulse] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (!effort) return

    onComplete({
      workoutId: workout.id,
      effortLevel: effort,
      actualDistanceKm: actualKm ? parseFloat(actualKm) : undefined,
      actualDurationMinutes: actualMinutes ? parseInt(actualMinutes) : undefined,
      actualPulseWork: actualPulse ? parseInt(actualPulse) : undefined,
      notes: notes || undefined,
    })
  }

  const handleClose = () => {
    setEffort(null)
    setActualKm(workout.distance_km.toString())
    setActualMinutes(workout.duration_minutes.toString())
    setActualPulse("")
    setNotes("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight uppercase">
            Отметить тренировку
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {workout.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Выбор усилия */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Как прошла тренировка?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {effortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setEffort(option.value)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-md border-2 text-sm font-medium transition-all",
                    effort === option.value
                      ? option.colorClass
                      : "border-border bg-secondary/50 text-foreground hover:border-muted-foreground"
                  )}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-xs uppercase tracking-wide">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Фактические данные */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Фактические данные
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Дистанция (км)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={actualKm}
                  onChange={(e) => setActualKm(e.target.value)}
                  placeholder={workout.distance_km.toString()}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Время (мин)
                </label>
                <Input
                  type="number"
                  value={actualMinutes}
                  onChange={(e) => setActualMinutes(e.target.value)}
                  placeholder={workout.duration_minutes.toString()}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Пульс (уд/мин)
                </label>
                <Input
                  type="number"
                  value={actualPulse}
                  onChange={(e) => setActualPulse(e.target.value)}
                  placeholder="145"
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>

          {/* Заметки */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Заметки
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Как прошла тренировка? Что запомнилось?"
              className="bg-input border-border resize-none min-h-[80px]"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 uppercase tracking-wide text-xs font-semibold"
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!effort || isPending}
            className="flex-1 uppercase tracking-wide text-xs font-semibold"
          >
            {isPending ? "Сохраняем..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}