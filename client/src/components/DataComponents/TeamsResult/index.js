import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Button
  } from "antd";
import localSearch from "../../../localSearch";

const TeamsResult = () => {
    const navigate = useNavigate();

    // Example usage:
    const itemNames = [
        ["a-1", "a-2", "a-3"],
        ["b-1", "b-2", "b-3"],
        ["c-1", "c-2", "c-3"],
        // ["d-1", "d-2", "d-3"]
    ];
    

    // a1 b1 c1 d1
    // a2 b2 c2 d2
    // a3 b3 c3 d3

    const compatibilities = [
        [//b b b
        [0.34, 0.7, 0.25], //a
        [0.81, 0.42, 0.21],//a
        [0.48, 0.37, 0.92],//a
        ],
        [//c c c
        [0.32, 0.12, 0.56],//a
        [0.1, 0.89, 0.43],//a
        [0.23, 0.15, 0.59],//a
        ],
        [//c c c
        [0.22, 0.13, 0.55],//b
        [0.95, 0.23, 0.66],//b
        [0.58, 0.93, 0.78],//b
        ],
        // [
        // [0.35, 0.11, 0.85],
        // [0.35, 0.23, 0.60],
        // [0.13, 0.95, 0.71],
        // ]
    ];

    const amountInTeam = 4;
    const teamsNumber = 3;
    const testData = {
        'a-1~b-1': 0.34,
        'a-1~b-2': 0.7,
        'a-1~b-3': 0.25,

        'a-2~b-1': 0.81,
        'a-2~b-2': 0.42,
        'a-2~b-3': 0.21,

        'a-3~b-1': 0.48,
        'a-3~b-2': 0.37,
        'a-3~b-3': 0.92,


        'a-1~c-1': 0.32,
        'a-1~c-2': 0.12,
        'a-1~c-3': 0.56,

        'a-2~c-1': 0.1,
        'a-2~c-2': 0.89,
        'a-2~c-3': 0.43,

        'a-3~c-1': 0.23,
        'a-3~c-2': 0.15,
        'a-3~c-3': 0.59,


        // 'a-1~d-1': 0.32,
        // 'a-1~d-2': 0.12,
        // 'a-1~d-3': 0.56,

        'a-2~d-1': 0.1,
        'a-2~d-2': 0.89,
        'a-2~d-3': 0.43,

        'a-3~d-1': 0.23,
        'a-3~d-2': 0.15,
        'a-3~d-3': 0.59,


        'b-1~c-1': 0.22,
        'b-1~c-2': 0.13,
        'b-1~c-3': 0.55,

        'b-2~c-1': 0.95,
        'b-2~c-2': 0.23,
        'b-2~c-3': 0.66,

        'b-3~c-1': 0.58,
        'b-3~c-2': 0.93,
        'b-3~c-3': 0.78,


        // 'b-1~d-1': 0.22,
        // 'b-1~d-2': 0.13,
        // 'b-1~d-3': 0.55,

        'b-2~d-1': 0.95,
        'b-2~d-2': 0.23,
        'b-2~d-3': 0.66,

        // 'b-3~d-1': 0.58,
        // 'b-3~d-2': 0.93,
        // 'b-3~d-3': 0.78,


        // 'd-1~c-1': 0.32,
        // 'd-1~c-2': 0.12,
        // 'd-1~c-3': 0.56,

        // 'd-2~c-1': 0.1,
        // 'd-2~c-2': 0.89,
        // 'd-2~c-3': 0.43,

        // 'd-3~c-1': 0.23,
        // 'd-3~c-2': 0.15,
        // 'd-3~c-3': 0.59,
    };

//     let A = ["a1", "a2", "a3"];
// let B = ["b1", "b2", "b3"];
// let C = ["c1", "c2", "c3"];

let beta = [
  [0.34, 0.7, 0.25],
  [0.81, 0.42, 0.21],
  [0.48, 0.37, 0.92],
];
let gamma = [
  [0.32, 0.12, 0.56],
  [0.1, 0.89, 0.43],
  [0.23, 0.15, 0.59],
];
let sigma = [
  [0.22, 0.13, 0.55],
  [0.95, 0.23, 0.66],
  [0.58, 0.93, 0.78],
];
  
    console.log(localSearch(10000, itemNames, testData, amountInTeam, teamsNumber));

    return (
        <Flex>
            <Button type="dashed" onClick={() => navigate('/form~teams')}>Go back to the teams form</Button>
        </Flex>
    );
}

export default TeamsResult;
