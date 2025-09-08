import { useEffect, useState } from "react";
import type { IPostModel } from "../utils/inteerfaces";
import { APIURLS } from "../utils/APIURLS";
import { get } from "../utils/httpEntity.service";

function Posts() {
  const [posts, setPosts] = useState<IPostModel[]>([]);

  useEffect(() => {
    get(APIURLS.POSTS).then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} (userId: {p.userId})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
