import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import { baseUrl } from "../constants.js"
import DataElement from "./DataElement.js";

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    const getCandidates = async () => {
        const link = `${baseUrl}/candidates`;

        try {
            const response = await fetch(link);
            const jsonData = await response.json();

            const preparedData = await jsonData.map((dataEl) => {
                return { ...dataEl, key: dataEl.candidate_id };
            });
            setCandidates(preparedData);
        } catch (err) {
            console.log(`Error in getting candidates: ${err.message}`);
        }
    }

    console.log(candidates);

    const columns = [
        {
          title: 'ID',
          dataIndex: 'candidate_id',
          key: 'candidate_id',
        },
        {
          title: 'Full Name',
          dataIndex: 'fullname',
          key: 'candidate_id',
        },
        {
          title: 'Specialization',
          dataIndex: 'specialization_id',
          key: 'candidate_id',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'candidate_id',
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
          title: 'Action',
          key: 'candidate_id',
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
  
    return (
      <>
        <Table dataSource={candidates} columns={columns} />
      </>
    );
  };
  
export default Candidates;