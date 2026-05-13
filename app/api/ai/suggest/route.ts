import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { generateTaskDescription, suggestTaskPriority } from "@/lib/gemini";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, type } = await req.json();

    if (type === "description" && title) {
      const suggestedDescription = await generateTaskDescription(title);
      return NextResponse.json({ suggestion: suggestedDescription });
    }

    if (type === "priority" && title) {
      const suggestedPriority = await suggestTaskPriority(title, description || "");
      return NextResponse.json({ suggestion: suggestedPriority });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI Service temporarily unavailable" }, { status: 500 });
  }
}
