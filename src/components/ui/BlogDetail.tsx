import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id, // Only run if ID exists
  });

  if (isLoading)
    return (
      <div className="p-4">
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  if (isError) return <div className="text-red-500">Blog not found.</div>;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Cover Image */}
      <img
        src={blog?.coverImage}
        alt={blog?.title}
        className="w-full h-64 object-cover rounded-xl shadow-sm mb-6"
      />

      {/* Content */}
      <div className="px-2">
        <h1 className="text-3xl font-extrabold mb-3 text-slate-900">
          {blog?.title}
        </h1>

        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 border-b pb-4">
          <div className="flex gap-2">
            {blog?.category.map((cat: string) => (
              <span
                key={cat}
                className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium text-xs"
              >
                {cat}
              </span>
            ))}
          </div>
          <span>{blog?.date}</span>
        </div>

        <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {blog?.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
