import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPostData, updatePost } from "../components/API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  const getPostData = async () => {
    try {
      const res = await fetchPostData(pageNumber);
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueriesData(["posts", pageNumber], (curEle) => {
        return curEle.filter((post) => post.id !== id);
      });
    },
  });

  // Updat Data
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId);

      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: getPostData,
    placeholderData: keepPreviousData,
  });

  if (isPending) return <p>.....Loading</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};
