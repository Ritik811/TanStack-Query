import { useQuery } from "@tanstack/react-query";
import { fetchPostData } from "../components/API/api";

export const FetchRQ = () => {
  const getPostData = async () => {
    try {
      const res = await fetchPostData();
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    staleTime: 5000,
  });

  if (isPending) return <p>.....Loading</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data.map((curPost) => {
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
