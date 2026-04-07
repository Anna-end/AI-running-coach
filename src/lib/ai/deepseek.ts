import { PlanFormData } from "@/lib/validations/plan";
import { AIPlanResponse } from "@/types";
import { buildRunningPlanPrompt } from "./prompts";

export async function generateRunningPlan(
  formData: PlanFormData
): Promise<AIPlanResponse> {
  const prompt = buildRunningPlanPrompt(formData);

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Ты профессиональный тренер по бегу. Отвечаешь строго в формате JSON без какого-либо дополнительного текста.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // парсим JSON ответ
  let parsed: AIPlanResponse;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("AI вернул невалидный JSON");
  }

  // валидируем структуру
  if (!parsed.weeks || !Array.isArray(parsed.weeks)) {
    throw new Error("Неверная структура ответа AI");
  }

  return parsed;
}
