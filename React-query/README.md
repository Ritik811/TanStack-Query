.......................Start Learning TanStack Query............................

Step 1. sabse pahel QueryClientProvide ke under apne app ko rap krna hai pure code ko
Code:- <QueryClientProvider>
      <RouterProvider router={router}></RouterProvider>;
    </QueryClientProvider> 

Step 2. hame QueryClient ko create krna pdta hai or usko QueryClientProvider ke under clent ke under pass krna pdta hai like props
Code:- 
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
    </QueryClientProvider>
  );
};

Step 3. How to Fetch Data
1. useQuery hook ka use krna pdta hai 
Code:- 

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


const { data } = useQuery({
    queryKey: ["posts"], // Yah hamara key ki traf hota hai jo bhi kux ham [''] ke under likhte hai uske base pr page render hota hai
    queryFn: getPostData, // yah pr woh function likhna pdta hai jo api se data lkr ata hai iske last ham () use nhi krte hai 
  });

  or iske under direct destructring use hoti hai {data} or bhi bhaut kux hota hai

  