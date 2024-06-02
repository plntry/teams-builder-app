import React, { useState } from "react";
import { Typography, Flex, Timeline } from "antd";
import { DatabaseOutlined, BuildOutlined } from "@ant-design/icons";

const About = () => {
  const [timelineData, setTimelineData] = useState([
    {
      children: (
        <Flex vertical gap="20px">
          <Typography>
            Manage your data in the{" "}
            <b>
              <DatabaseOutlined /> Data
            </b>{" "}
            section
          </Typography>
          <Timeline
            items={[
              {
                children: (
                  <Typography>
                    Add and edit specializations' information in the{" "}
                    <b>Specializations</b> section
                  </Typography>
                ),
              },
              {
                children: (
                  <Typography>
                    Add and edit candidates' information in the{" "}
                    <b>Candidates</b> section
                  </Typography>
                ),
              },
              {
                children: (
                  <Flex vertical gap="20px">
                    <Typography>
                      Add and edit compatibilities' information in the{" "}
                      <b>Compatibilities</b> section
                    </Typography>
                    <Timeline
                      items={[
                        {
                          children: (
                            <Typography>
                              To form teams, you need to add compatibilities
                              between each pair of candidates from different
                              specializations
                            </Typography>
                          ),
                        },
                      ]}
                    />
                  </Flex>
                ),
              },
            ]}
          />
        </Flex>
      ),
    },
    {
      children: (
        <Flex vertical gap="20px">
          <Typography>
            Form the teams in the{" "}
            <b>
              <BuildOutlined /> Form Teams
            </b>{" "}
            section
          </Typography>
          <Timeline
            items={[
              {
                children: (
                  <Typography>Select candidates to form teams</Typography>
                ),
              },
              {
                children: (
                  <Flex vertical gap="20px">
                    <Typography>
                      Specify your own parameters for the team formation process
                      using the bee algorithm if needed
                    </Typography>
                    <Timeline
                      items={[
                        {
                          children: (
                            <Typography>
                              <b>Area Size</b>: The size of the search area.
                              This parameter determines the number of candidate
                              solutions generated in the initial search area and
                              in subsequent iterations
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>Best Size</b>: The number of best solutions to
                              be retained and used for generating new solutions
                              in each iteration
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>No Improvements Number</b>: The maximum number
                              of iterations allowed without improvement in the
                              best solution found
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>Amount Of Mutations</b>: The number of
                              mutations in every iteration
                            </Typography>
                          ),
                        },
                      ]}
                    />
                  </Flex>
                ),
              },
              {
                children: (
                  <Typography>Form the teams and check the results</Typography>
                ),
              },
            ]}
          />
        </Flex>
      ),
    },
  ]);

  return (
    <Flex vertical gap="20px" justify="center" align="center">
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        How to use the system
      </Typography.Title>
      <Timeline items={timelineData} />
    </Flex>
  );
};
export default About;
