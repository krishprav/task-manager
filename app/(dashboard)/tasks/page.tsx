import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Plus, MoreHorizontal } from "lucide-react";
import { CreateTaskButton } from "@/components/create-task-button";

const statusIcons: any = {
  TODO: { icon: Clock, className: "text-amber-500 bg-amber-500/10" },
  IN_PROGRESS: { icon: AlertCircle, className: "text-blue-500 bg-blue-500/10" },
  DONE: { icon: CheckCircle2, className: "text-emerald-500 bg-emerald-500/10" },
  BACKLOG: { icon: Clock, className: "text-slate-500 bg-slate-500/10" },
  CANCELED: { icon: Clock, className: "text-rose-500 bg-rose-500/10" },
};

const priorityColors: any = {
  LOW: "bg-slate-500/10 text-slate-500",
  MEDIUM: "bg-blue-500/10 text-blue-500",
  HIGH: "bg-orange-500/10 text-orange-500",
  URGENT: "bg-rose-500/10 text-rose-500",
};

export default async function TasksPage() {
  const session = (await getSession()) as any;
  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { assigneeId: session.userId },
        { project: { ownerId: session.userId } },
      ],
    },
    include: {
      assignee: { select: { name: true } },
      project: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const projects = await prisma.project.findMany({
    where: { ownerId: session.userId },
    select: { id: true, name: true },
  });

  const users = await prisma.user.findMany({
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your team's task progress.</p>
        </div>
        <CreateTaskButton projects={projects} users={users} />
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-6 border-b border-border bg-white/[0.02] px-6 py-3 text-sm font-medium text-muted-foreground">
          <div className="col-span-3">Task</div>
          <div>Status</div>
          <div>Priority</div>
          <div>Assignee</div>
        </div>
        <div className="divide-y divide-border">
          {tasks.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No tasks found.</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="grid grid-cols-6 items-center px-6 py-4 transition-colors hover:bg-white/[0.01]">
                <div className="col-span-3">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-muted-foreground">{task.project.name}</div>
                </div>
                <div>
                  <Badge variant="outline" className={`gap-1 border-none font-normal ${statusIcons[task.status].className}`}>
                    {React.createElement(statusIcons[task.status].icon, { className: "h-3 w-3" })}
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className={`border-none font-normal ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {task.assignee?.name || "Unassigned"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
