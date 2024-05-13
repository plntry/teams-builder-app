import React from "react";
import { Flex, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import useStore from '../../store/store';
import { sidebarElementIndexes } from "../../constants";

const HomePage = () => {
  const navigate = useNavigate();
  const setSidebarSelectedElement = useStore.use.setSidebarSelectedElement();

  const {
    token: { colorText },
  } = theme.useToken();

  const handleNavigate = (link) => {
    console.log(sidebarElementIndexes[link], 'sidebarElementIndexes[link]');
    setSidebarSelectedElement(sidebarElementIndexes[link]);
    navigate(link);
  }

  return (
    <Flex
      vertical="true"
      justify="space-between"
      gap={"10px"}
      style={{ margin: "15px 15px", minHeight: "300px" }}
    >
      <Flex
        justify="flex-start"
        align="center"
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: `${colorText}`,
        }}
      >
        Save your data about specializations, candidates and compatibilities
      </Flex>
      <Flex
        vertical="true"
        gap="20px"
        justify="center"
        align="center"
        wrap
        style={{
          margin: "25px 15px",
        }}
      >
        <Button type="primary" size="large" onClick={() => handleNavigate('/form-teams')}>
          Start forming teams
        </Button>
        <Button type="dashed" onClick={() => handleNavigate('/about')}>Learn more</Button>
      </Flex>
      <Flex
        justify="flex-end"
        align="center"
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: `${colorText}`,
        }}
      >
        Form teams with the best synergy
      </Flex>
    </Flex>
  );
};

export default HomePage;
