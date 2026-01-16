const API_URL = 'http://localhost:3001';

export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

// GET ALL BLOGS
export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_URL}/blogs`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

// GET SINGLE BLOG
export const fetchBlogById = async (id: string): Promise<Blog> => {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

// CREATE BLOG
export const createBlog = async (newBlog: Omit<Blog, 'id'>): Promise<Blog> => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBlog),
  });

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }

  return response.json();
};
