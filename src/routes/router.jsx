import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Page404 from "../pages/Page404.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Services from "../pages/Services.jsx";
import ServicesDetails from "../pages/ServicesDetails.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import AllServices from "../pages/AllServices.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import SupportUs from "../pages/SupportUs.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/all-services",
    element: <AllServices />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/support-us",
    element: <SupportUs />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/services",
    Component: Services,
    children: [
      {
        path: ":id",
        element: <ServicesDetails />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    Component: Page404,
  },
]);

export default router;
