"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { TabBar } from "@/components/tab-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, Zap, Activity, Brain } from "lucide-react";

const tabs = [
  { id: "agents", label: "Agents" },
  { id: "models", label: "Models" },
];

const mockAgents = [
  {
    id: "agent-main",
    name: "Agent Main",
    status: "online",
    model: "Claude Opus 4",
    sessions: 3,
    uptime: "99.9%",
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "agent-content",
    name: "Content Agent",
    status: "online",
    model: "Claude Sonnet 3.5",
    sessions: 1,
    uptime: "98.7%",
    lastActivity: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "agent-research",
    name: "Research Agent",
    status: "idle",
    model: "Claude Sonnet 3.5",
    sessions: 0,
    uptime: "99.2%",
    lastActivity: new Date(Date.now() - 1000 * 60 * 120),
  },
];

const mockModels = [
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic",
    contextWindow: "200K tokens",
    capabilities: ["reasoning", "coding", "analysis"],
    usage: "12.4K requests",
    avgLatency: "2.3s",
  },
  {
    id: "claude-sonnet-3.5",
    name: "Claude Sonnet 3.5",
    provider: "Anthropic",
    contextWindow: "200K tokens",
    capabilities: ["general", "fast", "efficient"],
    usage: "45.2K requests",
    avgLatency: "1.1s",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    contextWindow: "128K tokens",
    capabilities: ["general", "vision", "tools"],
    usage: "8.1K requests",
    avgLatency: "3.2s",
  },
];

export default function AgentsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "agents";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Agents</h1>
        <p className="text-white/60 text-fluid-base">
          Monitor and manage AI agents and models
        </p>
      </div>

      <TabBar tabs={tabs} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "agents" && <AgentsView />}
        {activeTab === "models" && <ModelsView />}
      </motion.div>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {mockAgents.map((agent, idx) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="glass-card glass-card-hover p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{agent.name}</h3>
                    <Badge
                      variant="outline"
                      className={
                        agent.status === "online"
                          ? "border-green-500/50 text-green-400"
                          : "border-yellow-500/50 text-yellow-400"
                      }
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <MetricBox label="Model" value={agent.model} />
                    <MetricBox label="Sessions" value={agent.sessions.toString()} />
                    <MetricBox label="Uptime" value={agent.uptime} />
                    <MetricBox
                      label="Last Active"
                      value={getRelativeTime(agent.lastActivity)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium">
                  View Logs
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors text-sm font-medium">
                  Manage
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function ModelsView() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {mockModels.map((model, idx) => (
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="glass-card glass-card-hover p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{model.name}</h3>
                  <Badge variant="outline" className="bg-white/5">
                    {model.provider}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.capabilities.map((cap) => (
                    <Badge key={cap} variant="secondary" className="bg-white/5">
                      {cap}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricBox label="Context Window" value={model.contextWindow} />
                  <MetricBox label="Usage" value={model.usage} />
                  <MetricBox label="Avg Latency" value={model.avgLatency} />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
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
