import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { baseUrl } from "../../../constants.js";
import ModalComp from "../../Modal/ModalComp.js";
import useStore from "../../../store/store.js";

const Specializations = () => {
  // const [specializations, setSpecializations] = useState([]);
  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentSpecialization, setCurrentSpecialization] = useState({});

  const handleAddEditDeleteClick = (action, element) => {
    setModalState((current) => {
      return { action: action, status: !current.status };
    });

    setCurrentSpecialization(element);
  };

  const getSpecializations = async () => {
    const link = `${baseUrl}/specializations`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();

      const preparedData = await jsonData
        .map((dataEl) => {
          return { ...dataEl, key: dataEl.specialization_id };
        })
        .sort((a, b) => a.specialization_id - b.specialization_id);
      setSpecializations(preparedData);
      console.log(specializations, "spec");
    } catch (err) {
      console.log(`Error in getting specializations: ${err.message}`);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "specialization_id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.specialization_id - b.specialization_id,
      key: "specialization_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: specializations.map((el) => {
        return { key: el.specialization_id, text: el.name, value: el.name };
      }),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (el) => (
        <Space size="middle" key={el.specialization_id}>
          <Button
            type="link"
            onClick={() => handleAddEditDeleteClick("edit", el)}
          >
            Edit
          </Button>
          <Button
            type="link"
            onClick={() => handleAddEditDeleteClick("delete", el)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getSpecializations();
  }, []);

  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        {modalState.status && (
          <ModalComp
            setDataElements={setSpecializations}
            additionalData={[]}
            formMode="specialization"
            modalState={modalState}
            setModalState={setModalState}
            currentElement={currentSpecialization}
          />
        )}
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            onClick={() =>
              handleAddEditDeleteClick("add", {
                specialization_id: "will be generated automatically",
                name: "",
              })
            }
          >
            Add New
          </Button>
        </Space>
        <Table
          dataSource={specializations}
          columns={columns}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Space>
    </>
  );
};

export default Specializations;
