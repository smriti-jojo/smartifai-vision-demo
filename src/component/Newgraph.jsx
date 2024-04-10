import React, { useState } from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown";
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from "highcharts-react-official";
import Doughnut from "highcharts-react-official";
import "./chart.css";
drilldown(Highcharts);

const Newgraph = (props) => {
    const [subCategory, setSubCategory] = useState(false);
    const [categoryData, setData] = useState([]);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState({});
    console.log("PROPS---DATASETS", props.datasets);
    let Data = props.datasets;

    // let Data = [
    //     {
    //         y: 11,
    //         name: "openness",
    //         category: [
    //             "adventurous",
    //             "artistic",
    //             "emotionally_aware",
    //             "imaginative",
    //             "intellectual",
    //             "authority_challenging",
    //         ],
    //         data: [1, 76, 73, 79, 82, 89],
    //         color: "#FF9843",
    //     },
    //     {
    //         y: 32,
    //         name: "conscientiousness",
    //         category: [
    //             "achievement_striving",
    //             "cautious",
    //             "dutiful",
    //             "disciplined",
    //             "self_efficacy",
    //         ],
    //         data: [80, 100, 85, 87, 89],
    //         color: "#D24545",
    //     },
    //     {
    //         y: 7,
    //         name: "extraversion",
    //         category: [
    //             "active",
    //             "assertive",
    //             "cheerful",
    //             "excitement_seeking",
    //             "outgoing",
    //             "gregariousness",
    //         ],
    //         data: [89, 81, 24, 0, 74, 75],
    //         color: "#86A7FC",
    //     },
    //     {
    //         y: 18,
    //         name: "agreeableness",
    //         category: [
    //             "altruism",
    //             "modesty",
    //             "uncompromising",
    //             "sympathy",
    //             "cooperative",
    //             "trusting",
    //         ],
    //         data: [77, 35, 84, 18, 87, 95],
    //         color: "#597E52",
    //     },
    //     {
    //         y: 32,
    //         name: "neuroticism",
    //         category: [
    //             "fiery",
    //             "prone_to_worry",
    //             "immoderation",
    //             "melancholy",
    //             "self_conscious",
    //             "orderliness",
    //             "stress_prone",
    //         ],
    //         data: [31, 82, 13, 31, 30, 78, 89],
    //         color: "#FF8F8F",
    //     },
    // ];

    const colors = ["#252D52", "#005CE2", "#00E5C2", "#5474B5", "#f1f1f1"];

    const categories = [
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
    ];

    //  const Data1=Data.map((item)=>console.log("----item---name----",item.name))

    const data = [];
    Data.map((item) => {
        let sum = item.data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        let a = [];
        for (const e of item.data) {
            a.push(Math.round((e / sum) * 100));
        }
        data.push({
            y: item.y,
            color: item.color,
            drilldown: {
                name: item.name,
                categories: item.category,
                data: a,
                color: item.color,
            },
        });
    });

    const browserData = [];
    const versionsData = [];
    let i;
    let j;
    const dataLen = data.length;
    let drillDataLen;
    let brightness;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {
        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            // color: data[i].color,
        });
        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - j / drillDataLen / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                // color: data[i].color,
            });
        }
    }

    // Create the chart
    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Top 5 Personality Traits",
        },
        //   subtitle: {
        //     text: ""
        //   },
        subtitle: {
            text: "",
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ["50%", "50%"],
                cursor: "pointer",
                allowPointSelect: true,
                colors: colors,
                // size:'100%',
                // height:'100%'
                size: "60%",
                innerSize: "20%",
                
                
            },
            series: {
                point: {
                    events: {
                        click: (e) => {
                            setData(versionsData);
                            setSelected(e.point);
                            setSubCategory(true);
                            setName(e.point.name.toLowerCase());
                        },
                    },
                },
            },
            size: '60%',
            innerSize: '20%',
        },
        tooltip: {
            valueSuffix: "%",
        },
        series: [
            {
                name: "Category %",
                data: browserData,
                size: "100%",
                innerSize: "0%",
                dataLabels: {
                    format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
                    filter: {
                        property: "y",
                        operator: ">",
                        value: 1,
                    },
                },
            },
            // {
            //     name: "subcateory %",
            //     data: browserData,
            //     size: "100%",
            //     innerSize: "00%",
            //     dataLabels: {
            //         format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
            //         filter: {
            //             property: "y",
            //             operator: ">",
            //             value: 1,
            //         },
            //         style: {
            //             fontWeight: "normal",
            //         },
            //     },
            //     id: "versions",
            // },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        minWidth: "100%",
                        minHeight: "200%",
                    },
                    chartOptions: {
                        series: [
                            {},
                            {
                                id: "versions",
                                dataLabels: {
                                    distance: 10,
                                    format: "{point.custom.version}",
                                    filter: {
                                        property: "percentage",
                                        operator: ">",
                                        value: 2,
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
    // let wide = false;

    // document.getElementById('reflow-chart').addEventListener('click', () => {
    //   document.getElementById('container').style.width = wide ? window.innerWidth - 310 + 'px' : window.innerWidth - 90 + 'px';
    //   wide = !wide;
    //   options.reflow();
    //   console.log(document.documentElement.clientWidth);

    // });

    return (
        <>
            <PieChart
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
    const CATEGORY_CONFIG = {
        openness: [
            "adventurous",
            "artistic",
            "emotionally_aware",
            "imaginative",
            "intellectual",
            "authority_challenging",
        ],
        conscientiousness: [
            "cautious",
            "disciplined",
            "dutiful",
            "achievement_striving",
            "self_efficacy",
        ],
        extraversion: [
            "active",
            "assertive",
            "cheerful",
            "excitement_seeking",
            "outgoing",
        ],
        agreeableness: [
            "cooperative",
            "trusting",
            "altruism",
            "modesty",
            "uncompromising",
            "sympathy",
        ],
        neuroticism: [
            "melancholy",
            "self_conscious",
            "orderliness",
            "stress_prone",
            "fiery",
            "immoderation",
        ],
    };
    const s = CATEGORY_CONFIG[name];
    let f = [];
    for (const i of s) {
        for (const k of data) {
            if (k.name === i) {
                f.push({
                    name: k.name,
                    value: k.y,
                    fillStyle: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${k.y}%, #808080 ${k.y}%, #808080 100%)`,
                });
            }
        }
    }
    return (
        <>
            <div className="subcategory-header">
                <h3>{name}</h3>
            </div>
            {name !== ""
                ? f.map((e) => (
                      <div className="input-controller">
                          <span className="input-label">
                              <label for={e.name}>
                                  {e.name.replace("_", " ")}
                              </label>
                          </span>
                          <span className="input-control">
                              <input
                                  name={e.name}
                                  type="range"
                                  value={e.value}
                                  min={0}
                                  max={100}
                                  className="range"
                                  style={{
                                      "--color": isSelected.color,
                                  }}
                              />
                          </span>
                          <span className="input-value">{e.value}%</span>
                      </div>
                  ))
                : null}
        </>
    );
}

export default Newgraph;
