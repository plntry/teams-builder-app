import React, { useEffect, useState } from "react";
import { Flex, Button, Checkbox, Form, Input, Select } from "antd";
import useStore from "../../../store/store";
import apiHelper from "../../../api/helper";

const FormTeams = () => {
  console.log(useStore.getState(), 'state test');
  useStore.setState(useStore.getState());

  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  

  const chosenSpecializations = useStore.use.chosenSpecializations();
  const setChosenSpecializations = useStore.use.setChosenSpecializations();
  console.log(chosenSpecializations, 'test1');

  const [checkAllSpecializations, setCheckAllSpecializations] = useState(false);
  const [checkedSpecializationsList, setCheckedSpecializationsList] = useState(
    chosenSpecializations
  );

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
    setChosenSpecializations(checkedSpecializationsList);
    console.log(chosenSpecializations, "chosen spec test");
  }, [
    checkedSpecializationsList,
    chosenSpecializations,
    setChosenSpecializations,
  ]);

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

  const onSpecializationCheckboxesChange = (list) => {
    setCheckedSpecializationsList(list);
    setCheckAllSpecializations(list.length === specializationOptions.length);
  };

  const onCheckAllSpecializationsChange = (e) => {
    let preparedList = specializationOptions.map((option) => option.value);
    setCheckedSpecializationsList(e.target.checked ? preparedList : []);
    setCheckAllSpecializations(e.target.checked);
  };

  const formElements = [
    {
      label: "Specializations to include",
      name: `chosenSpecializations`,
      rules: [
        {
          required: true,
          message: "The row should have an id!",
        },
      ],
      element: (
        <>
          <Checkbox
            onChange={onCheckAllSpecializationsChange}
            checked={checkAllSpecializations}
          >
            All
          </Checkbox>
          <Checkbox.Group
            options={specializationOptions}
            value={checkedSpecializationsList}
            onChange={onSpecializationCheckboxesChange}
          />
        </>
      ),
    },
    // {
    //   label: "Specialization",
    //   name: "specialization",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Please select the specialization!",
    //     },
    //   ],
    //   element: (
    //     <Select
    //       // onChange={handleSpecialSelectChange}
    //       options={specializations.map((el) => {
    //         return {
    //           value: el.specialization_id,
    //           label: el.name,
    //         };
    //       })}
    //     />
    //   ),
    // },
  ];
  return (
    <Flex
      vertical
      // style={{background:'yellow'}}
    >
      <Form
        name="formTeams"
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
            <Form.Item label={el.label} rules={el.rules} key={el.name}>
              {el.element}
            </Form.Item>
          );
        })}
      </Form>
    </Flex>
  );
};

export default FormTeams;
