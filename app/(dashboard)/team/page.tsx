import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, _count: { select: { assignedTasks: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Team Members</h1>
        <p className="text-muted-foreground">Manage and view your team roles and assignments.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">{user.name}</CardTitle>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-normal capitalize">
                  {user.role.toLowerCase()}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {user._count.assignedTasks} Active Tasks
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
