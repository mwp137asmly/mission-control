"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { TabBar } from "@/components/tab-bar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Terminal, User, Bot } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "chat", label: "Chat" },
  { id: "command", label: "Command" },
];

const mockMessages = [
  {
    id: "1",
    role: "user",
    content: "What's the status of the newsletter pipeline?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "The newsletter pipeline has 3 drafts in progress and 1 scheduled for tomorrow at 9 AM EST. Would you like me to show you the details?",
    timestamp: new Date(Date.now() - 1000 * 60 * 29),
  },
  {
    id: "3",
    role: "user",
    content: "Yes, please show me the scheduled one.",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Here's the scheduled newsletter: 'Weekly Newsletter #42' - Type: newsletter - Scheduled for: Feb 16, 2026 at 9:00 AM - Author: Agent Main - Tags: newsletter, weekly. It's currently in draft status and ready for final review.",
    timestamp: new Date(Date.now() - 1000 * 60 * 27),
  },
];

export default function ChatPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "chat";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Chat</h1>
        <p className="text-white/60 text-fluid-base">
          Interact with agents and execute commands
        </p>
      </div>

      <TabBar tabs={tabs} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "chat" && <ChatView />}
        {activeTab === "command" && <CommandView />}
      </motion.div>
    </div>
  );
}

function ChatView() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Send message
      setMessage("");
    }
  };

  return (
    <Card className="glass-card p-6 h-[calc(100vh-300px)] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {mockMessages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
                  : "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-5 h-5 text-green-400" />
              ) : (
                <Bot className="w-5 h-5 text-blue-400" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[70%] ${
                msg.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-white/[0.02] border border-white/[0.05]"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <p className="text-xs text-white/40 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-white/[0.05] border-white/[0.1]"
        />
        <Button
          onClick={handleSend}
          className="bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

function CommandView() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Mission Control v1.0.0",
    "Type 'help' for available commands",
    "",
  ]);

  const handleExecute = () => {
    if (command.trim()) {
      setOutput((prev) => [...prev, `$ ${command}`, "Command executed successfully", ""]);
      setCommand("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-green-400" />
            <h2 className="text-fluid-xl font-semibold">Terminal</h2>
          </div>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-sm mb-4 h-[400px] overflow-y-auto">
            {output.map((line, idx) => (
              <div key={idx} className="text-green-400">
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2 text-green-400">
              <span>$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                className="flex-1 bg-transparent border-none outline-none"
                placeholder="Enter command..."
              />
            </div>
          </div>
          <Button
            onClick={handleExecute}
            className="w-full bg-green-500/20 border border-green-500/30 hover:bg-green-500/30"
          >
            Execute
          </Button>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-fluid-xl font-semibold mb-4">Quick Commands</h2>
        <div className="space-y-2">
          {[
            "system status",
            "list agents",
            "show tasks",
            "health check",
            "clear cache",
            "run diagnostics",
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => setCommand(cmd)}
              className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors text-sm font-mono text-left"
            >
              {cmd}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
