import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fecthPostIndv } from "../API/api";

export const FetchIndv = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fecthPostIndv(id),
  });

  if (isPending) return <h1>... Loading</h1>;
  if (isError) return <h1>Error: {error.message || "something went wrong"}</h1>;

  return (
    <section className="section-accordion">
      <h1>Post ID Number: {id} </h1>
      <div>
        <p>ID: {data.id}</p>
        <p>TITLE: {data.title} </p>
        <p>BODY: {data.body}</p>
      </div>
      <NavLink to="/rq">
        <button>Go Back</button>
      </NavLink>
    </section>
  );
};
