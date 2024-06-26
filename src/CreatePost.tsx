import { Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

const BlogPostScema = z.object({
  blogTitle: z.string().min(2, { message: "Must be 2 or more characters" }),
  blogBody: z.string().min(20, { message: "Must be 20 or more characters" }),
  userId: z.number(),
});

const CreatePost = () => {
  const [onFormError, setOnFormError] = useState(false)
  const [page, setPage] = useState(1);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");

  const handleSubmit = async () => {
    if (blogTitle.length < 2 || blogBody.length < 20) {
      return setOnFormError(true);
    } else {
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
        alert(`Succes ${response.title}`);
      }
    }
  };

  let content = null;
  if (page === 1) {
    content = (
      <>
        <div className="form-container">
          <Card>
            <TextField
              label="Blog title"
              required
              error={onFormError}
              value={blogTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBlogTitle(e.target.value)
              }
            ></TextField>
            <Button onClick={() => setPage(2)} variant="contained">
              Next
            </Button>
          </Card>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="form-container">
          <Card>
            <TextField
              label="Blog content"
              required
              error={onFormError}
              value={blogBody}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBlogBody(e.target.value)
              }
            ></TextField>
            <Button onClick={() => setPage(1)} variant="contained">
              Back
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Card>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default CreatePost;
