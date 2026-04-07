import { PlanFormData } from "@/lib/validations/plan";

export function buildRunningPlanPrompt(formData: PlanFormData): string {
  return `
Ты опытный тренер по бегу с 15-летним опытом подготовки бегунов всех уровней.

ДАННЫЕ ПОЛЬЗОВАТЕЛЯ:
- Цель: ${formData.goal}
- Уровень подготовки: ${formData.fitnessLevel}
- Текущий недельный объём: ${formData.currentWeeklyKm} км
- Тренировочных дней в неделю: ${formData.daysPerWeek}
- Пульс в покое: ${formData.currentPulseRest} уд/мин
- Рабочий пульс: ${formData.currentPulseWork} уд/мин
- Качество сна: ${formData.currentSleep}
- Уровень стресса: ${formData.currentStress}
- Кофеин: ${formData.currentCaffeine}
- Алкоголь: ${formData.currentAlcohol}
- Курение: ${formData.currentSmoking}
${formData.targetDate ? `- Целевая дата: ${formData.targetDate}` : ""}
${formData.injuryHistory ? `- История травм: ${formData.injuryHistory}` : ""}
${formData.additionalInfo ? `- Доп. информация: ${formData.additionalInfo}` : ""}

ЗАДАЧА:
Составь персональный план беговых тренировок на 8 недель.

ТРЕБОВАНИЯ К ПЛАНУ:
- Нагрузка должна расти постепенно — не более 10% в неделю
- Учти уровень стресса и качество сна при планировании интенсивности
- Если есть травмы — избегай рискованных нагрузок
- Каждая неделя должна иметь ${formData.daysPerWeek} тренировочных дней
- Типы тренировок: easy, tempo, interval, long_run, recovery, rest

ВЕРНИ СТРОГО ТОЛЬКО JSON БЕЗ КАКОГО-ЛИБО ТЕКСТА ДО ИЛИ ПОСЛЕ:

{
  "totalWeeks": 8,
  "aiSummary": "краткое описание плана и подхода 2-3 предложения",
  "weeks": [
    {
      "weekNumber": 1,
      "totalDistanceKm": 25,
      "aiNotes": "комментарий тренера к этой неделе",
      "workouts": [
        {
          "date": "2025-03-10",
          "type": "easy",
          "distanceKm": 5,
          "durationMinutes": 35,
          "description": "Лёгкий бег в разговорном темпе. Пульс не выше 140 уд/мин."
        }
      ]
    }
  ]
}

ВАЖНО:
- date должен быть реальной датой начиная с сегодня
- type только из списка: easy, tempo, interval, long_run, recovery, rest
- для rest дней distanceKm = 0 и durationMinutes = 0
- description на русском языке, конкретный и полезный
- JSON должен быть валидным — без trailing commas, без комментариев
`;
}