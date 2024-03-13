import React from "react";
import {
  HomeOutlined,
  InfoCircleOutlined, DatabaseOutlined
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const sidebarMenuItems = [
  {
    icon: HomeOutlined,
    label: 'Home'
  },
  {
    icon: DatabaseOutlined,
    label: 'User Data'
  },
  {
    icon: InfoCircleOutlined,
    label: 'About'
  },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.label
}));

const CompLayout = () => {
  const {
    token: { colorPrimary, colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken, 'broken');
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type, 'collapsed type');
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarMenuItems}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Flex justify="flex-end" align="center" style={{ fontSize: '20px', fontWeight: 600, color: `${colorPrimary}`, margin: '0px 15px' }}>
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
              
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            KPI {new Date().getFullYear()}, Created by Oksana Nedilko, IS-02
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default CompLayout;
