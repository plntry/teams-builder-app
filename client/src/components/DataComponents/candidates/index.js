import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import ModalComp from "../../Modal/ModalComp.js";
import useStore from "../../../store/store.js";
import apiHelper from "../../../api/helper.js";

const Candidates = () => {
  const specializations = useStore.use.specializations();
  const setSpecializations = useStore.use.setSpecializations();

  const candidates = useStore.use.candidates();
  const setCandidates = useStore.use.setCandidates();

  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCandidate, setCurrentCandidate] = useState({});

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
    if (specializations.length > 0 && !candidates.length) {
      async function getData() {
        const retrievedData = await apiHelper.candidates.get(specializations);
        setCandidates(retrievedData);
      }

      getData();
    }
  }, [specializations]);

  const handleAddEditDeleteClick = (action, element) => {
    setModalState((current) => {
      return { action: action, status: !current.status };
    });

    setCurrentCandidate(element);
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
