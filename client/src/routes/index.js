import React from "react";
import Root from "../components/Root";
import Candidates from "../components/DataComponents/candidates/index";
import Specializations from "../components/DataComponents/specializations/index";
import Compatibilities from "../components/DataComponents/compatibilities/index";
import HomePage from "../components/HomePage";
import FormTeams from "../components/DataComponents/FormTeams";
import TeamsResult from "../components/DataComponents/TeamsResult";
import About from "../components/About";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
      {
        path: "form-teams",
        element: <FormTeams />,
      },
      {
        path: "teams-result",
        element: <TeamsResult />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default routes;
