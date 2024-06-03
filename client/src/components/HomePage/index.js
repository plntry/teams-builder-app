import React from "react";
import { Flex, Button, theme, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import { sidebarElementIndexes } from "../../constants";

const HomePage = () => {
  const navigate = useNavigate();
  const setSidebarSelectedElement = useStore.use.setSidebarSelectedElement();

  const {
    token: { colorText, colorPrimary },
  } = theme.useToken();

  const contentStyle = {
    margin: 0,
    height: "360px",
    color: "white",
    lineHeight: "360px",
    fontSize: "26px",
    textAlign: "center",
    background: "none",
    border: "none",
    textWrap: "wrap",
  };

  const handleNavigate = (link) => {
    setSidebarSelectedElement(sidebarElementIndexes[link]);
    navigate(link);
  };

  return (
    <Flex
      vertical="true"
      justify="space-between"
      gap={"10px"}
      style={{ margin: "15px 15px", minHeight: "300px" }}
    >
      <Flex justify="center" align="center">
        <Carousel
          autoplay
          style={{
            display: "flex",
            margin: "25px 15px",
            width: "75vw",
            height: "100%",
            borderRadius: "10px",
            border: `1px solid ${colorPrimary}`,
            background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, ${colorPrimary} 35%, rgba(0,212,255,1) 100%)`,
          }}
        >
          <div>
            <h3 style={contentStyle}>Додайте дані</h3>
          </div>
          <div>
            <h3 style={contentStyle}>Сформуйте команди з найкращою сумісністю</h3>
          </div>
        </Carousel>
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
        <Button
          type="primary"
          size="large"
          onClick={() => handleNavigate("/form-teams")}
        >
          Почати формування команд
        </Button>
        <Button type="dashed" onClick={() => handleNavigate("/about")}>
          Дізнатись більше
        </Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;
