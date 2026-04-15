import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const { data: plan, error } = await supabase
      .from("training_plans")
      .select(`
        *,
        training_weeks (
          *,
          workouts (*)
        )
      `)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (error || !plan) {
      return NextResponse.json({ error: "План не найден" }, { status: 404 });
    }

    return NextResponse.json(plan);

  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}