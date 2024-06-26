import { Card } from "@mui/material";
import { useEffect, useState } from "react";

interface BlogPostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState<BlogPostType[] | null>(null);
  useEffect(() => {
    const getPost = async () => {
      const request = await fetch(
        "http://localhost:3000/blog-posts"
      );
      const response = await request.json();

      if (response) {
        setBlogPost(response);
       
      }
    };

    getPost();
  }, []);
  if (blogPost) {
    return (
      <>
        <div>
          {blogPost.map((b) => {
            return (
              <Card sx={{backgroundColor: '#eeeeee'}} variant="outlined" className="m-5 p-2" key={b.id}>
                <h2 className="font-bold">{b.title}</h2>
                <div>{b.body}</div>
              </Card>
            );
          })}
        </div>
      </>
    );
  }
};

export default BlogPost;
