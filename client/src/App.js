import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";
import Candidates from "./components/Candidates";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <Spin />,
      // loader: <Spin />,
      children: [
        {
          path: "candidates",
          element: <Candidates />
        },
        {
          path: "candidates/:candidateId",
          element: <div>candidate</div>
        },
        {
          path: "compatibilities",
          element: <Candidates />
        },
        {
          path: "compatibilities/:compatibilityId",
          element: <div>compatibility</div>
        }
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
