import React, { useEffect, useState } from "react";
import { Table, Space, Input, Button } from "antd";
import { baseUrl } from "../../../constants.js";
import ModalComp from "../../Modal/ModalComp.js";

const Candidates = () => {
  const [specializations, setSpecializations] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCandidate, setCurrentCandidate] = useState({});

  const handleAddEditDeleteClick = (action, element) => {
    console.log(action, "action");
    setModalState((current) => {
      console.log(current, "current");
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

      const preparedData = await jsonData.map((dataEl) => {
        return {
          ...dataEl,
          specialization_name: specializations.filter(
            (el) => el.specialization_id === dataEl.specialization_id
          )[0]?.name,
          key: dataEl.candidate_id,
        };
      });
      setCandidates(preparedData);
    } catch (err) {
      console.log(`Error in getting candidates: ${err.message}`);
    }
  };

  console.log(candidates);

  const columns = [
    {
      title: "ID",
      dataIndex: "candidate_id",
      key: "candidate_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "candidate_id",
    },
    {
      title: "Specialization",
      dataIndex: "specialization_name",
      key: "candidate_id",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "candidate_id",
    },
    {
      title: "Action",
      key: "candidate_id",
      render: (el) => (
        <Space size="middle" key={el.candidate_id}>
          <Button type="link" onClick={() => handleAddEditDeleteClick("edit", el)}>
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
          specializations={specializations}
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
        <Button type="primary" onClick={() => handleAddEditDeleteClick("add", {
          candidate_id: "will be generated automatically",
          fullname: "",
          age: "",
          specialization_id: specializations[0].specialization_id,
          specialization: specializations[0].name
        })}>Add New</Button>
      </Space>
      <Table dataSource={candidates} columns={columns} />
    </Space>
  );
};

export default Candidates;
