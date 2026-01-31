import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DOMPurify from "isomorphic-dompurify";
import { handleError, USER_ERRORS } from "@/lib/errorHandler";

interface BlogPostFormProps {
  postId: string | null;
  onClose: () => void;
}

const BlogPostForm = ({ postId, onClose }: BlogPostFormProps) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) return;

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setCoverImage(data.cover_image || "");
      setAuthor(data.author);
      setPublished(data.published);
    } catch (error) {
      handleError(error, USER_ERRORS.LOAD_FAILED);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!postId) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sanitize HTML content to prevent XSS attacks
      const sanitizedContent = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'div', 'span'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'id']
      });

      const postData = {
        title,
        slug,
        content: sanitizedContent,
        cover_image: coverImage || null,
        author,
        published,
      };

      if (postId) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", postId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Post updated successfully.",
        });
      } else {
        const { error } = await supabase.from("posts").insert([postData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Post created successfully.",
        });
      }

      onClose();
    } catch (error: any) {
      handleError(error, USER_ERRORS.SAVE_FAILED);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold font-mono">
              {postId ? "Edit Post" : "New Post"}
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              placeholder="post-url-slug"
              required
            />
            <p className="text-sm text-muted-foreground">
              URL: /blog/{slug || "post-url-slug"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here... (HTML supported)"
              required
              rows={20}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">
              You can use HTML tags for formatting
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : postId ? (
                "Update Post"
              ) : (
                "Create Post"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BlogPostForm;
