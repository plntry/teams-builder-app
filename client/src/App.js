import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";

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
          element: <div>candidates</div>,
          // children: [
          //   {
          //     path: ":candidateId",
          //     element: <div>candidate</div>
          //   }
          // ]
        },
        {
          path: "candidates/:candidateId",
          element: <div>candidate</div>
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
