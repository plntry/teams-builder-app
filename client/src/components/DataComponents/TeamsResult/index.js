import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, List, Typography, Tag, Card, Statistic } from "antd";
import useStore from "../../../store/store";
import BeeAlgorithm from "../../../beeAlgorithm";
import getSpecializationColor from "../../../utils/getSpecializationColor";

const TeamsResult = () => {
  const navigate = useNavigate();

  const itemNames = useStore.use.itemNames();
  const compData = useStore.use.compData();

  const algorithmResult = useStore.use.algorithmResult();
  const setAlgorithmResult = useStore.use.setAlgorithmResult();

  const candidates = useStore.use.candidates();

  const useCustomParametersValues = useStore.use.useCustomParametersValues();

  const areaSize = useStore.use.areaSize();
  const bestSize = useStore.use.bestSize();
  const noImprovementsNum = useStore.use.noImprovementsNum();
  const amountOfMutations = useStore.use.amountOfMutations();

  const teamsList = [];

  useEffect(() => {
    let params = [itemNames, compData];

    if (useCustomParametersValues) {
      params = [
        itemNames,
        compData,
        +areaSize,
        +bestSize,
        +noImprovementsNum,
        +amountOfMutations,
      ];
    }

    const beeAlgorithm = new BeeAlgorithm(...params);
    setAlgorithmResult(beeAlgorithm.run());
  }, []);

  algorithmResult.finalSolution.forEach((teamArray, i) => {
    let data = [];

    teamArray.forEach((el) => {
      let candId = el.split("-")[1];

      let candidateInfo = candidates.filter(
        (cand) => cand.candidate_id === +candId
      )[0];

      data.push(candidateInfo);
    });

    teamsList.push({
      header: <Typography.Title level={4}>Команда {i + 1}</Typography.Title>,
      data: data,
      renderItem: (item) => {
        return (
          <List.Item>
            <Flex gap="7px">
              <Typography>{item.fullname}</Typography>
              <Tag color={getSpecializationColor(item.specialization_name)}>
                {item.specialization_name}
              </Tag>
            </Flex>
          </List.Item>
        );
      },
    });
  });

  return (
    <Flex vertical gap="20px" wrap="wrap" justify="center" align="center">
      <Typography.Title level={2}>Команди було сформовано</Typography.Title>
      <Flex gap="20px" wrap="wrap" justify="center" align="center">
        {teamsList.map((el, i) => {
          return (
            <List
              style={{ minWidth: "300px" }}
              key={`test_${i}`}
              size="large"
              header={el.header}
              bordered
              dataSource={el.data}
              renderItem={el.renderItem}
            />
          );
        })}
      </Flex>
      <Flex justify="center" align="center" gap="50px">
        <Flex justify="center" align="center" gap="20px">
          <Flex vertical gap="20px">
            <Card bordered={true}>
              <Statistic
                title="Область пошуку"
                value={useCustomParametersValues ? areaSize : 8}
                precision={0}
                valueStyle={{
                  color: "#d48806",
                }}
              />
            </Card>
            <Card bordered={true}>
              <Statistic
                title="Найкращі рішення"
                value={useCustomParametersValues ? bestSize : 2}
                precision={0}
                valueStyle={{
                  color: "#d48806",
                }}
              />
            </Card>
          </Flex>
          <Flex vertical gap="20px">
            <Card bordered={true}>
              <Statistic
                title="Ітерації без покращення"
                value={useCustomParametersValues ? noImprovementsNum : 5}
                precision={0}
                valueStyle={{
                  color: "#d48806",
                }}
              />
            </Card>
            <Card bordered={true}>
              <Statistic
                title="Кількість мутацій"
                value={useCustomParametersValues ? amountOfMutations : 2}
                precision={0}
                valueStyle={{
                  color: "#d48806",
                }}
              />
            </Card>
          </Flex>
        </Flex>
        <Flex vertical justify="center" align="center" gap="20px">
          <Card bordered={true}>
            <Statistic
              title="Загальна сумісність"
              value={algorithmResult.maxProductValue}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
            />
          </Card>
          <Flex gap="20px">
            <Card bordered={true}>
              <Statistic
                title="Кількість ітерацій"
                value={algorithmResult.performanceData.iterationsCount}
                precision={0}
                valueStyle={{
                  color: "#108ee9",
                }}
              />
            </Card>
            <Card bordered={true}>
              <Statistic
                title="Час роботи"
                value={algorithmResult.performanceData.timeTaken}
                precision={2}
                valueStyle={{
                  color: "#108ee9",
                }}
                suffix="ms"
              />
            </Card>
          </Flex>
        </Flex>
      </Flex>
      <Button
        type="dashed"
        style={{ maxWidth: "300px" }}
        onClick={() => navigate("/form-teams")}
      >
        Повернутись до вибору кандидатів
      </Button>
    </Flex>
  );
};

export default TeamsResult;
