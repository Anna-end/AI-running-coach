import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateRunningPlan } from "@/lib/ai/deepseek";
import { PlanFormSchema } from "@/lib/validations/plan";
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // проверяем авторизацию
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    // валидируем тело запроса
    const body = await request.json();
    const validated = PlanFormSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Неверные данные", details: validated.error.issues },
        { status: 400 }
      );
    }

    // генерируем план через DeepSeek
    const aiPlan = await generateRunningPlan(validated.data);

    return NextResponse.json({ plan: aiPlan });

  } catch (error) {
    console.error("Generate plan error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ошибка сервера" },
      { status: 500 }
    );
  }
}