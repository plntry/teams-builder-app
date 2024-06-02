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

  const useCustomParametersValues = useStore.use.useCustomParametersValues();
  const setUseCustomParametersValues =
    useStore.use.setUseCustomParametersValues();

  const areaSize = useStore.use.areaSize();
  const setAreaSize = useStore.use.setAreaSize();

  const bestSize = useStore.use.bestSize();
  const setBestSize = useStore.use.setBestSize();

  const noImprovementsNum = useStore.use.noImprovementsNum();
  const setNoImprovementsNum = useStore.use.setNoImprovementsNum();

  const amountOfMutations = useStore.use.amountOfMutations();
  const setAmountOfMutations = useStore.use.setAmountOfMutations();

  const setItemNames = useStore.use.setItemNames();
  const setCompData = useStore.use.setCompData();

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

  const useCustomParametersValuesCheckboxChange = (e) => {
    setUseCustomParametersValues(e.target.checked);
  };

  const areaSizeInputChange = (value) => {
    setAreaSize(value);
  };

  const bestSizeInputChange = (value) => {
    setBestSize(value);
  };

  const noImprovementsNumInputChange = (value) => {
    setNoImprovementsNum(value);
  };

  const amountOfMutationsInputChange = (value) => {
    setAmountOfMutations(value);
  };

  const formDataForBeeAlgorithm = () => {
    let itemNames = [];
    let compData = {};

    for (const specId in chosenSpecializations) {
      let specializationCandidates = [];

      chosenCandidates.forEach((id) => {
        let candidatesFromSpecialization = candidates.filter(
          (el) => el.candidate_id === +id && el.specialization_id === +specId
        );

        if (candidatesFromSpecialization.length) {
          let candidateInfo = candidatesFromSpecialization[0];
          specializationCandidates.push(
            `${specId}-${candidateInfo.candidate_id}`
          );
        }
      });

      itemNames.push(specializationCandidates);
    }
    console.log(itemNames, "item names");

    compatibilities.forEach((el) => {
      let id1 = el.candidate1_id;
      let id2 = el.candidate2_id;

      let candidate1 = candidates.filter(
        (cand) => cand.candidate_id === +id1
      )[0];
      let candidate2 = candidates.filter(
        (cand) => cand.candidate_id === +id2
      )[0];

      let spec1 = candidate1.specialization_id;
      let spec2 = candidate2.specialization_id;

      compData[`${spec1}-${id1}~${spec2}-${id2}`] = el.compatibility;
    });

    console.log(compData, "comp data test");

    setItemNames(itemNames);
    setCompData(compData);
  };

  const onSubmitFormClick = () => {
    const specializationRepeats = Object.values(chosenSpecializations);
    const isSameAmount = specializationRepeats.every(
      (value) => value === specializationRepeats[0]
    );
    const isAmountMoreThanOne = specializationRepeats.every(
      (value) => value > 1
    );
    const checkCompatibilitiesDataRes = checkCompatibilitiesData(
      chosenCandidates,
      candidates,
      compatibilities
    );

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
    } else if (!isAmountMoreThanOne) {
      messageApi.open({
        type: "error",
        content:
          "The amount of the candidates from every specialization should be more than 1",
      });
    } else if (!checkCompatibilitiesDataRes.isFullData) {
      messageApi.open({
        type: "error",
        content: (
          <>
            The compatibility data is missed for the next pairs:
            <div>
              {checkCompatibilitiesDataRes.pairs.map((pair) => (
                <div>{pair}</div>
              ))}
            </div>
          </>
        ),
      });
    } else {
      formDataForBeeAlgorithm();
      navigate("/teams-result");
    }
  };

  const customParametersElements = [
    {
      label: "Area Size",
      disabled: !useCustomParametersValues ?? true,
      min: 5,
      max: 30,
      defaultValue: areaSize,
      step: 1,
      onChange: areaSizeInputChange,
      tooltip: 'The size of the search area. This parameter determines the number of candidate solutions generated in the initial search area and in subsequent iterations'
    },
    {
      label: "Best Size",
      disabled: !useCustomParametersValues ?? true,
      min: 1,
      max: 10,
      defaultValue: bestSize,
      step: 1,
      onChange: bestSizeInputChange,
      tooltip: 'The number of best solutions to be retained and used for generating new solutions in each iteration'
    },
    {
      label: "No Improvements Number",
      disabled: !useCustomParametersValues ?? true,
      min: 1,
      max: 30,
      defaultValue: noImprovementsNum,
      step: 1,
      onChange: noImprovementsNumInputChange,
      tooltip: 'The maximum number of iterations allowed without improvement in the best solution found'
    },
    {
      label: "Amount Of Mutations",
      disabled: !useCustomParametersValues ?? true,
      min: 1,
      max: 10,
      defaultValue: amountOfMutations,
      step: 1,
      onChange: amountOfMutationsInputChange,
      tooltip: 'The number of mutations in every iteration'
    },
  ];

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
      name: `shouldUseCustomParametersValues`,
      element: (
        <Flex vertical justify="center" align="center" gap="10px">
          {contextHolder}
          <Checkbox
            checked={useCustomParametersValues}
            onChange={useCustomParametersValuesCheckboxChange}
          >
            <Flex gap="8px">
              Use Custom Algorithm Parameters
              <Tooltip title="The ability to set a custom parameters for bee algorithm">
                <QuestionCircleOutlined />
              </Tooltip>
            </Flex>
          </Checkbox>
          <Flex vertical gap="10px" justify="start" align="end">
            {customParametersElements.map((el, i) => {
              return (
                <Flex
                  gap="7px"
                  justify="center"
                  align="center"
                  key={`customParam_${i}`}
                >
                  <Flex gap="8px">
                    <Tooltip title={el.tooltip}>
                      <QuestionCircleOutlined />
                    </Tooltip>
                    <Typography>{el.label}:</Typography>
                  </Flex>
                  <InputNumber
                    disabled={el.disabled}
                    min={el.min}
                    max={el.max}
                    defaultValue={el.defaultValue}
                    stringMode
                    step={el.step}
                    style={{ minWidth: "120px" }}
                    onChange={el.onChange}
                  />
                </Flex>
              );
            })}
          </Flex>
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
