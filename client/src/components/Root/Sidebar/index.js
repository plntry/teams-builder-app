import React from "react";
import {
  HomeOutlined,
  InfoCircleOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { Sider } = Layout;

  const sidebarMenuItems = [
    {
      icon: HomeOutlined,
      label: "Home",
      path: "/",
    },
    {
      icon: DatabaseOutlined,
      label: "Data",
      children: [
        {
          label: "Specializations",
          path: "/specializations",
        },
        {
          label: "Candidates",
          path: "/candidates",
        },
        {
          label: "Compatibilities",
          path: "/compatibilities",
        },
      ],
    },
    {
      icon: InfoCircleOutlined,
      label: "About",
      path: "/about",
    },
  ].map((item, index) => {
    let menuItem = {
      key: `${index + 1}`,
      icon: React.createElement(item.icon),
      label: item.label,
      onClick: () => {
        if (item.path) {
          navigate(item.path);
        }
      },
    };

    if (item?.children) {
      menuItem.children = item.children.map((subItem, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: subItem.label,
          onClick: () => {
            if (subItem.path) {
              navigate(subItem.path);
            }
          },
        };
      });
    }

    return menuItem;
  });
  return (
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
    </Sider>
  );
};

export default Sidebar;
