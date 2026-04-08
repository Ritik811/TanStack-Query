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

2. iske under hame isPending or Error or error bhi access milta hai isko ham direct access kr skte hai or uske baad use kr skte hai 
  code:- 
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
  });

  if (isPending) return <p>.....Loading</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong"}</p>;

3. What is saltTime 
defination:- saltTime ka use tb kiya jata jb hame pata hai ki hara data kitne time ke baad update hoga q ki react-query pahele hi data cach memory me store kr leti hai or direct wahi se data fetch krti hai lakin api ko call hr baar jata hai pr hame pta hai ki hamara data 1 hours ke baad update hoga toh ham saltTime ka use kr skte hai. 
code:- 
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    staleTime: 5000, // har 5 sec ke baad api ko call kr dena 
  });

4. What is Garbage Collection(gcTime)
defination:- jaha pr hamara wast material pra hota hai jiska koi kam nhi hot hai har 5 min ke baad refres hota hai
code:- 
const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    gcTime: 5000, // yah hamne time badal diya ab har 5 sec ke baad cach clear hoga
    staleTime: 5000, 
  });

5. What is Polling in React Query
defination:- Polling ka mtlb hai ki har second data kaise update hoga woh bhi live uske liye ham refechInterval ka use krte hai lkin ager ham dusre tab pr chle jate hai toh data call hona band ho jata hai agr ham chahate hai data fecth hona band na ho toh ham refetchIntervalInBackground ka use krte hai usko true kr dete hai
code:- 
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    <!-- staleTime: 5000, --> // isko use nhi krna hota hai refecthInterval ke sath
    refetchInterval: 1000, // yah kitne der bad data fecth krna hai 
    refetchIntervalInBackground: true, // agr ham new tab pr bhi chle jate hai fir bhi data fecth hona chahiye 
  });

6. What is pagination
defination:- Pagination kya mtlb website ke end me prev or next ka button so krta hai page number show krta or ham next pr click kr ke dusre page pa jate hai or prev pr click kr ke back aajate hai 
code:- 

  export const fetchPostData = (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`); // yah limit hai jo utna hi data show hota hai ek page pr
  };
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false} 
          onClick={() => setPageNumber((prev) => prev - 3)} // iska mtlb hai ki hame 1 page pr 3 show ho rhe hai woh sab 3 data change ho jayenge 
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: getPostData,
    placeholderData: keepPreviousData, iske mtlb jb ham next pr click krte hai toh api ko call hota hai toh data ane me time lgta hai toh yah loading nhi dikhata hai yah prev wala data hi show krta hai jab tk data load nhi ho jata
  });


7. What is useMutation 
defination:- iska use ham tb krte hai hame data ko updat creat or delete krna prta or data ko read krne ke liye ham useQuery ka use krte hai

1. Delete Data 
Step 1. iskro create krte hai 

// Yah axios ka path hai 
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

  // yah code ka path hai
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id), // function hai deltePost(id) yah api jaha pr data delete hoga axiso ke madat se 
  });

Step 2. 
code:- // ise call krna deleteMutation.mutate() ka use krke 
 <button onClick={() => deleteMutation.mutate(id)}>Delete</button>

Step 3. 
code:- 
const queryClient = useQueryClient(); // iska use ham useQuery ke cach se data lane ke lye krte hai 

const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => { // jab success ho jaye toh data delte kr do
      queryClient.setQueriesData(["posts", pageNumber], (curEle) => { // iske under do chize hoti hai pahele kon se queryKey ka data delte krna or dusra wah data 
        return curEle.filter((post) => post.id !== id);
      });
    },
  });


  