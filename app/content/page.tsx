"use client";

import { motion } from "framer-motion";
import { useContentDrafts } from "@/lib/supabase/hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Calendar, User } from "lucide-react";

export default function ContentPage() {
  const contentDrafts = useContentDrafts();

  const draftsByStatus = {
    draft: contentDrafts?.filter((c) => c.status === "draft") || [],
    review: contentDrafts?.filter((c) => c.status === "review") || [],
    scheduled: contentDrafts?.filter((c) => c.status === "scheduled") || [],
    published: contentDrafts?.filter((c) => c.status === "published") || [],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Content Pipeline</h1>
        <p className="text-white/60 text-fluid-base">
          Manage and track content creation workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentColumn
          title="Draft"
          status="draft"
          content={draftsByStatus.draft}
          color="gray"
        />
        <ContentColumn
          title="Review"
          status="review"
          content={draftsByStatus.review}
          color="yellow"
        />
        <ContentColumn
          title="Scheduled"
          status="scheduled"
          content={draftsByStatus.scheduled}
          color="blue"
        />
        <ContentColumn
          title="Published"
          status="published"
          content={draftsByStatus.published}
          color="green"
        />
      </div>
    </div>
  );
}

function ContentColumn({
  title,
  status,
  content,
  color,
}: {
  title: string;
  status: string;
  content: any[];
  color: string;
}) {
  const colorClasses = {
    gray: "from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400",
    yellow: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]}`}
        />
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant="secondary" className="ml-auto bg-white/5">
          {content.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {!content ? (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </>
        ) : (
          content.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="glass-card glass-card-hover p-4 cursor-pointer">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="text-xs bg-white/5">
                      {item.type}
                    </Badge>
                  </div>
                </div>

                {item.content && (
                  <p className="text-xs text-white/60 mb-3 line-clamp-2">
                    {item.content}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-white/40">
                  {item.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{item.author}</span>
                    </div>
                  )}
                  {item.scheduled_for && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(item.scheduled_for).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-white/[0.05] text-xs"
                      >
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
    </div>
  );
}
