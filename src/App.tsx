import { Typography } from "@mui/material";
import CreatePost from "./CreatePost";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center gap-20">
        <Typography variant="h2">Mario's blog site</Typography>
        <div className="w-fit">
          <CreatePost />
        </div>
      </div>
    </>
  );
}

export default App;
