import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import Login from "../admin/Login";
import Header from "../components/Header";
import AddMovie from "../admin/AddMovie";
import ManageMovie from "../admin/ManageMovie";
import EditMovie from "../admin/EditMovie";
import MovieDetail from "../components/MovieDetail";
import BookingHistory from "../admin/BookingHistory";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};

const AppRoutes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "admin/login",
          element: <Login />,
        },
        {
          path: "admin/add-movie",
          element: <AddMovie />,
        },
        {
          path: "admin/manage-movie",
          element: <ManageMovie />,
        },
        {
          path: "/edit/:id",
          element: <EditMovie />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "admin/bookings",
          element: <BookingHistory />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default AppRoutes;
