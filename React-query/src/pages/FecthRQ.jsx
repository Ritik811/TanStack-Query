import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPostData } from "../components/API/api";
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
        {data.map((curPost) => {
          const { title, id, body } = curPost;
          return (
            <>
              <NavLink to={`/rq/${id}`}>
                <li key={id}>
                  <p>ID: {id}</p>
                  <p>TITLE: {title}</p>
                  <p>BODY: {body}</p>
                </li>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            </>
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
