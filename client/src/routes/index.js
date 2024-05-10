import React from "react";
import Root from "../components/Root";
import Candidates from "../components/DataComponents/candidates/Candidates";
import Specializations from "../components/DataComponents/specializations/Specializations";
import Compatibilities from "../components/DataComponents/compatibilities/Compatibilities";

const routes = [
  {
    path: "/",
    element: <Root />,
    // errorElement: <Spin />,
    // loader: <Spin />,
    children: [
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "candidates/:candidateId",
        element: <div>candidate</div>,
      },
      {
        path: "specializations",
        element: <Specializations />,
      },
      {
        path: "specializations/:specializationId",
        element: <div>specialization</div>,
      },
      {
        path: "compatibilities",
        element: <Compatibilities />,
      },
      {
        path: "compatibilities/:compatibilityId",
        element: <div>compatibility</div>,
      },
    ],
  },
];

export default routes;
