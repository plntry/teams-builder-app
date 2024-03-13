import React from "react";
import {
  HomeOutlined,
  InfoCircleOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  const sidebarMenuItems = [
    {
      icon: HomeOutlined,
      label: "Home",
      path: '/',
    },
    {
      icon: DatabaseOutlined,
      label: "Data",
      children: [
        {
          label: "Candidates",
          path: '/candidates'
        },
        {
          label: "Specializations",
          path: '/specializations'
        },
        {
          label: "Compatibilities",
          path: '/compatibilities'
        }
      ]
    },
    {
      icon: InfoCircleOutlined,
      label: "About",
      path: '/about',
    },
  ].map((item, index) => {
    let menuItem = {
      key: `${index + 1}`,
      icon: React.createElement(item.icon),
      label: item.label,
      onClick: () => {
        // console.log(`${index + 1}`);
        if (item.path) {
          navigate(item.path);
        }
      }
    }

    if (item?.children) {
      menuItem.children = item.children.map((subItem, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: subItem.label,
          onClick: () => {
            if (subItem.path) {
              console.log(subItem.path);
              navigate(subItem.path);
            }
          }
        };
      })
    }

    return menuItem;
  });

  const {
    token: { colorPrimary, colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onClick={onClick}
          onBreakpoint={(broken) => {
            console.log(broken, "broken");
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type, "collapsed type");
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarMenuItems}
          />
          {/* <Menu.Item>
                <span className="nav-text">Login</span>
            </Menu.Item>
          </Menu> */}
        </Sider>
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
      </Layout>
    </div>
  );
};

export default Root;
