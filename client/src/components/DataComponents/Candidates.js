import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import { baseUrl } from "../../constants.js";

const Candidates = () => {
  const [specializations, setSpecializations] = useState([]);
  const [candidates, setCandidates] = useState([]);

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
          specialization_name: (specializations.filter((el) => el.specialization_id === dataEl.specialization_id))[0]?.name,
          key: dataEl.candidate_id
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
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "candidate_id",
      render: (_) => (
        <Space size="middle" key={_.candidate_id}>
          <a>Edit</a>
          <a>Delete</a>
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
    <>
      <Table dataSource={candidates} columns={columns} />
    </>
  );
};

export default Candidates;
