import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import ModalComp from "../../Modal/ModalComp.js";
import useStore from "../../../store/store.js";
import apiHelper from "../../../api/helper.js";

const Compatibilities = () => {
  const candidates = useStore.use.candidates() ?? [];
  const setCandidates = useStore.use.setCandidates();

  const compatibilities = useStore.use.compatibilities();
  const setCompatibilities = useStore.use.setCompatibilities();

  const [modalState, setModalState] = useState({
    action: "edit",
    status: false,
  });
  const [currentCompatibility, setCurrentCompatibility] = useState({});

  useEffect(() => {
    if (!candidates.length) {
      async function getData() {
        const retrievedData = await apiHelper.candidates.get();
        setCandidates(retrievedData);
      }

      getData();
    }
  }, []);

  useEffect(() => {
    if (candidates.length > 0 && !compatibilities.length) {
      async function getData() {
        const retrievedData = await apiHelper.compatibilities.get(candidates);
        setCompatibilities(retrievedData);
      }

      getData();
    }
  }, [candidates]);

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

  const columns = [
    {
      title: "ID",
      dataIndex: "compatibility_id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.compatibility_id - b.compatibility_id,
      key: "compatibility_id",
    },
    {
      title: "Кандидат 1",
      dataIndex: "candidate1_name",
      filters: candidates.map((el) => {
        return { key: el.candidate_id, text: el.fullname, value: el.fullname };
      }),
      onFilter: (value, record) => record.candidate1_name.indexOf(value) === 0,
      sorter: (a, b) => a.candidate1_name.localeCompare(b.candidate1_name),
      key: "candidate1_name",
    },
    {
      title: "Кандидат 2",
      dataIndex: "candidate2_name",
      filters: candidates.map((el) => {
        return { key: el.candidate_id, text: el.fullname, value: el.fullname };
      }),
      onFilter: (value, record) => record.candidate2_name.indexOf(value) === 0,
      sorter: (a, b) => a.candidate2_name.localeCompare(b.candidate2_name),
      key: "candidate2_name",
    },
    {
      title: "Сумісність",
      dataIndex: "compatibility",
      sorter: (a, b) => a.compatibility - b.compatibility,
      key: "compatibility",
    },
    {
      title: "Дія",
      key: "action",
      render: (el) => (
        <Space size="middle" key={el.compatibility_id_id}>
          <Button
            type="link"
            onClick={() => handleAddEditDeleteClick("edit", el)}
          >
            Редагувати
          </Button>
          <Button
            type="link"
            onClick={() => handleAddEditDeleteClick("delete", el)}
          >
            Видалити
          </Button>
        </Space>
      ),
    },
  ];

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
                compatibility_id: "буде згенеровано автоматично",
                candidate1_id: candidates[0].candidate_id,
                candidate2_id: candidates[1].candidate_id,
                candidate1: candidates[0].fullname,
                candidate2: candidates[1].fullname,
                compatibility: "",
              })
            }
          >
            Додати новий запис
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
