import React from "react";
import {
  HomeOutlined,
  InfoCircleOutlined,
  DatabaseOutlined,
  BuildOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import useStore from '../../../store/store';
import { sidebarElementIndexes } from "../../../constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const { Sider } = Layout;

  const sidebarSelectedElement = useStore.use.sidebarSelectedElement();
  const setSidebarSelectedElement = useStore.use.setSidebarSelectedElement();

  const sidebarMenuItems = [
    {
      icon: HomeOutlined,
      label: "Головна",
      path: "/",
    },
    {
      icon: BuildOutlined,
      label: "Формування",
      path: "/form-teams",
    },
    {
      icon: DatabaseOutlined,
      label: "Дані",
      children: [
        {
          label: "Спеціалізації",
          path: "/specializations",
        },
        {
          label: "Кандидати",
          path: "/candidates",
        },
        {
          label: "Сумісності",
          path: "/compatibilities",
        },
      ],
    },
    {
      icon: InfoCircleOutlined,
      label: "Інструкція",
      path: "/about",
    },
  ].map((item, index) => {
    let menuItem = {
      key: `${index + 1}`,
      icon: React.createElement(item.icon),
      label: item.label,
      onClick: () => {
        if (item.path) {
          setSidebarSelectedElement(sidebarElementIndexes[item.path]);
          navigate(item.path);
        }
      },
    };

    if (item?.children) {
      menuItem.children = item.children.map((subItem, j) => {
        const subKey = parseFloat(`${index + 1}.${j + 1}`)
        return {
          key: subKey,
          label: subItem.label,
          onClick: () => {
            if (subItem.path) {
              setSidebarSelectedElement(sidebarElementIndexes[subItem.path]);
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
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={sidebarSelectedElement}
        items={sidebarMenuItems}
      />
    </Sider>
  );
};

export default Sidebar;
