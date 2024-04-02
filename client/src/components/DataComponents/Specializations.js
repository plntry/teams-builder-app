import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import { baseUrl } from "../../constants.js";

const Specializations = () => {
  const [specializations, setSpecializations] = useState([]);

  const getSpecializations = async () => {
    const link = `${baseUrl}/specializations`;

    try {
      const response = await fetch(link);
      const jsonData = await response.json();

      const preparedData = await jsonData.map((dataEl) => {
        return { ...dataEl, key: dataEl.specialization_id };
      });
      setSpecializations(preparedData);
    } catch (err) {
      console.log(`Error in getting specializations: ${err.message}`);
    }
  };

  console.log(specializations);

  const columns = [
    {
      title: "ID",
      dataIndex: "specialization_id",
      key: "specialization_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "specialization_id",
    },
    {
      title: "Action",
      key: "specialization_id",
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

  return (
    <>
      <Table dataSource={specializations} columns={columns} />
    </>
  );
};

export default Specializations;
