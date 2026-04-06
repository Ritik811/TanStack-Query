import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home";
import { FetchOld } from "./pages/FetchOld";
import { FetchRQ } from "./pages/FecthRQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fetchOld",
        element: <FetchOld />,
      },
      {
        path: "/fetchRQ",
        element: <FetchRQ />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
