import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { baseUrl } from "../../../constants.js";
import ModalComp from "../../Modal/ModalComp.js";
import useStore from "../../../store/store.js";

const Candidates = () => {
  // const [specializations, setSpecializations] = useState([]);
  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();
  // const [candidates, setCandidates] = useState([]);
  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();

  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCandidate, setCurrentCandidate] = useState({});

  const handleAddEditDeleteClick = (action, element) => {
    setModalState((current) => {
      return { action: action, status: !current.status };
    });

    setCurrentCandidate(element);
  };

  const getSpecializations = async () => {
    const link = `${baseUrl}/specializations`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();
      setSpecializations(jsonData);
    } catch (err) {
      console.log(`Error in getting specializations: ${err.message}`);
    }
  };

  const getCandidates = async () => {
    const link = `${baseUrl}/candidates`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();

      const preparedData = await jsonData
        .map((dataEl) => {
          return {
            ...dataEl,
            specialization_name: specializations.filter(
              (el) => el.specialization_id === dataEl.specialization_id
            )[0]?.name,
            key: dataEl.candidate_id,
          };
        })
        .sort((a, b) => a.candidate_id - b.candidate_id);
      setCandidates(preparedData);
    } catch (err) {
      console.log(`Error in getting candidates: ${err.message}`);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "candidate_id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.candidate_id - b.candidate_id,
      key: "candidate_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      key: "fullname",
    },
    {
      title: "Specialization",
      dataIndex: "specialization_name",
      filters: specializations.map((el) => {
        return { key: el.specialization_id, text: el.name, value: el.name };
      }),
      onFilter: (value, record) =>
        record.specialization_name.indexOf(value) === 0,
      sorter: (a, b) =>
        a.specialization_name.localeCompare(b.specialization_name),
      key: "specialization_name",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (el) => (
        <Space size="middle" key={el.candidate_id}>
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

  useEffect(() => {
    if (specializations.length > 0) {
      getCandidates();
    }
  }, [specializations]);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      {modalState.status && (
        <ModalComp
          setDataElements={setCandidates}
          additionalData={specializations}
          formMode="candidate"
          modalState={modalState}
          setModalState={setModalState}
          currentElement={currentCandidate}
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
              candidate_id: "will be generated automatically",
              fullname: "",
              age: "",
              specialization_id: specializations[0].specialization_id,
              specialization: specializations[0].name,
            })
          }
        >
          Add New
        </Button>
      </Space>
      <Table
        dataSource={candidates}
        columns={columns}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </Space>
  );
};

export default Candidates;
