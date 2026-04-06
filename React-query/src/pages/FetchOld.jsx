import { useEffect, useState } from "react";
import { fetchPostData } from "../components/API/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const getPostData = async () => {
    const res = await fetchPostData();
    if (res.status === 200) {
      setPosts(res.data);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div>
      <ul className="section-accordion">
        {posts.map((curPost) => {
          const { title, id, body } = curPost;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
