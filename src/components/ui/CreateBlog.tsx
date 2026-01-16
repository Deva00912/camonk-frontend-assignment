import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createBlog } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(() => ({
    title: "",
    description: "",
    content: "",
    // random image generator
    coverImage: `https://picsum.photos/seed/${Math.floor(
      Math.random() * 1000
    )}/800/400`,
    category: "",
  }));

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // Invalidate cache so the list updates immediately
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      ...formData,
      category: formData.category.split(",").map((c) => c.trim().toUpperCase()), // Convert string to array
      date: new Date().toISOString().split("T")[0],
    };
    mutation.mutate(newBlog);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Blog Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description (Short)
              </label>
              <Input
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Short summary..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Categories (comma separated)
              </label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="TECH, FINANCE, AI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Content
              </label>
              <textarea
                className="w-full p-2 border rounded-md min-h-[150px]"
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your blog here..."
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Publish Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
