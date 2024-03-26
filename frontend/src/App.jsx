import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import DisplayQuestionPage from "./pages/DisplayQuestionPage";
import NotFoundPage from "./pages/NotFoundPage";

const route = [
  { path: "/", element: <LoginPage /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/quiz",
        element: <DisplayQuestionPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(route);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
