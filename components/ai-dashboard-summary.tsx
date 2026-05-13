"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export function AiDashboardSummary({ tasks }: { tasks: any[] }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) return;

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/summary", {
          method: "POST",
          body: JSON.stringify({ tasks }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setSummary(data.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (tasks.length === 0) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="h-4 w-4" />
      </div>
      <div>
        <span className="font-medium text-primary">Gemini Assistant:</span>{" "}
        <span className="text-muted-foreground italic">
          {loading ? "Analyzing your workload..." : summary || "Loading priorities..."}
        </span>
      </div>
    </div>
  );
}
