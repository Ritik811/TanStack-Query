import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../components/API/api";
import { useEffect } from "react";

export const InfiniteScrolling = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight; // Poore page ki height
    const scrollTop = document.documentElement.scrollTop; // Kitna niche scroll kiya
    const innerHeight = window.innerHeight; // Browser window ki height

    // Agar (niche ka gap) + (window height) >= total height, toh end aa gaya
    if (innerHeight + scrollTop >= scrollHeight - 5) {
      // 5px ka margin safe rehta hai
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  if (status === "loading")
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  if (status === "error") return <div>Error fetching data</div>;
  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>
      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      {/* {/* <div ref={ref} style={{ padding: "20px", textAlign: "center" }}> */}
      {isFetchingNextPage
        ? "Loading more..."
        : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      {/* </div> } */}
    </div>
  );
};
