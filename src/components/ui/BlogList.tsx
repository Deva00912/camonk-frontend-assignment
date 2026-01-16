import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchBlogs, type Blog } from "@/services/api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogList = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading)
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  if (isError) return <div className="text-red-500">Error loading blogs.</div>;

  return (
    // Changed: No more grid, just a flex vertical stack (overflow-y-auto for scrolling)
    <div className="flex flex-col gap-4 h-[calc(100vh-100px)] overflow-y-auto pr-2">
      {blogs?.map((blog: Blog) => (
        <Link to={`/blog/${blog.id}`} key={blog.id}>
          <Card className="hover:bg-slate-50 transition cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                {/* Categories */}
                <div className="flex gap-1 flex-wrap">
                  {blog.category.map((cat: string) => (
                    <span
                      key={cat}
                      className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                  {blog.date}
                </span>
              </div>

              <CardTitle className="text-base font-bold mb-1 leading-tight">
                {blog.title}
              </CardTitle>
              <p className="text-xs text-gray-500 line-clamp-2">
                {blog.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
