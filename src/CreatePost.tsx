import { Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

const BlogPostSchema = z.object({
  blogTitle: z.string().min(2, { message: "Title must be 2 or more characters" }),
  blogBody: z.string().min(20, { message: "Content must be 20 or more characters" }),
  userId: z.number(),
});

const CreatePost = () => {
  const [formError, setFormError] = useState("");
  const [page, setPage] = useState(1);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");

  const handleSubmit = async () => {
    const validationResult = BlogPostSchema.safeParse({ blogTitle, blogBody, userId: 1 });

    if (!validationResult.success) {
      setFormError(validationResult.error.errors.map(err => err.message).join(", "));
      return;
    }

    const request = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ title: blogTitle, body: blogBody, userId: 1 }),
      }
    );
    const response = await request.json();

    if (response && response.id) {
      alert(`Success ${response.title}`);
    }
  };

  let content = null;

  if (page === 1) {
    content = (
      <div className="w-ful h-full">
        <Card variant="outlined" className="p-10 w-96 h-fit flex flex-col gap-5">
        <p>Page 1/2</p>
          <TextField
            label="Blog title"
            required
            error={!!formError}
            helperText={formError && formError.includes("characters") ? formError : ""}
            value={blogTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBlogTitle(e.target.value);
              setFormError("");
            }}
          />
          <Button onClick={() => setPage(2)} variant="contained">
            Next
          </Button>
        </Card>
      </div>
    );
  } else {
    content = (
      <div className="w-full h-full">
        <Card variant="outlined" className="p-10 w-96 h-fit flex flex-col gap-5">
        <p>Page 2/2</p>
          <TextField
            label="Blog content"
            required
            error={!!formError}
            helperText={formError && formError.includes("characters") ? formError : ""}
            value={blogBody}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBlogBody(e.target.value);
              setFormError("");
            }}
          />
          <div className="flex justify-center gap-2">
            <Button
              className="w-full"
              onClick={() => setPage(1)}
              variant="contained"
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={handleSubmit}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{content}</>;
};

export default CreatePost;
