import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, FileText, Headphones, Video } from "lucide-react";
import { format } from "date-fns";

const typeIcons = {
  article: FileText,
  podcast: Headphones,
  video: Video,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["content-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    return text
      .split("\n\n")
      .map((block, i) => {
        if (block.startsWith("### ")) {
          return <h3 key={i} className="font-heading text-lg font-bold text-foreground mt-6 mb-2">{block.slice(4)}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">{block.slice(3)}</h2>;
        }
        if (block.startsWith("- ")) {
          const items = block.split("\n").filter(l => l.startsWith("- "));
          return (
            <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              ))}
            </ul>
          );
        }
        if (block.match(/^\d+\./)) {
          const items = block.split("\n").filter(l => l.match(/^\d+\./));
          return (
            <ol key={i} className="list-decimal pl-6 space-y-1 text-muted-foreground mb-4">
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
        );
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to all content</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = typeIcons[post.content_type as keyof typeof typeIcons] || FileText;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to all content
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="gap-1">
              <Icon className="h-3 w-3" />
              {post.content_type}
            </Badge>
            {post.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.author}
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {format(new Date(post.published_at), "MMMM d, yyyy")}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p className="text-lg text-foreground/80 font-medium mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="prose-custom">
            {post.body && renderMarkdown(post.body)}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
