import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown";
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from "highcharts-react-official";
import Doughnut from "highcharts-react-official";
drilldown(Highcharts);


const Newgraph = (props) => {
console.log("PROPS---DATASETS",props.datasets);
let Data=props.datasets;

const colors = Highcharts.getOptions().colors;

const categories = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism"
];

//  const Data1=Data.map((item)=>console.log("----item---name----",item.name))

 const data = [];
    Data.map((item)=>{
    data.push(
    {
        y: item.y,
        color: item.color,
        drilldown: {
          name: item.name,
          categories: item.category,
          data: item.data,
          color:item.color
        }
    }
    )
      });
//   {
//     y: 62.74,
//     color: colors[2],
//     drilldown: {
//       name: "Openness",
//       categories: ["Adventurous","Artistic","Emotionally_Aware","Imaginative","Intellectual","Authority Challenging"],
//       data: [10,13,53,20,14,88]
//     }
//   },
//   {
//     y: 10.57,
//     color: colors[1],
//     drilldown: {
//       name: "Conscientiousness",
//       categories: [
//         "Achievement Striving",
//         "Cautious",
//         "Dutiful",
//         "Disciplined",
//         "Self Efficacy",
       
//       ],
//       data: [20, 36, 35, 11, 10]
//     }
//   },
//   {
//     y: 7.23,
//     color: colors[0],
//     drilldown: {
//       name: "Extraversion",
//       categories: [
//         "Active",
//         "Assertive",
//         "Cheerful",
//         "Excitement Seeking",
//         "Outgoing",
//         "Gregariousness"
//       ],
//       data: [6.2, 0.29, 0.27, 0.47]
//     }
//   },
//   {
//     y: 5.58,
//     color: colors[3],
//     drilldown: {
//       name: "Agreeableness",
//       categories: [
//         "Altruism",
//         "Modesty",
//         "Uncompromising",
//         "Sympathy",
//         "Cooperative",
//         "Trusting"
//       ],
//       data: [3.39, 0.96, 0.36, 0.54, 0.13, 0.2]
//     }
//   },
//   {
//     y: 4.02,
//     color: colors[5],
//     drilldown: {
//       name: "Neuroticism",
//       categories: ["Fiery", "Prone to Worry", "Immoderation", "Melancholy",
//       "Self Conscious","Orderliness","Stress Prone"],
//       data: [2.6, 0.92, 0.4, 0.1]
//     }
//   },
//   {
//     y: 1.92,
//     color: colors[4],
//     drilldown: {
//       name: "Opera",
//       categories: ["Opera v50.0", "Opera v49.0", "Opera v12.1"],
//       data: [0.96, 0.82, 0.14]
//     }
//   },
//   {
//     y: 7.62,
//     color: colors[6],
//     drilldown: {
//       name: "Other",
//       categories: ["Other"],
//       data: [7.62]
//     }
//   }
// ];

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
    color: data[i].color
  });

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1) {
    brightness = 0.2 - j / drillDataLen / 5;
    versionsData.push({
      name: data[i].drilldown.categories[j],
      y: data[i].drilldown.data[j],
      color: data[i].color
    //   custom: {
    //     version: name.split(' ')[1] || name.split(' ')[0]
    // }
    });
  }
}

// Create the chart
const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: "Top 5 Personality Traits"
  },
//   subtitle: {
//     text: ""
//   },
subtitle: {
    text: ''

},
  plotOptions: {
    pie: {
      shadow: false,
      center: ['50%', '50%'],
      // size:'100%',
      // height:'100%'
    }
  },
  tooltip: {
    valueSuffix: "%"
  },
  series: [
    {
      name: "Category %",
      data: browserData,
      size: "70%",
    //   innerSize: "70%",
      dataLabels: {
        // formatter: function () {
        //   return this.y > 5 ? this.point.name : null;
        // },
        color: "#ffffff",
        distance: '-30%'
      }
      
    },
    {
        name: 'subcateory %',
        data: versionsData,
        size: '100%',
        innerSize: '70%',
        dataLabels: {
            format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
            filter: {
                property: 'y',
                operator: '>',
                value: 1
            },
            style: {
                fontWeight: 'normal'
            }
        },
        id: 'versions'
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          minWidth: '100%',
          minHeight:'200%'
        },
        chartOptions: {
          series: [
            {},
            {
              id: "versions",
              dataLabels: {
                distance: 10,
                format: '{point.custom.version}',
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 2
                }
            }
            }
          ]
        }
      }
    ]
  }
  
};
// let wide = false;

// document.getElementById('reflow-chart').addEventListener('click', () => {
//   document.getElementById('container').style.width = wide ? window.innerWidth - 310 + 'px' : window.innerWidth - 90 + 'px';
//   wide = !wide;
//   options.reflow();
//   console.log(document.documentElement.clientWidth);

// });


  return (
    
      <PieChart highcharts={Highcharts} options={options}  containerProps={{ style: { height: "100%" ,width:"100%"} }} />
    
  )
}

export default Newgraph


