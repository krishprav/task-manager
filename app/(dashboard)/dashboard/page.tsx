import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Clock, AlertCircle, CheckCircle2, ListTodo } from "lucide-react";
import { AiDashboardSummary } from "@/components/ai-dashboard-summary";

async function getStats(userId: string) {
  const [total, todo, inProgress, done, activeTasks] = await Promise.all([
    prisma.task.count({ where: { assigneeId: userId } }),
    prisma.task.count({ where: { assigneeId: userId, status: "TODO" } }),
    prisma.task.count({ where: { assigneeId: userId, status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { assigneeId: userId, status: "DONE" } }),
    prisma.task.findMany({ 
        where: { assigneeId: userId, NOT: { status: "DONE" } },
        select: { title: true, status: true },
        take: 5
    }),
  ]);

  return { total, todo, inProgress, done, activeTasks };
}

export default async function DashboardPage() {
  const session = (await getSession()) as any;
  const stats = await getStats(session.userId);


  const cards = [
    { title: "Total Tasks", value: stats.total, icon: ListTodo, color: "text-primary" },
    { title: "To Do", value: stats.todo, icon: Clock, color: "text-amber-500" },
    { title: "In Progress", value: stats.inProgress, icon: AlertCircle, color: "text-blue-500" },
    { title: "Completed", value: stats.done, icon: CheckCircle2, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      <AiDashboardSummary tasks={stats.activeTasks} />


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">No recent tasks found.</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">No overdue tasks.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
