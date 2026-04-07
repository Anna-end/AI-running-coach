"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Target, Activity, Moon, Brain, Coffee, Wine, Cigarette, Calendar, Info } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Textarea } from "./textarea"
import { Label } from "./label"
import { savePlanAction } from "@/app/(app)/plan/new/actions";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./select"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
  } from ".//form"

  import { PlanFormSchema, type PlanFormData } from "../../lib/validations/plan";

  const goalOptions = [
    { value: "3km", label: "3 км", description: "Отличный старт для начинающих" },
    { value: "5km", label: "5 км", description: "Классическая дистанция" },
    { value: "10km", label: "10 км", description: "Серьезный вызов" },
    { value: "half_marathon", label: "Полумарафон", description: "21.1 км" },
    { value: "marathon", label: "Марафон", description: "42.2 км" },
  ]
  
  const fitnessLevelOptions = [
    { value: "beginner", label: "Начинающий", description: "Мало или нет опыта бега" },
    { value: "intermediate", label: "Средний", description: "Регулярно бегаю 1-2 года" },
    { value: "advanced", label: "Продвинутый", description: "Опытный бегун 3+ года" },
  ]
  
  const sleepOptions = [
    { value: "poor", label: "Плохой", description: "Менее 6 часов" },
    { value: "average", label: "Средний", description: "6-7 часов" },
    { value: "good", label: "Хороший", description: "8+ часов" },
  ]
  
  const stressOptions = [
    { value: "low", label: "Низкий", description: "Спокойная жизнь" },
    { value: "medium", label: "Средний", description: "Обычный уровень" },
    { value: "high", label: "Высокий", description: "Много стресса" },
  ]
  
  const frequencyOptions = [
    { value: "never", label: "Никогда" },
    { value: "rarely", label: "Редко" },
    { value: "sometimes", label: "Иногда" },
    { value: "often", label: "Часто" },
  ]
  
  export function PlanForm() {
    
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [error, setError] = useState<string | ''>('')
    const totalSteps = 3
  
    const form = useForm<PlanFormData>({
      resolver: zodResolver(PlanFormSchema),
      defaultValues: {
      goal: "5km", // 👈 Добавьте значения по умолчанию для теста
      fitnessLevel: "beginner",
      currentWeeklyKm: 0,
      daysPerWeek: 3,
      targetDate: "",
      injuryHistory: "",
      currentSleep: "average",
      currentStress: "medium",
      currentCaffeine: "sometimes",
      currentAlcohol: "rarely",
      currentSmoking: "never",
      additionalInfo: "",
    },
    mode: "onChange", // 👈 Добавьте режим валидации
    })
  console.log('Form state:', {
  isValid: form.formState.isValid,
  errors: form.formState.errors,
  values: form.getValues()
});
     const onSubmit = async (data: PlanFormData) => {
    console.log('✅ Form submitted with data:', data);
    setIsLoading(true);
    setError('');
    
    try {
      const result = await savePlanAction(data);
      console.log('✅ Save result:', result);
      // Тут можно сделать редирект
      // router.push('/plan/success');
    } catch (error) {
      console.error('❌ Submit error:', error);
      setError(error instanceof Error ? error.message : "Ошибка при создании плана");
      setIsLoading(false);
    }
  }
  
    const nextStep = () => {
      if (step < totalSteps) setStep(step + 1)
    }
  
    const prevStep = () => {
      if (step > 1) setStep(step - 1)
    }
  
    return (
      
      <div className="w-full max-w-2xl mx-auto">
    
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Шаг {step} из {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {step === 1 && "Цели и подготовка"}
              {step === 2 && "Образ жизни"}
              {step === 3 && "Дополнительно"}
            </span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
  
        <Form {...form}>
          <form className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          >
            
            
            {/* Step 1: Goals and Fitness */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-sm bg-accent/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">Твоя цель</h2>
                    <p className="text-sm text-muted-foreground">Выбери дистанцию и уровень подготовки</p>
                  </div>
                </div>
  
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Целевая дистанция
                      </FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {goalOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`p-4 rounded-sm border text-left transition-all ${
                              field.value === option.value
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border bg-card hover:border-muted-foreground text-foreground"
                            }`}
                          >
                            <div className="font-bold text-lg">{option.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="fitnessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Уровень подготовки
                      </FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {fitnessLevelOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`p-4 rounded-sm border text-left transition-all ${
                              field.value === option.value
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border bg-card hover:border-muted-foreground text-foreground"
                            }`}
                          >
                            <div className="font-bold">{option.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="currentWeeklyKm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          Текущий недельный объем (км)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormDescription>Сколько км пробегаешь в неделю сейчас</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="daysPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          Дней тренировок в неделю
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={7}
                            placeholder="3"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormDescription>От 1 до 7 дней</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                    
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="currentPulseRest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          Пульс в состоянии покоя
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormDescription>ЧСС в обычной жизни</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="currentPulseWork"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          Пульс во время средней по тяжести работы
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={20}
                            max={260}
                            placeholder="3"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormDescription>ЧСС при работе в целевом темпе</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Целевая дата (опционально)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            {...field}
                            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormDescription>Если есть конкретное событие или забег</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
  
            {/* Step 2: Lifestyle */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-sm bg-accent/20 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">Образ жизни</h2>
                    <p className="text-sm text-muted-foreground">Помогает подобрать нагрузку</p>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="currentSleep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Качество сна
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-card border-border text-foreground w-full">
                              <SelectValue placeholder="Выбери" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sleepOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <span>{option.label}</span>
                                <span className="text-muted-foreground ml-2">({option.description})</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="currentStress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Уровень стресса
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-card border-border text-foreground w-full">
                              <SelectValue placeholder="Выбери" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stressOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <span>{option.label}</span>
                                <span className="text-muted-foreground ml-2">({option.description})</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="currentCaffeine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Coffee className="h-4 w-4" />
                          Кофеин
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-card border-border text-foreground w-full">
                              <SelectValue placeholder="Выбери" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="currentAlcohol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Wine className="h-4 w-4" />
                          Алкоголь
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-card border-border text-foreground w-full">
                              <SelectValue placeholder="Выбери" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="currentSmoking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Cigarette className="h-4 w-4" />
                          Курение
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-card border-border text-foreground w-full">
                              <SelectValue placeholder="Выбери" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
  
            {/* Step 3: Additional Info */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-sm bg-accent/20 flex items-center justify-center">
                    <Info className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">Дополнительно</h2>
                    <p className="text-sm text-muted-foreground">Важная информация для персонализации</p>
                  </div>
                </div>
  
                <FormField
                  control={form.control}
                  name="injuryHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        История травм (опционально)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Расскажи о прошлых травмах, если есть. Например: травма колена в 2023, растяжение ахилла..."
                          {...field}
                          className="min-h-24 bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
                        />
                      </FormControl>
                      <FormDescription>Это поможет избежать рискованных нагрузок</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Дополнительная информация (опционально)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Что еще важно знать? Ограничения по времени, предпочтения по типам тренировок..."
                          {...field}
                          className="min-h-24 bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                {/* Summary */}
                <div className="p-6 rounded-sm bg-secondary/50 border border-border">
                  <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Сводка</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Цель:</span>
                      <span className="ml-2 font-medium">
                        {goalOptions.find(o => o.value === form.watch("goal"))?.label || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Уровень:</span>
                      <span className="ml-2 font-medium">
                        {fitnessLevelOptions.find(o => o.value === form.watch("fitnessLevel"))?.label || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Км/неделя:</span>
                      <span className="ml-2 font-medium">{form.watch("currentWeeklyKm")} км</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Дней:</span>
                      <span className="ml-2 font-medium">{form.watch("daysPerWeek")}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {/* Navigation buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 h-14 border-border text-foreground hover:bg-secondary font-semibold uppercase tracking-wider text-sm"
                >
                  Назад
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm group"
                >
                  <span className="flex items-center gap-2">
                    Далее
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              ) : (
                <Button
                  
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-14 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold uppercase tracking-wider text-sm group"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Создаем план...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Создать план
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
                
              )}
                {error && (
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                {error}
                </div>
                )}
            </div>
          </form>
        </Form>
      </div>
    )
  }
  