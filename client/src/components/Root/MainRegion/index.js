import React from "react";
import { Flex, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const MainRegion = () => {
  const { Header, Content, Footer } = Layout;

  const {
    token: { colorPrimary, colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex
          justify="flex-end"
          align="center"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: `${colorPrimary}`,
            margin: "0px 15px",
          }}
        >
          Teams Former
        </Flex>
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        KPI {new Date().getFullYear()}, Created by Oksana Nedilko, IS-02
      </Footer>
    </Layout>
  );
};

export default MainRegion;
