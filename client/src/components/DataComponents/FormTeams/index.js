import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Button,
  Checkbox,
  Form,
  Transfer,
  Tag,
  Typography,
  message,
  Tooltip,
  InputNumber,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useStore from "../../../store/store";
import apiHelper from "../../../api/helper";
import checkCompatibilitiesData from "./validationHelper";

const FormTeams = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useStore.setState(useStore.getState());

  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  const chosenSpecializations = useStore.use.chosenSpecializations();
  const setChosenSpecializations = useStore.use.setChosenSpecializations();

  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();

  const chosenCandidates = useStore.use.chosenCandidates();
  const setChosenCandidates = useStore.use.setChosenCandidates();

  const compatibilities = useStore.use.compatibilities();

  const useCustomIterationsNumber = useStore.use.useCustomIterationsNumber();
  const setUseCustomIterationsNumber = useStore.use.setUseCustomIterationsNumber();

  const iterationsAmount = useStore.use.iterationsAmount();
  const setIterationsAmount = useStore.use.setIterationsAmount();

  const [targetKeys, setTargetKeys] = useState(chosenCandidates);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (!specializations.length) {
      async function getData() {
        const retrievedData = await apiHelper.specializations.get();
        setSpecializations(retrievedData);
      }

      getData();
    }
  }, []);

  useEffect(() => {
    let chosenSpecializationsToSet = {};

    chosenCandidates.forEach((id) => {
      let candidate = candidates[id - 1];

      if (
        !chosenSpecializationsToSet.hasOwnProperty(candidate.specialization_id)
      ) {
        chosenSpecializationsToSet[candidate.specialization_id] = 0;
      }

      chosenSpecializationsToSet[candidate.specialization_id] += 1;
    });

    setChosenSpecializations(chosenSpecializationsToSet);
  }, [candidates, chosenCandidates, setChosenCandidates]);

  useEffect(() => {
    if (specializations.length > 0 && !candidates.length) {
      async function getData() {
        const retrievedData = await apiHelper.candidates.get(specializations);
        setCandidates(retrievedData);
      }

      getData();
    }
  }, [specializations]);

  const candidatesDataSource = candidates.map((el) => ({
    key: el.key,
    fullname: el.fullname,
    specialization_name: el.specialization_name,
  }));

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    setChosenCandidates(newTargetKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const useCustomIterationsNumberCheckboxChange = (e) => {
    setUseCustomIterationsNumber(e.target.checked);
  };

  const iterationsAmountInputChange = (value) => {
    setIterationsAmount(value);
  };

  const onSubmitFormClick = () => {
    const specializationRepeats = Object.values(chosenSpecializations);
    const isSameAmount = specializationRepeats.every(
      (value) => value === specializationRepeats[0]
    );
    const checkCompatibilitiesDataRes = checkCompatibilitiesData(chosenCandidates, candidates, compatibilities);

    if (!chosenCandidates.length) {
      messageApi.open({
        type: "error",
        content: "You should choose candidates first",
      });
    } else if (!isSameAmount) {
      messageApi.open({
        type: "error",
        content:
          "The amount of the candidates should be the same for every specialization",
      });
    } else if (!(checkCompatibilitiesDataRes.isFullData)) {
      messageApi.open({
        type: "error",
        content: <>
          The compatibility data is missed for the next pairs:
          <div>{(checkCompatibilitiesDataRes.pairs).map((pair) => <div>{pair}</div>)}</div>
        </>,
      });
    } else {
      navigate('/teams-result');
    }
  };

  const formElements = [
    {
      label: "Select target candidates to form the teams",
      name: `chosenCandidates`,
      element: (
        <Flex justify="center" align="center" gap="30px">
          <Transfer
            dataSource={candidatesDataSource}
            titles={["Source", "Target"]}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            render={(item) => {
              return (
                <Flex gap="7px">
                  <Typography>{item.fullname}</Typography>
                  <Tag
                    color={
                      item.specialization_name === "manager"
                        ? "purple"
                        : item.specialization_name === "developer"
                        ? "cyan"
                        : item.specialization_name === "designer"
                        ? "volcano"
                        : "green"
                    }
                  >
                    {item.specialization_name}
                  </Tag>
                </Flex>
              );
            }}
            oneWay
            listStyle={{
              width: "auto",
              minWidth: "300px",
              height: 300,
            }}
          />
        </Flex>
      ),
    },
    {
      label: "",
      name: `shouldUseCustomIterationsNumber`,
      element: (
        <Flex vertical justify="center" align="center">
          {contextHolder}
          <Checkbox
            checked={useCustomIterationsNumber}
            onChange={useCustomIterationsNumberCheckboxChange}
          >
            <Flex gap="8px">
              Use Custom Iterations Number
              <Tooltip title="The ability to set a custom number of iterations for the local search algorithm">
                <QuestionCircleOutlined />
              </Tooltip>
            </Flex>
          </Checkbox>
          <InputNumber
            disabled={!useCustomIterationsNumber ?? true}
            min={100}
            max={10000000}
            defaultValue={iterationsAmount}
            stringMode
            step="1"
            style={{ minWidth: "120px" }}
            onChange={iterationsAmountInputChange}
          />
        </Flex>
      ),
    },
    {
      label: "",
      name: `formTeamsButton`,
      element: (
        <Flex vertical justify="center" align="center">
          {contextHolder}
          <Button type="primary" htmlType="submit" onClick={onSubmitFormClick}>
            Form the teams
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <Flex vertical>
      <Form
        name="formTeams"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        {formElements.map((el) => {
          return (
            <Form.Item
              label={el.label}
              labelCol
              rules={el.rules}
              key={el.name}
              valuePropName={el.valuePropName}
            >
              {el.element}
            </Form.Item>
          );
        })}
      </Form>
    </Flex>
  );
};

export default FormTeams;
