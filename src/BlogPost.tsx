import { Card } from "@mui/material";
import { useEffect, useState } from "react";

interface BlogPostType {
  userName: string;
  id: string;
  title: string;
  content: string;
  createdAt: string
}

interface BlogPostProps {
  refresh: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ refresh }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      const request = await fetch("http://localhost:3000/blog-posts");
      const response = await request.json();

      if (response) {
        setBlogPosts(response);
      }
    };
    getPosts();
  }, [refresh]);

  if (!blogPosts) {
    return null;
  }

  return (
    <div className="w-full">
      {blogPosts.map((b) => (
        <Card
          sx={{ backgroundColor: "#eeeeee" }}
          variant="outlined"
          className="m-5 p-5 flex justify-between items-center gap-10 w-full"
          key={b.id}
        >
          <div className="uppercase rounded-full bg-slate-900 w-10 h-10 flex items-center justify-center text-white font-extrabold">{b.userName.split('')[0]}{b.userName.split('')[1]}</div>
          <div>
            <h2 className="font-bold">{b.title}</h2>
            <div>{b.content}</div>
          </div>
          <div>
            {b.createdAt.split("T")[0]}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BlogPost;
