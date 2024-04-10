import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./chart.css";
import { Doughnut } from "react-chartjs-2";
import './practice.css';
import { useEffect,useRef  } from "react";

const NewGraph3= (props) => {
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
            color: "#7EC8E3",
            
        },
    ];

    const options = {
        chart: {
            type: "pie",
            backgroundColor: '#E0F4FF',
            borderRadius:"10px"
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
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.percentage:.1f} %",
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
            enabled:false
        
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
        <div style={{ display: "flex",gap:'20%' }}>
            <div style={{ flex: 1,marginRight: "-15%" }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
            />
            </div>
            {subCategory ? (
                <div
                    style={{
                        width: "600px",

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
            </div>
        </>
    );
};

function SubCategory({ name = "", data = [], isSelected = {} }) {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (chartRef.current && data.length > 0) {
        Highcharts.chart(chartRef.current, {
          chart: {
            type: "bar",
            backgroundColor:'#E0F4FF',
            width:400,
            height:400,
            borderRadius:'10px'
          },
          title: {
            text: name
          },
          xAxis: {
            categories: data.map(e => capitalizeFirstLetter(e.name.replace("_", " ")))
          },
          yAxis: {
            title: {
              text: "Percentage"
            },
            labels: {
              format: "{value}%"
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: "{y}%",
                style: {
                  textOutline: false
                },
                overflow: "allow",
                crop: false,
                staggerLines: 1
              }
            }
          },
          series: [
            {
              name: name,
              data: data.map(e => e.y),
              color: isSelected.color
            }
          ]
        });
      }
    }, [data, isSelected.color, name]);
  
    const capitalizeFirstLetter = (string) => {
      return `<b>${string.charAt(0).toUpperCase() + string.slice(1)}</b>`;
    };
  
    return (
      <div>
       
        {name !== "" ? (
          <div ref={chartRef} />
        ) : null}
      </div>
    );
  }
export default NewGraph3;
