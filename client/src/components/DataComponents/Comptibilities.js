import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import { baseUrl } from "../../constants.js";

const Compatibilities = () => {
  const [candidates, setCandidates] = useState([]);
  const [compatibilities, setCompatibilities] = useState([]);

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

      const preparedData = await jsonData.map((dataEl) => {
        return {
          ...dataEl,
          candidate1_name: candidates.filter((el) => el.candidate_id === dataEl.candidate1_id)[0]?.fullname,
          candidate2_name: candidates.filter((el) => el.candidate_id === dataEl.candidate2_id)[0]?.fullname,
          key: dataEl.compatibility_id
        };
      });
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
      <Table dataSource={compatibilities} columns={columns} />
    </>
  );
};

export default Compatibilities;
