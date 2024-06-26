import { Typography } from "@mui/material";
import { useState } from "react";
import CreatePost from "./CreatePost";
import BlogPost from "./BlogPost";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center p-2 mt-10 gap-0">
        <Typography className="text-white font-extrabold" variant="h2">
          Mario's blog site
        </Typography>
        <div className="w-full p-16">
          <h2 className="text-white font-extrabold">Send new blogpost</h2>
          <CreatePost onPostCreated={handleRefresh} />
        </div>
        <div className="p-10 w-full">
          <h2 className="text-white font-extrabold">Blogs</h2>
          <BlogPost refresh={refresh} />
        </div>
      </div>
    </>
  );
}

export default App;
