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
import { BookOpen, ExternalLink, Github, Package } from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "knowledge", label: "Knowledge" },
  { id: "ecosystem", label: "Ecosystem" },
];

const mockKnowledge = [
  {
    id: "1",
    title: "Agent Best Practices",
    category: "Documentation",
    description: "Comprehensive guide to building and deploying AI agents",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    title: "API Reference",
    category: "Documentation",
    description: "Complete API documentation for Mission Control",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "3",
    title: "Deployment Guide",
    category: "Tutorial",
    description: "Step-by-step guide for deploying to production",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

export default function KnowledgePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "knowledge";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-fluid-3xl font-bold mb-2">Knowledge Base</h1>
        <p className="text-white/60 text-fluid-base">
          Documentation, guides, and ecosystem products
        </p>
      </div>

      <TabBar tabs={tabs} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "knowledge" && <KnowledgeView />}
        {activeTab === "ecosystem" && <EcosystemView />}
      </motion.div>
    </div>
  );
}

function KnowledgeView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockKnowledge.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Card className="glass-card glass-card-hover p-6 cursor-pointer h-full">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 bg-white/5">
                  {item.category}
                </Badge>
                <h3 className="font-semibold mb-2">{item.title}</h3>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4">{item.description}</p>
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>Updated {item.lastUpdated.toLocaleDateString()}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function EcosystemView() {
  const products = useQuery(api.ecosystem.list);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!products ? (
        <>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </>
      ) : (
        products.map((product: any, idx: number) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={`/knowledge/ecosystem/${product.slug}`}>
              <Card className="glass-card glass-card-hover p-6 cursor-pointer h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <Badge variant="secondary" className="bg-white/5">
                      {product.category}
                    </Badge>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      product.status === "active"
                        ? "border-green-500/50 text-green-400"
                        : product.status === "beta"
                        ? "border-blue-500/50 text-blue-400"
                        : "border-gray-500/50 text-gray-400"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>

                <p className="text-sm text-white/60 mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  {product.website && (
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {product.github && (
                    <a
                      href={product.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/60 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature: string) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded bg-white/[0.05] text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  );
}
