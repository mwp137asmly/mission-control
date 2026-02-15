"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ExternalLink, Github, Package, Zap } from "lucide-react";
import Link from "next/link";

export default function EcosystemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = useQuery(api.ecosystem.bySlug, { slug });

  if (product === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <Card className="glass-card p-12 text-center">
          <p className="text-xl text-white/60">Product not found</p>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Ecosystem
      </button>

      <Card className="glass-card p-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
            <Package className="w-10 h-10 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white/5">
                    {product.category}
                  </Badge>
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
              </div>
              <div className="flex items-center gap-3">
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
                {product.github && (
                  <a
                    href={product.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <p className="text-lg text-white/80">{product.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {product.features && product.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Features
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature: string) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-white/60"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.integrations && product.integrations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Integrations</h2>
              <div className="flex flex-wrap gap-2">
                {product.integrations.map((integration: string) => (
                  <Badge key={integration} variant="outline" className="bg-white/5">
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/[0.06] text-sm text-white/40">
          Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
        </div>
      </Card>
    </motion.div>
  );
}
