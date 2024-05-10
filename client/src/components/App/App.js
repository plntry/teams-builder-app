import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../../routes";

const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
