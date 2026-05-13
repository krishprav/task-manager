import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const session = (await getSession()) as any;
  const projects = await prisma.project.findMany({
    where: { ownerId: session.userId },
    include: { _count: { select: { tasks: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your team's project workspaces.</p>
        </div>
        {session.role === "ADMIN" && (
          <Button asChild className="gap-2">
            <Link href="/projects/new">
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
            <FolderKanban className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No projects yet</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {session.role === "ADMIN" 
                ? "Get started by creating your first project workspace." 
                : "You haven't been added to any projects yet."}
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="border-border bg-card transition-colors hover:bg-white/[0.02]">
              <Link href={`/projects/${project.id}`}>
                <CardHeader>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {project._count.tasks} Tasks
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
