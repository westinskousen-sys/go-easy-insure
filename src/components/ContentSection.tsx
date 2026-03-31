import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Headphones, Video, ArrowRight, Calendar } from "lucide-react";
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

const ContentSection = () => {
  const { data: posts } = useQuery({
    queryKey: ["content-posts-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (!posts?.length) return null;

  return (
    <section className="py-20 bg-secondary/30" id="resources">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Insurance Insights & Resources
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert articles, podcasts, and videos to help you understand and optimize your coverage.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {posts.map((post, i) => {
            const Icon = typeIcons[post.content_type as keyof typeof typeIcons] || FileText;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer border-border">
                    <CardContent className="p-6 flex flex-col h-full">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit mb-3 ${typeColors[post.content_type as keyof typeof typeColors]}`}>
                        <Icon className="h-3 w-3" />
                        {post.content_type}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.published_at && format(new Date(post.published_at), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="gap-2">
              View All Resources <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
