import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import DOMPurify from "isomorphic-dompurify";
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      setPost(data);

      // Fetch related posts
      const { data: related } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .neq("slug", slug)
        .limit(3)
        .order("created_at", { ascending: false });

      setRelatedPosts(related || []);
    } catch (error) {
      handleError(error, USER_ERRORS.NOT_FOUND);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getExcerpt = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 160 ? plainText.substring(0, 160) : plainText;
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Ctrl Alt Crew Blog</title>
        <meta name="description" content={getExcerpt(post.content)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={getExcerpt(post.content)} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-20">
          <article className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="mb-8 animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>{formatDate(post.created_at)}</time>
                </div>
              </div>

              {post.cover_image && (
                <div className="rounded-lg overflow-hidden mb-8 border border-border">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* AdSense placeholder - first ad */}
            <div className="my-8 p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
              <p className="text-sm">Advertisement</p>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                data-ad-slot="xxxxxxxxxx"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            <div
              className="prose prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'div', 'span'],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'id']
                })
              }}
            />

            {/* AdSense placeholder - second ad */}
            <div className="my-8 p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
              <p className="text-sm">Advertisement</p>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                data-ad-slot="xxxxxxxxxx"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-6 font-mono">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300">
                        {relatedPost.cover_image && (
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={relatedPost.cover_image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
