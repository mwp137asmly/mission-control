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
import { Mail, User, Building, Calendar, Tag } from "lucide-react";

const tabs = [
  { id: "comms", label: "Comms" },
  { id: "crm", label: "CRM" },
];

const mockCommunications = [
  {
    id: "1",
    type: "email",
    subject: "Project Update",
    from: "sarah@techcorp.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "sent",
  },
  {
    id: "2",
    type: "slack",
    subject: "Feature request discussion",
    from: "mike@startupxyz.io",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "received",
  },
  {
    id: "3",
    type: "email",
    subject: "Demo follow-up",
    from: "emily@designco.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    status: "sent",
  },
];

export default function CommsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "comms";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Communications</h1>
        <p className="text-white/60 text-fluid-base">
          Manage communications and customer relationships
        </p>
      </div>

      <TabBar tabs={tabs} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "comms" && <CommsView />}
        {activeTab === "crm" && <CRMView />}
      </motion.div>
    </div>
  );
}

function CommsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glass-card p-6">
          <h2 className="text-fluid-xl font-semibold mb-6">Recent Communications</h2>
          <div className="space-y-3">
            {mockCommunications.map((comm, idx) => (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{comm.subject}</h3>
                      <p className="text-sm text-white/60">From: {comm.from}</p>
                      <p className="text-xs text-white/40 mt-1">
                        {comm.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      comm.status === "sent"
                        ? "border-green-500/50 text-green-400"
                        : "border-blue-500/50 text-blue-400"
                    }
                  >
                    {comm.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-fluid-xl font-semibold mb-4">Quick Stats</h2>
        <div className="space-y-4">
          <StatItem label="Emails Sent" value="24" />
          <StatItem label="Messages Received" value="18" />
          <StatItem label="Response Rate" value="92%" />
          <StatItem label="Avg Response Time" value="2.4h" />
        </div>
      </Card>
    </div>
  );
}

function CRMView() {
  const contacts = useQuery(api.contacts.list);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!contacts ? (
        <>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </>
      ) : (
        contacts.map((contact: any, idx: number) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="glass-card glass-card-hover p-6 cursor-pointer">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{contact.name}</h3>
                  {contact.role && (
                    <p className="text-sm text-white/60">{contact.role}</p>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={
                    contact.status === "active"
                      ? "border-green-500/50 text-green-400"
                      : contact.status === "lead"
                      ? "border-blue-500/50 text-blue-400"
                      : "border-gray-500/50 text-gray-400"
                  }
                >
                  {contact.status}
                </Badge>
              </div>

              {contact.company && (
                <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                  <Building className="w-4 h-4" />
                  <span>{contact.company}</span>
                </div>
              )}

              {contact.lastContact && (
                <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                  </span>
                </div>
              )}

              {contact.notes && (
                <p className="text-sm text-white/60 mb-3 line-clamp-2">
                  {contact.notes}
                </p>
              )}

              {contact.tags && contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-white/[0.05] text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
