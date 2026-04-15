import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { cookies } from "next/headers";
const CompleteSchema = z.object({
  effortLevel: z.enum(["easy", "normal", "hard"]),
  actualDistanceKm: z.number().optional(),
  actualDurationMinutes: z.number().optional(),
  actualPulseWork: z.number().optional(),
  notes: z.string().optional(),
});

export async function POST(
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

    const body = await request.json();
    const validated = CompleteSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }

    const { error } = await supabase
      .from("workouts")
      .update({
        completed: true,
        effort_level: validated.data.effortLevel,
        actual_distance_km: validated.data.actualDistanceKm,
        actual_duration_minutes: validated.data.actualDurationMinutes,
        actual_pulse_work: validated.data.actualPulseWork,
        notes: validated.data.notes,
      })
      .eq("id", params.id)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}