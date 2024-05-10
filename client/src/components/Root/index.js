import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import MainRegion from "./MainRegion";

const Root = () => {
  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <MainRegion />
      </Layout>
    </div>
  );
};

export default Root;
