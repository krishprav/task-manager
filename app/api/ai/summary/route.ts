import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { generateDashboardSummary } from "@/lib/gemini";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { tasks } = await req.json();

    if (!tasks || !Array.isArray(tasks)) {
      return NextResponse.json({ error: "Tasks are required" }, { status: 400 });
    }

    const summary = await generateDashboardSummary(tasks);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json({ error: "AI Service temporarily unavailable" }, { status: 500 });
  }
}
