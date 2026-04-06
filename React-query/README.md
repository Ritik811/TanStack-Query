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
