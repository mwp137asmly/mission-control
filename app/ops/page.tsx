"use client";

export const dynamic = 'force-dynamic';

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { TabBar } from "@/components/tab-bar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Circle,
  AlertCircle,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";

const tabs = [
  { id: "operations", label: "Operations" },
  { id: "tasks", label: "Tasks" },
  { id: "calendar", label: "Calendar" },
];

export default function OpsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "operations";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Operations</h1>
        <p className="text-white/60 text-fluid-base">
          Manage tasks, calendar, and daily operations
        </p>
      </div>

      <TabBar tabs={tabs} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "operations" && <OperationsView />}
        {activeTab === "tasks" && <TasksView />}
        {activeTab === "calendar" && <CalendarView />}
      </motion.div>
    </div>
  );
}

function OperationsView() {
  const activities = useQuery(api.activities.list, { limit: 20 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glass-card p-6">
          <h2 className="text-fluid-xl font-semibold mb-6">Activity Log</h2>
          <div className="space-y-3">
            {!activities ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </>
            ) : (
              activities.map((activity: any) => (
                <div
                  key={activity._id}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{activity.title}</h3>
                      {activity.description && (
                        <p className="text-sm text-white/60 mt-1">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="bg-white/5">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="glass-card p-6">
          <h2 className="text-fluid-xl font-semibold mb-4">System Metrics</h2>
          <div className="space-y-4">
            <MetricItem label="Uptime" value="99.9%" />
            <MetricItem label="API Calls" value="12.4K" />
            <MetricItem label="Active Sessions" value="24" />
            <MetricItem label="Error Rate" value="0.01%" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function TasksView() {
  const tasks = useQuery(api.tasks.list);

  const tasksByStatus = {
    todo: tasks?.filter((t: any) => t.status === "todo") || [],
    in_progress: tasks?.filter((t: any) => t.status === "in_progress") || [],
    completed: tasks?.filter((t: any) => t.status === "completed") || [],
    blocked: tasks?.filter((t: any) => t.status === "blocked") || [],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TaskColumn title="To Do" tasks={tasksByStatus.todo} status="todo" />
      <TaskColumn
        title="In Progress"
        tasks={tasksByStatus.in_progress}
        status="in_progress"
      />
      <TaskColumn
        title="Completed"
        tasks={tasksByStatus.completed}
        status="completed"
      />
      <TaskColumn
        title="Blocked"
        tasks={tasksByStatus.blocked}
        status="blocked"
      />
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  status,
}: {
  title: string;
  tasks: any[];
  status: string;
}) {
  const statusIcon = {
    todo: Circle,
    in_progress: Clock,
    completed: CheckCircle,
    blocked: AlertCircle,
  };

  const Icon = statusIcon[status as keyof typeof statusIcon];

  return (
    <Card className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-white/60" />
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="secondary" className="ml-auto bg-white/5">
          {tasks.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            layout
            className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <h4 className="text-sm font-medium mb-1">{task.title}</h4>
            {task.description && (
              <p className="text-xs text-white/60 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`text-xs ${
                  task.priority === "urgent"
                    ? "border-red-500/50 text-red-400"
                    : task.priority === "high"
                    ? "border-orange-500/50 text-orange-400"
                    : "border-white/20 text-white/60"
                }`}
              >
                {task.priority}
              </Badge>
              {task.dueDate && (
                <span className="text-xs text-white/40">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function CalendarView() {
  const events = useQuery(api.calendar.list);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glass-card p-6">
          <h2 className="text-fluid-xl font-semibold mb-6">Upcoming Events</h2>
          <div className="space-y-3">
            {!events ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </>
            ) : (
              events.map((event: any) => (
                <div
                  key={event._id}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-white/60 mb-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span>
                          {new Date(event.startTime).toLocaleString()}
                        </span>
                        <Badge variant="outline" className="bg-white/5">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-fluid-xl font-semibold mb-4">Calendar Stats</h2>
        <div className="space-y-4">
          <MetricItem label="Events This Week" value="8" />
          <MetricItem label="Meetings" value="5" />
          <MetricItem label="Deadlines" value="3" />
          <MetricItem label="Reminders" value="12" />
        </div>
      </Card>
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
