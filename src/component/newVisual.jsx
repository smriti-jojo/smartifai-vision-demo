import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./chart.css";

const Newgraph1 = (props) => {
    const [subCategory, setSubCategory] = useState(false);
    const [categoryData, setData] = useState([]);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState({});

    const Data = [
        {
            name: "openness",
            data: [
                { name: "adventurous", y: 1 },
                { name: "artistic", y: 76 },
                { name: "emotionally_aware", y: 73 },
                { name: "imaginative", y: 79 },
                { name: "intellectual", y: 82 },
                { name: "authority_challenging", y: 89 },
            ],
            color: "#FF9843",
        },
        {
            name: "conscientiousness",
            data: [
                { name: "achievement_striving", y: 80 },
                { name: "cautious", y: 100 },
                { name: "dutiful", y: 85 },
                { name: "disciplined", y: 87 },
                { name: "self_efficacy", y: 89 },
            ],
            color: "#D24545",
        },
        {
            name: "extraversion",
            data: [
                { name: "active", y: 89 },
                { name: "assertive", y: 81 },
                { name: "cheerful", y: 24 },
                { name: "excitement_seeking", y: 0 },
                { name: "outgoing", y: 74 },
                { name: "gregariousness", y: 75 },
            ],
            color: "#86A7FC",
        },
        {
            name: "agreeableness",
            data: [
                { name: "altruism", y: 77 },
                { name: "modesty", y: 35 },
                { name: "uncompromising", y: 84 },
                { name: "sympathy", y: 18 },
                { name: "cooperative", y: 87 },
                { name: "trusting", y: 95 },
            ],
            color: "#597E52",
        },
        {
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
            color: "#FF8F8F",
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
                innerSize: "20%",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.percentage:.1f}%</b>",
                    distance: 20,
                },
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
                name: "Category",
                data: Data.map(({ name, data, color }) => ({
                    name,
                    y: data.reduce((acc, { y }) => acc + y, 0),
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
                        width: "700px",
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
            {name !== ""
                ? data.map((e) => (
                      <div className="input-controller">
                          <span className="input-label">
                              <label htmlFor={e.name}>
                                  {e.name.replace("_", " ")}
                              </label>
                          </span>
                          <span className="input-control">
                              <input
                                  name={e.name}
                                  type="range"
                                  value={e.y}
                                  min={0}
                                  max={100}
                                  className="range"
                                  style={{
                                      "--color": isSelected.color,
                                  }}
                              />
                          </span>
                          <span className="input-value">{e.y}%</span>
                      </div>
                  ))
                : null}
        </>
    );
}

export default Newgraph1;
