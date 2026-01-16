import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import BlogList from "@/components/ui/BlogList";
import BlogDetail from "@/components/ui/BlogDetail";
import CreateBlog from "@/components/ui/CreateBlog";
import { Button } from "@/components/ui/button";

// This is the Layout Component for the Home Page
const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
      {/* Left Panel: The List (Takes up 1 column) */}
      <div className="md:col-span-1 border-r pr-4">
        <BlogList />
      </div>

      {/* Right Panel: The Detail View (Takes up 2 columns) */}
      <div className="md:col-span-2 overflow-y-auto pl-2">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Navbar */}
        <nav className="border-b px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-10">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            CA Monk<span className="text-blue-600">.</span>
          </Link>
          <Link to="/create">
            <Button>+ New Blog</Button>
          </Link>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6">
          <Routes>
            {/* The Dashboard Route wraps the list and detail */}
            <Route path="/" element={<DashboardLayout />}>
              {/* Default view when no blog is selected */}
              <Route
                index
                element={
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-xl bg-slate-50">
                    <p>Select a blog from the list to view details</p>
                  </div>
                }
              />

              {/* The Detail View (Appears in right panel) */}
              <Route path="blog/:id" element={<BlogDetail />} />
            </Route>

            {/* Create Page is separate (Full Screen) */}
            <Route path="/create" element={<CreateBlog />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
