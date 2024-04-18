import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { baseUrl } from "../../constants";

const AddEditForm = ({
  setDataElements,
  specializations = [],
  formState = "edit",
  formMode = "candidate",
  currentElement = {},
  handleOk,
}) => {
  const handleSpecialSelectChange = (value) => {
    console.log(`selected ${value} specialization`);
  };

  const sendQuery = async (url, method = "POST", body) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      console.log(jsonData, "query res");

      window.location.reload();
    } catch (err) {
      console.log(`Error in posting candidate: ${err.message}`);
    }
  };

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
          ...currentElement
        }
      : {
          ...currentElement
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
                    if (value === "" || value === null) {
                      reject("Please enter the fullname!");
                    } else if (value.length > 0) {
                      resolve();
                    }
                  });
                },
              },
            ],
            element: <Input disabled={formState === "delete"} />,
          },
          {
            label: "Age",
            name: "age",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === "" || value === null) {
                      reject("Please enter the age!");
                    } else if (!Number.isInteger(+value)) {
                      console.log(
                        Number.isInteger(+value),
                        "Number.isInteger(+value)"
                      );
                      reject("The age should be integer!");
                    } else if (value < 0) {
                      reject("The age should be grater then zero!");
                    } else if (value >= 0) {
                      resolve();
                    }
                  });
                },
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
      : formMode === "specialization"
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
          label: "Name",
          name: "name",
          rules: [
            {
              required: true,
              validator(rule, value) {
                return new Promise((resolve, reject) => {
                  if (value === "" || value === null) {
                    reject("Please enter the name!");
                  } else if (value.length > 0) {
                    resolve();
                  }
                });
              },
            },
          ],
          element: <Input disabled={formState === "delete"} />,
        }
      ]
      : [
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
      ];

  const onFinish = async (values) => {
    if (formMode === "candidate" && typeof values.specialization === "string") {
      let specId = specializations.filter(
        (el) => el.name === values.specialization
      )[0].specialization_id;
      values.specialization = specId;
    }

    let url = {};
    let body = {};

    if (formMode === "candidate") {
      if (formState === "add") {
        url = `${baseUrl}/candidates`;
        body = {
          fullname: values.fullname,
          age: values.age,
          specialization_id: values.specialization,
        };

        await sendQuery(url, "POST", body);

      } else if (formState === "edit") {
        url = `${baseUrl}/candidates/${values.candidate_id}`;
        body = {
          fullname: values.fullname,
          age: values.age,
          specialization_id: values.specialization,
        };
        await sendQuery(url, "PUT", body);

      } else if (formState === "delete") {
        url = `${baseUrl}/candidates/${values.candidate_id}`;
        body = {};
        await sendQuery(url, "DELETE", body);

      }
    } else if (formMode === "specialization") {
      if (formState === "add") {
        url = `${baseUrl}/specializations`;
        body = {
          name: values.name
        };

        await sendQuery(url, "POST", body);

      } else if (formState === "edit") {
        url = `${baseUrl}/specializations/${values.specialization_id}`;
        body = {
          name: values.name
        };

        await sendQuery(url, "PUT", body);

      } else if (formState === "delete") {
        url = `${baseUrl}/specializations/${values.specialization_id}`;
        body = {};

        await sendQuery(url, "DELETE", body);

      }
    } else {
    }

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
        {(formState === "add" || formState === "edit") &&
          formElements.map((el) => {
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
        {formState === "delete" && (
          <>
            <Form.Item
              label={formElements[0].label}
              name={formElements[0].name}
              rules={formElements[0].rules}
              key={formElements[0].name}
            >
              {formElements[0].element}
            </Form.Item>
            <Form.Item
              label={formElements[1].label}
              name={formElements[1].name}
              rules={formElements[1].rules}
              key={formElements[1].name}
            >
              {formElements[1].element}
            </Form.Item>
          </>
        )}
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button htmlType="submit" type="primary">
            OK
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default AddEditForm;
