const configObj = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Top 5 personality Traits'
    },
    xAxis: {
        categories:    ["adventurous","artistic","emotionally_aware","imaginative","intellectual","authority_challenging"]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Top 5 Personality Traits'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        bar: {
          showInLegend: true,
        },
        series: {
            stacking: 'normal'
        }
    },
   
    series: [{
        name: "Openness",
        data: [5, 3, 4, 7, 2]
    }, {
        name: "Conscientiousness",
        data: [2, 2, 3, 2, 1]
    }, {
        name: "Extraversion",
        data: [3, 4, 4, 2, 5]
    },
{
    name:"Agreeableness",
    data: [3, 4, 4, 2, 5]  
},{
    name:"Neuroticism",
    data: [2, 2, 3, 2, 1]
}]
};

export default configObj;
