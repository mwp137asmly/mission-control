"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react";

const mockRepos = [
  {
    id: "1",
    name: "mission-control",
    description: "Next.js 15 dashboard for OpenClaw agent monitoring",
    language: "TypeScript",
    stars: 12,
    forks: 3,
    status: "active",
    lastCommit: new Date(Date.now() - 1000 * 60 * 30),
    branch: "main",
    openPRs: 2,
  },
  {
    id: "2",
    name: "openclaw",
    description: "Open-source AI agent framework",
    language: "TypeScript",
    stars: 245,
    forks: 34,
    status: "active",
    lastCommit: new Date(Date.now() - 1000 * 60 * 120),
    branch: "main",
    openPRs: 5,
  },
  {
    id: "3",
    name: "newsletter-builder",
    description: "Automated newsletter generation and distribution",
    language: "TypeScript",
    stars: 18,
    forks: 7,
    status: "active",
    lastCommit: new Date(Date.now() - 1000 * 60 * 60 * 12),
    branch: "main",
    openPRs: 1,
  },
];

export default function CodePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Code Repositories</h1>
        <p className="text-white/60 text-fluid-base">
          Monitor and manage code repositories
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockRepos.map((repo, idx) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass-card glass-card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                  <Code className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{repo.name}</h3>
                      <p className="text-sm text-white/60">{repo.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-500/50 text-green-400"
                    >
                      {repo.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      <span className="text-sm text-white/60">{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <GitBranch className="w-4 h-4" />
                      <span>{repo.branch}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <GitPullRequest className="w-4 h-4" />
                      <span>{repo.openPRs} PRs</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <GitCommit className="w-4 h-4" />
                      <span>Last commit {getRelativeTime(repo.lastCommit)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium">
                        View Commits
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium">
                        Open in GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Timeline */}
      <Card className="glass-card p-6">
        <h2 className="text-fluid-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              type: "commit",
              repo: "mission-control",
              message: "Add real-time monitoring dashboard",
              time: new Date(Date.now() - 1000 * 60 * 30),
            },
            {
              type: "pr",
              repo: "openclaw",
              message: "Feature: Enhanced error handling",
              time: new Date(Date.now() - 1000 * 60 * 120),
            },
            {
              type: "commit",
              repo: "newsletter-builder",
              message: "Fix: Email template rendering",
              time: new Date(Date.now() - 1000 * 60 * 240),
            },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                {activity.type === "commit" ? (
                  <GitCommit className="w-5 h-5 text-green-400" />
                ) : (
                  <GitPullRequest className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{activity.repo}</span>
                  <Badge variant="secondary" className="bg-white/5 text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-1">{activity.message}</p>
                <p className="text-xs text-white/40">{getRelativeTime(activity.time)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function getRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
