import { useEffect, useState } from "react";

interface BlogPos {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState<BlogPos[] | null>(null);
  useEffect(() => {
    const getPost = async () => {
      const request = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=1"
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
            return <div key={b.id}>{b.title}</div>;
          })}
        </div>
      </>
    );
  }else{
    return <></>
  }
};

export default BlogPost