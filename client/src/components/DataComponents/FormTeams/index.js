import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Transfer,
  Table,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import useStore from "../../../store/store";
import apiHelper from "../../../api/helper";

const FormTeams = () => {
  useStore.setState(useStore.getState());

  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  const chosenSpecializations = useStore.use.chosenSpecializations();
  const setChosenSpecializations = useStore.use.setChosenSpecializations();

  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();

  const chosenCandidates = useStore.use.chosenCandidates();
  const setChosenCandidates = useStore.use.setChosenCandidates();

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
      chosenSpecializationsToSet[candidate.specialization_id] = candidate.specialization_name;
    });
    console.log(chosenSpecializationsToSet, 'chosenSpecializationsToSet');
    setChosenSpecializations(chosenSpecializationsToSet);

  }, [candidates, chosenCandidates, setChosenCandidates])

  useEffect(() => {
    if (specializations.length > 0 && !candidates.length) {
      async function getData() {
        const retrievedData = await apiHelper.candidates.get(specializations);
        setCandidates(retrievedData);
      }

      getData();
    }
  }, [specializations]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let specializationOptions = specializations.map((el) => {
    return {
      label: el.name,
      value: el.specialization_id,
    };
  });

  // const onSpecializationCheckboxesChange = (list) => {
  //   setCheckedSpecializationsList(list);
  //   setCheckAllSpecializations(list.length === specializationOptions.length);
  // };

  // const onCheckAllSpecializationsChange = (e) => {
  //   let preparedList = specializationOptions.map((option) => option.value);
  //   setCheckedSpecializationsList(e.target.checked ? preparedList : []);
  //   setCheckAllSpecializations(e.target.checked);
  // };

  const candidatesDataSource = candidates.map((el) => ({
    key: el.key,
    fullname: el.fullname,
    specialization_name: el.specialization_name,
  }));

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    setChosenCandidates(newTargetKeys);
    // console.log("targetKeys: ", newTargetKeys);
    // console.log("direction: ", direction);
    // console.log("moveKeys: ", moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const formElements = [
    // {
    //   label: "Specializations:",
    //   name: `chosenSpecializations`,
    //   valuePropName: "checked",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Please accept the terms & conditions",
    //     },
    //   ],
    //   element: (
    //     <>
    //       <Checkbox
    //         onChange={onCheckAllSpecializationsChange}
    //         checked={checkAllSpecializations}
    //       >
    //         All
    //       </Checkbox>
    //       <Checkbox.Group
    //         options={specializationOptions}
    //         value={checkedSpecializationsList}
    //         onChange={onSpecializationCheckboxesChange}
    //       />
    //     </>
    //   ),
    // },
    {
      label: "Select target candidates to form the teams:",
      name: `chosenCandidates`,
      valuePropName: "checked",
      rules: [
        {
          required: true,
          message: "Please accept the terms & conditions",
        },
      ],
      element: (
        <Flex vertical justify="center" align="center">
          <Transfer
            dataSource={candidatesDataSource}
            titles={["Source", "Target"]}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            // pagination
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
              width: 'auto',
              minWidth: '300px',
              height: 300,
            }}
          />
        </Flex>
      ),
    },
  ];
  return (
    <Flex vertical>
      <Form
        name="formTeams"
        layout="vertical"
        // labelCol='true'
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        // style={{
        //   maxWidth: 600,
        // }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formElements.map((el) => {
          return (
            <Form.Item label={el.label} labelCol rules={el.rules} key={el.name} valuePropName={el.valuePropName}>
              {el.element}
            </Form.Item>
          );
        })}
      </Form>
    </Flex>
  );
};

export default FormTeams;
