import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./chart.css";
import { Doughnut } from "react-chartjs-2";
import './practice.css';

const NewGraph2 = (props) => {
    const [subCategory, setSubCategory] = useState(false);
    const [categoryData, setData] = useState([]);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState({});

    const Data = [
        {    x:17,
            name: "openness",
            data: [
                { name: "adventurous", y: 1 },
                { name: "artistic", y: 76 },
                { name: "emotionally_aware", y: 73 },
                { name: "imaginative", y: 79 },
                { name: "intellectual", y: 82 },
                { name: "authority_challenging", y: 89 },
            ],
            color: "#00008B",
        },
        {
            x:17,
            name: "conscientiousness",
            data: [
                { name: "achievement_striving", y: 80 },
                { name: "cautious", y: 100 },
                { name: "dutiful", y: 85 },
                { name: "disciplined", y: 87 },
                { name: "self_efficacy", y: 89 },
            ],
            color: " #0000FF",
          
        },
        {
            x:7,
            name: "extraversion",
            data: [
                { name: "active", y: 89 },
                { name: "assertive", y: 81 },
                { name: "cheerful", y: 24 },
                { name: "excitement_seeking", y: 0 },
                { name: "outgoing", y: 74 },
                { name: "gregariousness", y: 75 },
            ],
            color: "#75E6DA",
          
        },
        {
            x:37,
            name: "agreeableness",
            data: [
                { name: "altruism", y: 77 },
                { name: "modesty", y: 35 },
                { name: "uncompromising", y: 84 },
                { name: "sympathy", y: 18 },
                { name: "cooperative", y: 87 },
                { name: "trusting", y: 95 },
            ],
            color: "#0E86D4",
            
        },
        {
            x:27,
            name: "neuroticism",
            data: [
                { name: "fiery", y: 31 },
                { name: "prone_to_worry", y: 82 },
                { name: "immoderation", y: 13 },
                { name: "melancholy", y: 31 },
                { name: "self_conscious", y: 30 },
                { name: "orderliness", y: 78 },
                { name: "stress_prone", y: 89 },
            ],
            color: "#BFD7ED",
            
        },
    ];

    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Top 5 Personality Traits",
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ["50%", "50%"],
                cursor: "pointer",
                allowPointSelect: true,
                size: "60%",
                innerSize: "50%",
            },
            series: {
                point: {
                    events: {
                        click: (e) => {
                            const clickedData = Data.find((item) => item.name === e.point.name);
                            setData(clickedData.data);
                            setSelected(e.point);
                            setSubCategory(true);
                            setName(e.point.name.toLowerCase());
                        },
                    },
                },
            },
        },
        tooltip: {
            valueSuffix: "%",
        },
        series: [
            {
                name: "Category %",
                data: Data.map(({ name, data, color,x }) => ({
                    name,
                    // y: data.reduce((acc, { y }) => acc + y, 0),
                    y:x,
                    color,
                })),
            },
        ],
    };

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
            />
            {subCategory ? (
                <div
                    style={{
                        width: "1200px",
                    }}
                    className="subcategory"
                >
                    <SubCategory
                        data={categoryData}
                        name={name}
                        isSelected={selected}
                    />
                </div>
            ) : null}
        </>
    );
};

function SubCategory({ name = "", data = [], isSelected = {} }) {
        return (
          <>
            <div className="subcategory-header">
              <h3>{name}</h3>
            </div>
            {name !== "" ? (
              <div className="bar-chart">
                {data.map((e, index) => (
                  <div key={index} className="bar">
                    <div className="bar-label">{e.name.replace("_", " ")}</div>
                    <div
                      className="bar-fill"
                      style={{
                        width: `${e.y}%`,
                        backgroundColor: isSelected.color,
                      }}
                    ></div>
                    <div className="bar-value">{e.y}%</div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
    );
}

export default NewGraph2;
