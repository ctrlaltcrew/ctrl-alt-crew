import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { handleError, USER_ERRORS } from "@/lib/errorHandler";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  author: string;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      handleError(error, USER_ERRORS.LOAD_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - Ctrl Alt Crew | AI & Tech Insights</title>
        <meta
          name="description"
          content="Read the latest articles about AI, machine learning, software development, and tech innovations from Ctrl Alt Crew."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl font-bold mb-4 font-mono">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Tech Chronicles
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring AI, innovation, and the future of technology
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No posts published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <article className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 h-full flex flex-col animate-slide-up hover:shadow-lg hover:shadow-primary/20">
                    {post.cover_image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <time>{formatDate(post.created_at)}</time>
                      </div>

                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors font-mono">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground flex-1 mb-4">
                        {getExcerpt(post.content)}
                      </p>

                      <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More
                        <span className="text-xl">→</span>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
