import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { baseUrl } from "../../../constants.js";
import ModalComp from "../../Modal/ModalComp.js";

const Compatibilities = () => {
  const [candidates, setCandidates] = useState([]);
  const [compatibilities, setCompatibilities] = useState([]);
  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCompatibility, setCurrentCompatibility] = useState({});

  const handleAddEditDeleteClick = (action, element) => {
    setModalState((current) => {
      return { action: action, status: !current.status };
    });

    setCurrentCompatibility(element);
  };

  const getCandidates = async () => {
    const link = `${baseUrl}/candidates`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();

      setCandidates(jsonData);
    } catch (err) {
      console.log(`Error in getting candidates: ${err.message}`);
    }
  };

  const getCompatibilities = async () => {
    const link = `${baseUrl}/compatibilities`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();

      const preparedData = await jsonData
        .map((dataEl) => {
          return {
            ...dataEl,
            candidate1_name: candidates.filter(
              (el) => el.candidate_id === dataEl.candidate1_id
            )[0]?.fullname,
            candidate2_name: candidates.filter(
              (el) => el.candidate_id === dataEl.candidate2_id
            )[0]?.fullname,
            key: dataEl.compatibility_id,
          };
        })
        .sort((a, b) => a.compatibility_id - b.compatibility_id);
      setCompatibilities(preparedData);
    } catch (err) {
      console.log(`Error in getting compatibilities: ${err.message}`);
    }
  };

  console.log(compatibilities);

  const columns = [
    {
      title: "ID",
      dataIndex: "compatibility_id",
      key: "compatibility_id",
    },
    {
      title: "Candidate 1",
      dataIndex: "candidate1_name",
      key: "compatibility_id",
    },
    {
      title: "Candidate 2",
      dataIndex: "candidate2_name",
      key: "compatibility_id",
    },
    {
      title: "Compatibility",
      dataIndex: "compatibility",
      key: "compatibility_id",
    },
    {
      title: "Action",
      key: "compatibility_id",
      render: (_) => (
        <Space size="middle" key={_.candidate_id}>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      getCompatibilities();
    }
  }, [candidates]);

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
            setDataElements={setCandidates}
            specializations={[]}
            formMode="compatibility"
            modalState={modalState}
            setModalState={setModalState}
            currentElement={currentCompatibility}
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
                compatibility_id: "will be generated automatically",
                candidate1_id: candidates[0].candidate_id,
                candidate2_id: candidates[1].candidate_id,
                compatibility: "",
              })
            }
          >
            Add New
          </Button>
        </Space>
        <Table dataSource={compatibilities} columns={columns} />
      </Space>
    </>
  );
};

export default Compatibilities;
