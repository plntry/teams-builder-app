import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { baseUrl } from "../../../constants.js";
import ModalComp from "../../Modal/ModalComp.js";
import useStore from "../../../store/store.js";

const Compatibilities = () => {
  // const [candidates, setCandidates] = useState([]);
  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();
  // const [compatibilities, setCompatibilities] = useState([]);
  const compatibilities = useStore.use.compatibilities();
  const setCompatibilities = useStore.use.setCompatibilities();

  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCompatibility, setCurrentCompatibility] = useState({});

  const handleAddEditDeleteClick = (action, element) => {
    setModalState((current) => {
      return { action: action, status: !current.status };
    });

    setCurrentCompatibility({
      ...element,
      candidate1: candidates.filter(
        (el) => element.candidate1_id === el.candidate_id
      )[0].fullname,
      candidate2: candidates.filter(
        (el) => element.candidate2_id === el.candidate_id
      )[0].fullname,
    });
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
  console.log(candidates);

  const columns = [
    {
      title: "ID",
      dataIndex: "compatibility_id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.compatibility_id - b.compatibility_id,
      key: "compatibility_id",
    },
    {
      title: "Candidate 1",
      dataIndex: "candidate1_name",
      filters: candidates.map((el) => {
        return { key: el.candidate_id, text: el.fullname, value: el.fullname };
      }),
      onFilter: (value, record) =>
        record.candidate1_name.indexOf(value) === 0,
      sorter: (a, b) => a.candidate1_name.localeCompare(b.candidate1_name),
      key: "candidate1_name",
    },
    {
      title: "Candidate 2",
      dataIndex: "candidate2_name",
      filters: candidates.map((el) => {
        return { key: el.candidate_id, text: el.fullname, value: el.fullname };
      }),
      onFilter: (value, record) =>
        record.candidate2_name.indexOf(value) === 0,
      sorter: (a, b) => a.candidate2_name.localeCompare(b.candidate2_name),
      key: "candidate2_name",
    },
    {
      title: "Compatibility",
      dataIndex: "compatibility",
      sorter: (a, b) => a.compatibility - b.compatibility,
      key: "compatibility",
    },
    {
      title: "Action",
      key: "action",
      render: (el) => (
        <Space size="middle" key={el.compatibility_id_id}>
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
            additionalData={candidates}
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
                candidate1: candidates[0].fullname,
                candidate2: candidates[1].fullname,
                compatibility: "",
              })
            }
          >
            Add New
          </Button>
        </Space>
        <Table
          dataSource={compatibilities}
          columns={columns}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Space>
    </>
  );
};

export default Compatibilities;
