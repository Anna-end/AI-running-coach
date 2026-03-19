import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.goal || !body.fitnessLevel) {
      return NextResponse.json(
        { error: "Не все поля заполнены" },
        { status: 400 }
      );
    }

    // Claude API будет подключён на неделе 4
    return NextResponse.json({
      message: "План будет сгенерирован",
      receivedData: body,
    });

  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}