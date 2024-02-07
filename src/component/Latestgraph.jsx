import React, { useEffect, useState } from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";
drilldown(Highcharts);


const PieChart = ({ config }) => {
    const[yo,setyo]=useState(50);
  const [options, setOptions] = useState({
    accessibility: {
      enabled: false
    },
    title: {
      text: "Top 5 Personality Traits"
    },
    series: [
      {
        name: "traits %",
        data: [
          {
            drilldown:"Openness",
            name: "Openness",
            y: 21,
            color: "#FFEC48",
            visible: true,
            sliced: false,
            selected: false
          },
          {
            drilldown:"Conscientiousness",
            name: "Conscientiousness",
            y: 21,
            color:  "#F28585",
            visible: true,
            sliced: false,
            selected: false
          },
          {
            drilldown: "Extraversion",
            name:  "Extraversion",
            y: 26,
            color: "#F69707",
            visible: true,
            sliced: false,
            selected: false,
            y: 32,
            color: "#BDDBE6"
          },
          {
            drilldown: "Agreeableness",
            name: "Agreeableness",
            selected: false,
            sliced: false,
            visible: true,
            y: 32,
            color: "#B7E5B4"
          },
          {
            drilldown: "Neuroticism",
            name: "Neuroticism",
            selected: false,
            sliced: false,
            visible: true,
            y: 32,
            color: "#FDFFAB"
          }
        ]
      }
    ],
    summarized: false,
    drilldown: {
      series: [
        {
          name: "Openness",
          id: "Openness",
        //   ["adventurous","artistic","emotionally_aware","imaginative","intellectual","authority_challenging"];
          data: [
            {
              name: `adventurous-${yo} %`,
              y: 13,
              color: "#7DA7D9",
              visible: true,
              sliced: false,
              selected: false
            },
            {
              name: "artistic",
              y: 19,
              color: "#C74542",
              visible: true,
              sliced: false,
              selected: false
            },
            {
                name: "emotionally_aware",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "imaginative",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "authority_challenging",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "intellectual",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              }
          ]
        },
        {
            name: "Conscientiousness",
            id: "Conscientiousness",
            data: [
              {
                name: "1",
                y: 13,
                color: "#7DA7D9",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "2",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              }
            ]
        },
        {
            name: "Extraversion",
            id: "Extraversion",
            data: [
              {
                name: "1",
                y: 13,
                color: "#7DA7D9",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "2",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              }
            ]
        },
        {
            name: "Agreeableness",
            id: "Agreeableness",
            data: [
              {
                name: "1",
                y: 13,
                color: "#7DA7D9",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "2",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              }
            ]
        },
        {
            name: "Neuroticism",
            id: "Neuroticism",
            data: [
              {
                name: "1",
                y: 13,
                color: "#7DA7D9",
                visible: true,
                sliced: false,
                selected: false
              },
              {
                name: "2",
                y: 19,
                color: "#C74542",
                visible: true,
                sliced: false,
                selected: false
              }
            ]
        }
      ]
    },
    boost: {
      enabled: false
    },
    chart: {
      type: "pie",
      events: {
        drilldown: function (e) {
          setTimeout(() => {
            setOptions({ title: { text: "Top 5 Personality Traits" } });
          }, 5000);
        },
        drillup: function (e) {
          console.log("drilled up");
        }
      }
    }
  });

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%" } }}
      />
      ;
    </div>
  );
};



export default PieChart
