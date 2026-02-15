"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useActivities, useTasks, useContentDrafts } from "@/lib/supabase/hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function HomePage() {
  const activities = useActivities(5);
  const tasks = useTasks();
  const contentDrafts = useContentDrafts();

  const activeTasks = tasks?.filter((t) => t.status !== "completed").length || 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length || 0;
  const draftContent = contentDrafts?.filter((c) => c.status === "draft").length || 0;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="text-fluid-3xl font-bold mb-2">Mission Control</h1>
        <p className="text-white/60 text-fluid-base">
          Real-time monitoring and control center for AI agents
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={Activity}
          label="System Status"
          value="Operational"
          trend="+2.5%"
          trendUp
          color="green"
        />
        <StatCard
          icon={Bot}
          label="Active Agents"
          value="3"
          trend="2 online"
          color="blue"
        />
        <StatCard
          icon={Clock}
          label="Active Tasks"
          value={activeTasks.toString()}
          trend={`${completedTasks} completed`}
          color="purple"
        />
        <StatCard
          icon={FileText}
          label="Content Pipeline"
          value={draftContent.toString()}
          trend="drafts"
          color="orange"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-fluid-xl font-semibold">Recent Activity</h2>
              <Badge variant="secondary" className="bg-white/5">
                Live
              </Badge>
            </div>
            <div className="space-y-4">
              {!activities ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : (
                activities.map((activity, idx) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{activity.title}</h3>
                      {activity.description && (
                        <p className="text-sm text-white/60 mt-1">
                          {activity.description}
                        </p>
                      )}
                      <p className="text-xs text-white/40 mt-2">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={item} className="space-y-6">
          <Card className="glass-card p-6">
            <h2 className="text-fluid-xl font-semibold mb-4">System Health</h2>
            <div className="space-y-4">
              <HealthItem label="API" status="operational" />
              <HealthItem label="Database" status="operational" />
              <HealthItem label="Agents" status="operational" />
              <HealthItem label="Cron Jobs" status="operational" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h2 className="text-fluid-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium text-left">
                Run Diagnostics
              </button>
              <button className="w-full p-3 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium text-left">
                View Logs
              </button>
              <button className="w-full p-3 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium text-left">
                Manage Agents
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color: string;
}) {
  const colorClasses = {
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    orange: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400",
  };

  return (
    <Card className="glass-card glass-card-hover p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-2">{label}</p>
          <p className="text-2xl font-bold mb-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-sm text-white/60">
              {trendUp && <TrendingUp className="w-4 h-4 text-green-400" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br border flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

function HealthItem({ label, status }: { label: string; status: string }) {
  const isOperational = status === "operational";
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {isOperational ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <AlertCircle className="w-4 h-4 text-yellow-400" />
        )}
        <span className={`text-xs ${isOperational ? "text-green-400" : "text-yellow-400"}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
