import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Headphones, Video, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const typeIcons = {
  article: FileText,
  podcast: Headphones,
  video: Video,
};

const typeColors = {
  article: "bg-primary/10 text-primary",
  podcast: "bg-accent/10 text-accent",
  video: "bg-destructive/10 text-destructive",
};

type ContentType = "all" | "article" | "podcast" | "video";

const Blog = () => {
  const [filter, setFilter] = useState<ContentType>("all");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["content-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = filter === "all" ? posts : posts?.filter((p) => p.content_type === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Insurance Insights & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert articles, podcasts, and videos to help you make smarter insurance decisions.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {(["all", "article", "podcast", "video"] as ContentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type === "all" ? "All Content" : `${type}s`}
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-20 mb-4" />
                    <div className="h-6 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered?.map((post, i) => {
                const Icon = typeIcons[post.content_type as keyof typeof typeIcons] || FileText;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer border-border">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[post.content_type as keyof typeof typeColors]}`}>
                              <Icon className="h-3 w-3" />
                              {post.content_type}
                            </span>
                          </div>
                          <h2 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.published_at && format(new Date(post.published_at), "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                              Read more <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filtered?.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No content found for this category.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
