import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const AddEditForm = ({
  specializations = [],
  formState = "edit",
  formMode = "candidates",
  currentElement = {},
  handleOk
}) => {
  const [selectedSpecializationId, setSelectedSpecializationId] = useState(specializations[0].specialization_id);
  const handleSpecialSelectChange = (value) => {
    console.log(`selected ${value} specialization`);
    setSelectedSpecializationId(value);
  };

  // const formInitValues =
  //   formMode === "candidate"
  //     ? {
  //         id: "0",
  //         fullname: "fullname",
  //         age: "18",
  //         specialization: "lucy"
  //       }
  //     : formMode === "specialization"
  //     ? {
  //         id: "0",
  //         fullname: "full2",
  //       }
  //     : {
  //         id: "0",
  //         fullname: "full3",
  //       };

  const formInitValues =
    formMode === "candidate"
      ? {
          ...currentElement,
          specialization: specializations.filter(
            (el) => el.specialization_id === currentElement.specialization_id
          )[0].name,
        }
      : formMode === "specialization"
      ? {
          id: "0",
          fullname: "full2",
        }
      : {
          id: "0",
          fullname: "full3",
        };

  const formElements =
    formMode === "candidate"
      ? [
          {
            label: "ID",
            name: `${formMode}_id`,
            rules: [
              {
                required: true,
                message: "The row should have an id!",
              },
            ],
            element: <Input disabled />,
          },
          {
            label: "Full name",
            name: "fullname",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === '' || value === null) {
                      reject("Please enter the fullname!");
                    } else if (value.length > 0) {
                      resolve();
                    }
                  })
                }
              },
            ],
            element: <Input />,
          },
          {
            label: "Age",
            name: "age",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === '' || value === null) {
                      reject("Please enter the age!");
                    } else if (!(Number.isInteger(+value))) {
                      console.log(Number.isInteger(+value), 'Number.isInteger(+value)');
                      reject("The age should be integer!");
                    } else if (value < 0) {
                      reject("The age should be grater then zero!");
                    } else if (value >= 0) {
                      resolve();
                    }
                  })
                }
              },
            ],
            element: <Input />,
          },
          {
            label: "Specialization",
            name: "specialization",
            rules: [
              {
                required: true,
                message: "Please select the specialization!",
              },
            ],
            element: (
              <Select
                onChange={handleSpecialSelectChange}
                options={specializations.map((el) => {
                  return {
                    value: el.specialization_id,
                    label: el.name,
                  };
                })}
              />
            ),
          },
        ]
      : formMode === "specializations"
      ? []
      : [];

  const onFinish = (values) => {
    console.log("Success:", values);
    handleOk();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={formInitValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formElements.map((el) => {
          return (
            <Form.Item
              label={el.label}
              name={el.name}
              rules={el.rules}
              key={el.name}
            >
              {el.element}
            </Form.Item>
          );
        })}
        <Button htmlType="submit" type="primary">OK</Button>
      </Form>
    </>
  );
};

export default AddEditForm;
