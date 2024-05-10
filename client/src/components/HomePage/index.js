import React from "react";
import { Flex, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    token: { colorText },
  } = theme.useToken();

  const handleLearnMoreClick = () => {
    navigate('/about');
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
        <Button type="primary" size="large" style>
          Start forming teams
        </Button>
        <Button type="dashed" onClick={handleLearnMoreClick}>Learn more</Button>
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
