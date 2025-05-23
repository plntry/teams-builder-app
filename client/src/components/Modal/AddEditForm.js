import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { baseUrl } from "../../constants";
import useStore from '../../store/store';

const AddEditForm = ({
  setDataElements,
  additionalData = [],
  formState = "edit",
  formMode = "candidate",
  currentElement = {},
  handleOk,
}) => {
  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();

  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  const compatibilities = useStore.use.compatibilities();
  const setCompatibilities = useStore.use.setCompatibilities();

  const sendQuery = async (url, method = "POST", body) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      return jsonData;

      // window.location.reload();
    } catch (err) {
      console.error(`Error in posting candidate: ${err.message}`);
    }
  };

  const formInitValues =
    formMode === "candidate"
      ? {
          ...currentElement,
          specialization: additionalData.filter(
            (el) => el.specialization_id === currentElement.specialization_id
          )[0].name,
        }
      : formMode === "specialization"
      ? {
          ...currentElement,
        }
      : {
          ...currentElement,
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
                // message: "The row should have an id!",
                message: "Запис має мати id!",
              },
            ],
            element: <Input disabled />,
          },
          {
            label: "Повне ім'я",
            name: "fullname",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === "" || value === null) {
                      // reject("Please enter the fullname!");
                      reject("Будь ласка, введіть повне ім'я!");
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
            label: "Вік",
            name: "age",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === "" || value === null) {
                      // reject("Please enter the age!");
                      reject("Будь ласка, введіть вік!");
                    } else if (!Number.isInteger(+value)) {
                      // reject("The age should be integer!");
                      reject("Вік має бути цілим числом!");
                    } else if (value < 0) {
                      // reject("The age should be grater then zero!");
                      reject("Вік має бути більшим за 0!");
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
            label: "Спеціалізація",
            name: "specialization",
            rules: [
              {
                required: true,
                // message: "Please select the specialization!",
                message: "Будь ласка, оберіть спеціалізацію!",
              },
            ],
            element: (
              <Select
                // onChange={handleSpecialSelectChange}
                options={additionalData.map((el) => {
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
                // message: "The row should have an id!",
                message: "Запис має мати id!",
              },
            ],
            element: <Input disabled />,
          },
          {
            label: "Назва",
            name: "name",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === "" || value === null) {
                      // reject("Please enter the name!");
                      reject("Будь ласка, введіть назву!");
                    } else if (value.length > 0) {
                      resolve();
                    }
                  });
                },
              },
            ],
            element: <Input disabled={formState === "delete"} />,
          },
        ]
      : [
          {
            label: "ID",
            name: `${formMode}_id`,
            rules: [
              {
                required: true,
                // message: "The row should have an id!",
                message: "Запис має мати id!",
              },
            ],
            element: <Input disabled />,
          },
          {
            label: "Кандидат 1",
            name: "candidate1",
            rules: [
              {
                required: true,
                // message: "Please select the candidate 1!",
                message: "Будь ласка, оберіть кандидата 1!",
              },
            ],
            element: (
              <Select
                // onChange={handleSpecialSelectChange}
                options={additionalData.map((el) => {
                  return {
                    value: el.candidate_id,
                    label: el.fullname,
                  };
                })}
              />
            ),
          },
          {
            label: "Кандидат 2",
            name: "candidate2",
            rules: [
              {
                required: true,
                // message: "Please select the candidate 2!",
                message: "Будь ласка, оберіть кандидата 2!",
              },
            ],
            element: (
              <Select
                // onChange={handleSpecialSelectChange}
                options={additionalData.map((el) => {
                  return {
                    value: el.candidate_id,
                    label: el.fullname,
                  };
                })}
              />
            ),
          },
          {
            label: "Сумісність",
            name: "compatibility",
            rules: [
              {
                required: true,
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value === "" || value === null) {
                      // reject("Please enter the compatibility!");
                      reject("Будь ласка, введіть сумісність!");
                    } else if (isNaN(+value) || !(typeof +value === "number")) {
                      // reject("The compatibility should be a number!");
                      reject("Сумісність має бути числом!");
                    } else if (value < 0 || value > 1) {
                      // reject(
                      //   "The compatibility cannot be less then zero or grater then one!"
                      // );
                      reject("Сумісність не може бути менше 0 або більше 1!");
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ],
            element: <Input />,
          },
        ];

  const onFinish = async (values) => {
    if (formMode === "candidate" && typeof values.specialization === "string") {
      let specId = additionalData.filter(
        (el) => el.name === values.specialization
      )[0].specialization_id;
      values.specialization = specId;
    } else if (formMode === "compatibility") {
      if (typeof values.candidate1 === "string") {
        let cand1Id = additionalData.filter(
          (el) => el.fullname === values.candidate1
        )[0].candidate_id;

        values.candidate1 = cand1Id;
      }

      if (typeof values.candidate2 === "string") {
        let cand2Id = additionalData.filter(
          (el) => el.fullname === values.candidate2
        )[0].candidate_id;

        values.candidate2 = cand2Id;
      }
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

        let jsonData = await sendQuery(url, "POST", body);
        let preparedData = jsonData;
        preparedData.key = preparedData[`${formMode}_id`];
        preparedData.specialization_name = specializations.filter(
          (el) => el.specialization_id === preparedData.specialization_id
        )[0]["name"];

        setCandidates([...candidates, preparedData]);
      } else if (formState === "edit") {
        url = `${baseUrl}/candidates/${values.candidate_id}`;
        body = {
          fullname: values.fullname,
          age: values.age,
          specialization_id: values.specialization,
        };

        await sendQuery(url, "PUT", body);
        let preparedData = body;
        preparedData.candidate_id = values.candidate_id;
        preparedData.specialization_name = specializations.filter(
          (el) => el.specialization_id === preparedData.specialization_id
        )[0]["name"];

        let updatedData = candidates.map((el) => {
          if (el.candidate_id === body.candidate_id) {
            return { ...el, ...body };
          }
          return el;
        });
        setCandidates(updatedData);

        let updatedComptibilities = compatibilities.map((el) => {
          if (el.candidate1_id === body.candidate_id) {
            return { ...el, candidate1_name: body.fullname };
          } else if (el.candidate2_id === body.candidate_id) {
            return { ...el, candidate2_name: body.fullname };
          }
          return el;
        });
        setCompatibilities(updatedComptibilities);
      } else if (formState === "delete") {
        url = `${baseUrl}/candidates/${values.candidate_id}`;
        body = {};

        await sendQuery(url, "DELETE", body);
        let updatedData = candidates.filter(
          (el) => el.candidate_id !== values.candidate_id
        );
        setCandidates(updatedData);
      }
    } else if (formMode === "specialization") {
      if (formState === "add") {
        url = `${baseUrl}/specializations`;
        body = {
          name: values.name,
        };

        let jsonData = await sendQuery(url, "POST", body);
        let preparedData = jsonData;
        preparedData.key = preparedData[`${formMode}_id`];

        setSpecializations([...specializations, preparedData]);
      } else if (formState === "edit") {
        url = `${baseUrl}/specializations/${values.specialization_id}`;
        body = {
          name: values.name,
        };

        await sendQuery(url, "PUT", body);
        let preparedData = body;
        preparedData.specialization_id = values.specialization_id;

        let updatedData = specializations.map((el) => {
          if (el.specialization_id === body.specialization_id) {
            return { ...el, ...body };
          }
          return el;
        });
        setSpecializations(updatedData);

        let updatedCandidates = candidates.map((el) => {
          if (el.specialization_id === body.specialization_id) {
            return { ...el, specialization_name: body.name };
          }
          return el;
        });
        setCandidates(updatedCandidates);
      } else if (formState === "delete") {
        url = `${baseUrl}/specializations/${values.specialization_id}`;
        body = {};

        await sendQuery(url, "DELETE", body);

        let updatedData = specializations.filter(
          (el) => el.specialization_id !== values.specialization_id
        );
        setSpecializations(updatedData);
      }
    } else {
      if (formState === "add") {
        url = `${baseUrl}/compatibilities`;
        body = {
          candidate1_id: values.candidate1,
          candidate2_id: values.candidate2,
          compatibility: +values.compatibility,
        };

        let jsonData = await sendQuery(url, "POST", body);
        let preparedData = jsonData;
        preparedData.key = preparedData[`${formMode}_id`];
        preparedData.candidate1_name = candidates.filter(
          (el) => el.candidate_id === preparedData.candidate1_id
        )[0]["fullname"];
        preparedData.candidate2_name = candidates.filter(
          (el) => el.candidate_id === preparedData.candidate2_id
        )[0]["fullname"];

        setCompatibilities([...compatibilities, preparedData]);
      } else if (formState === "edit") {
        url = `${baseUrl}/compatibilities/${values.compatibility_id}`;
        body = {
          candidate1_id: values.candidate1,
          candidate2_id: values.candidate2,
          compatibility: +values.compatibility,
        };

        await sendQuery(url, "PUT", body);
        let preparedData = body;
        preparedData.compatibility_id = values.compatibility_id;
        preparedData.candidate1_name = candidates.filter(
          (el) => el.candidate_id === preparedData.candidate1_id
        )[0]["fullname"];
        preparedData.candidate2_name = candidates.filter(
          (el) => el.candidate_id === preparedData.candidate2_id
        )[0]["fullname"];

        let updatedData = compatibilities.map((el) => {
          if (el.compatibility_id === body.compatibility_id) {
            return { ...el, ...body };
          }
          return el;
        });
        setCompatibilities(updatedData);
      } else if (formState === "delete") {
        url = `${baseUrl}/compatibilities/${values.compatibility_id}`;
        body = {};

        await sendQuery(url, "DELETE", body);

        let updatedData = compatibilities.filter(
          (el) => el.compatibility_id !== values.compatibility_id
        );
        setCompatibilities(updatedData);
      }
    }

    console.error("Success:", values);
    handleOk();
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="modalForm"
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
            {formMode !== "compatibility" && (
              <Form.Item
                label={formElements[1].label}
                name={formElements[1].name}
                rules={formElements[1].rules}
                key={formElements[1].name}
              >
                {formElements[1].element}
              </Form.Item>
            )}
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
