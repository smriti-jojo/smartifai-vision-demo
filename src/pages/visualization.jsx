import React from 'react';
import logo from "../assets/smartifai.png";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../component/Loader/Loader';
import instance from '../instance';
import Graph from '../component/Graph';
import Newgraph from '../component/Newgraph';
import Highcharts from "highcharts/highstock";
import PieChart from '../component/Latestgraph';
import profileinstance from '../profileInstance';


const Visualization = () => {
  const [datasets,setdatasets]=useState([]);
  const [open,setopen]=useState(false);
  const [url,seturl]=useState("");
  const [buttonOpen,setButtonOpen]=useState(false);
  const [CategoryData,setCategoryData]=useState([]);
  const [number1,setnumber1]=useState([]);
  const[userName,setuserName]=useState("");

  const colors = Highcharts.getOptions().colors;
  useEffect(()=>{
     generateNumbersWithSum(targetSum, count);
     
    // formatData();
   },[])

// const formatData=()=>{
//   let Totalsum=0;
//   // datasets.map((item)=>
//   // {
//   //   console.log("ITEM-Data",item.y)
  
//   // }
//   // )
//   for(let i=0;i<CategoryData.length;i++){
//     Totalsum =Totalsum+CategoryData[i];
//   }
// for(let i=0;i<CategoryData.length;i++){
//   let array=[];
// console.log("TotalSum",Totalsum);
// let value=CategoryData[i]/Totalsum;
// array.push(CategoryData[i]/Totalsum);
//   setnumber1(array);
// }
// console.log("------------number1----------",number1);
// }



  //  formatData() {
  //   // Calculate the total sum of scores
  //   const totalSum = this.topFiveCategories.reduce(
  //     (acc = 0, curr) => acc + curr.score,
  //     0
  //   );

  //   // Calculate the percentage for each label
  //   const labeledPercentages = this.topFiveCategories.map((labelScore) => [
    
  //     (labelScore.score / totalSum) * 100,
  //   ]);

  //   this.pieData = labeledPercentages;
  // }
  function generateRandomNumbersWithSum(total, count) {
    let numbers = [];
    
    // Generate random numbers
    for (let i = 0; i < count - 1; i++) {
        let randomNumber = Math.floor(Math.random() * (total - count + 1)) + 1;
        numbers.push(randomNumber);
        total -= randomNumber;
    }
    
    // Last number is calculated to ensure sum equals total
    numbers.push(total);
    
    return numbers;
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateNumbersWithSum(targetSum, count) {
    let numbers = generateRandomNumbersWithSum(targetSum, count);
    // Shuffle the numbers to make them appear in a random order
    numbers = shuffleArray(numbers);
    return numbers;
}

const targetSum = 100;
const count = 5;
const numbers = generateNumbersWithSum(targetSum, count);
// console.log("Random numbers with sum 100:", numbers);

// const AnalyzeProfile=async()=>{
//   const res= await profileinstance({
//     url:`get_tweets?username=sachinrrjain&number=2`,
//     method:"GET",
//     headers:{
//       "Access-Control-Allow-Origin":"*",
//       "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
//     }
//      })
//      console.log("AnalyzeProfile----",res);
// }

// const fetchPromise = fetch("https://third-tender-bass.glitch.me/get_tweets?username=sachinrrjain&number=10", {
//   method: "POST",
//   mode: "cors",
//   headers: {
//     "Content-Type": "text/xml",
//     "X-PINGOTHER": "pingpong",
//   },
//   body: "<person><name>sachinrrjain</name></person>",
// });

// fetchPromise.then((response) => {
//   console.log("twitter-------------",response.status);
// });
// const fetchPromise = fetch("https://third-tender-bass.glitch.me/get_tweets?username=sachinrrjain&number=10");

// const fetch=()=>{
//   fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("-----fetchdata-------",data);
//   });
// }
// fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("-----fetchdata-------",data);
//   });
  // const CreateProfile=async()=>{
  //   setopen(true);
  //   setButtonOpen(true);
  //   const key="chrexec_e98b9d61aa2d00eb4f3b2c166450ddf4";
  //   const id=url;
  //   // console.log("---data----");
  //   const res= await instance({
  //     url:`v1/user-profile/create?apikey=${key}&id=${id}`,
  //     method:'POST',
  // })
  // console.log("data",res.data);
  // const data1=res.data;
  // if(data1?.results){
    // console.log("success");
    // add a dialog box for 1st time registration
      //  setDialog(true);
    //  setTimeout(async() => {
      //  setAlert(true);
      // setopen(true);
  //      await GraphData();
  //  }, 60000);
  //  setAlert(true);
//  await GraphData();
     
  // }
  // else{
  //   // console.log("---render---");
  //   setopen(true);
  //   GraphData();
  // }
  // }
const handleInput=()=>{
  console.log("--url----",url);
  console.log("--urlsplit----",url.split('/')[3]);
  let twitterName=url.split('/')[3];
  setuserName(twitterName);
const twitterRegex=/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
console.log("twitterRegex",twitterRegex.test(url));
{twitterRegex.test(url)?console.log("Hii"):GraphData()}
}


  
  const GraphData=async()=>{
     setopen(true);
     setButtonOpen(true);
  const key="chrexec_e98b9d61aa2d00eb4f3b2c166450ddf4";
  const id=url;
  const persona="sales";
    try{
    const res= await instance({
        url:`big5`,
        method:'POST',
        data:[{
          "id": "",
          "language": "en",
           "text":url
        }],
        headers:{
          "X-RapidAPI-Key":"f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
        "X-RapidAPI-Host":"big-five-personality-insights.p.rapidapi.com",
        }
        
    })
     console.log("GraphData",res.data[0]);
     console.log("GraphDataLength",Object.keys(res.data[0]).length);
     setCategoryData([res.data[0].openness,res.data[0].conscientiousness,res.data[0].extraversion,res.data[0].agreeableness,res.data[0].neuroticism]);
     const data=res.data;
    //  let newOpennessOutputData={};
     let newOpennessData={};
     let newConscientiousnessOutputData={};
     let newExtraversionOutputData={};
     let newAgreeablenessOutputData={};
     let newNeuroticismOutputData={};
     let SubOpenness=["adventurous","artistic","emotionally_aware","imaginative","intellectual","authority_challenging"];
     let SubConscientiousness=["achievement_striving","cautious","dutiful","disciplined","self_efficacy"];
     let SubExtraversion=["active","assertive","cheerful","excitement_seeking","outgoing","gregariousness"];
     let SubAgreeableness=["altruism","modesty","uncompromising","sympathy","cooperative","trusting"];
     let SubNeuroticism= ["fiery", "prone_to_worry", "immoderation", "melancholy","self_conscious","orderliness","stress_prone"];
      let OpennessData=[];
      let Data=[];
      let ConscientiousnessData=[];
      let ExtraversionData=[];
      let AgreeablenessData=[];
      let NeuroticismData=[];
     for(let i=0;i<Object.keys(res.data[0]).length;i++){
      // console.log("dataValues",obj.openness);
    
      if(res.data[i].openness){
        let openness1=res.data[i].openness;
        // for(let j=0;j<SubOpenness.length;j++){
        //   newOpennessData[SubOpenness[j]]=res.data[0][SubOpenness[j]];
        // }
        // newOpennessOutputData["openness"]={data:openness1,subCategory:newOpennessData,color:'#D04848'};
        // Data.push(newOpennessOutputData);
        for(let j=0;j<SubOpenness.length;j++){
          OpennessData.push(Math.round(res.data[0][SubOpenness[j]]*100));
          // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
        }
        newOpennessData={y:numbers[0],name:'openness',category:SubOpenness,data:OpennessData,color:'#FF9843'}
        // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
        Data.push(newOpennessData);
      }
      // console.log("--Subcloseness------------------------",newOpennessData);

      if(res.data[i].conscientiousness){
        // let conscientiousness1=res.data[i].conscientiousness;
        for(let j=0;j<SubConscientiousness.length;j++){
          // newConscientiousnessData[SubConscientiousness[j]]=res.data[0][SubConscientiousness[j]];
          ConscientiousnessData.push(Math.round(res.data[0][SubConscientiousness[j]]*100));
        }
        console.log(" ConscientiousnessData---------------------", ConscientiousnessData);
        newConscientiousnessOutputData={y:numbers[1],name:'conscientiousness',category:SubConscientiousness,data:ConscientiousnessData,color:'#D24545'}
         Data.push(newConscientiousnessOutputData);
      }
      // console.log("--SubclosenessConscientiousness------------------------",newConscientiousnessOutputData);

      
      if(res.data[i].extraversion){
        // let extraversion1=res.data[i].extraversion;
        for(let j=0;j<SubExtraversion.length;j++){
          // newExtraversionData[SubExtraversion[j]]=res.data[0][SubExtraversion[j]];
          // ExtraversionData.push(res.data[0][SubExtraversion[j]]);
          ExtraversionData.push(Math.round(res.data[0][SubExtraversion[j]]*100));
        }
        newExtraversionOutputData={y:numbers[2],name:'extraversion',category:SubExtraversion,data:ExtraversionData,color:'#86A7FC'}
        Data.push(newExtraversionOutputData);
      }
      console.log("--SubclosenessnewExtraversionOutputData------------------------", newExtraversionOutputData);

      if(res.data[i].agreeableness){
        // let agreeableness1=res.data[i].agreeableness;
        for(let j=0;j<SubAgreeableness.length;j++){
          // newAgreeablenessData[SubAgreeableness[j]]=res.data[0][SubAgreeableness[j]];
          AgreeablenessData.push(Math.round(res.data[0][SubAgreeableness[j]]*100));
        }
        newAgreeablenessOutputData={y:numbers[3],name:'agreeableness',category:SubAgreeableness,data:AgreeablenessData,color:'#597E52'};
        Data.push(newAgreeablenessOutputData);
      }
      console.log("--SubclosenessnewAgreeablenessOutputData------------------------", newAgreeablenessOutputData);

      if(res.data[i].neuroticism){
        // let neuroticism1=res.data[i].neuroticism;
        for(let j=0;j<SubNeuroticism.length;j++){
          // newNeuroticismData[SubNeuroticism[j]]=res.data[0][SubNeuroticism[j]];
          NeuroticismData.push(Math.round(res.data[0][SubNeuroticism[j]]*100));
        }
        // newNeuroticismOutputData["neuroticism"]={data:neuroticism1,subCategory:newNeuroticismData,color:'#99BC85'};
        // Data.push(newNeuroticismOutputData);
        newNeuroticismOutputData={y:numbers[4],name:'neuroticism',category:SubNeuroticism,data:NeuroticismData,color:'#FF8F8F'};
        Data.push(newNeuroticismOutputData);
      }
      console.log("--SubclosenessnewAgreeablenessOutputData------------------------", newNeuroticismOutputData);
      console.log("-----DATA-----",Data);
      
      setdatasets(Data);
      setButtonOpen(false);
      setopen(false);
     }
   

//     const results=res?.data?.results;
//     // console.log("Summary",results.personality_analysis.summary);
//     const Summary=results.personality_analysis.summary;
//     const parameters=results.personality_analysis.ocean_assessment;
//   //  console.log("KEYS",Object.keys(parameters));
//    let dataset={};
//    for(let obj in parameters){
//     // console.log("item",parameters[obj].score *10);
//     dataset.push(parameters[obj].score *10);
   
//    }
//    console.log("dataset",dataset);
//  const dataset=[20,50,10,3,30];
//  setdatasets(dataset);
//    setsummaryDesc(Summary.disc.description);
//    setDesc(Summary.ocean.description);
//    const labels1=Object.keys(parameters);
//    setlabels(labels1);
//    setButtonOpen(false);
   
  }
  catch(error){
    // console.log("error",error.response.data);
    setopen(false);
   
  }
}



  return (
    <div className='min-h-screen min-w-full'>
      <div className='flex justify-center'>
        <div className='flex-col '>
        <div><img  src={logo} alt='logo' className='w-[55%]'/></div> 
        <div className='text-blue-400 text-xl font-bold '> Personality Traits Analysis<div/></div>
    </div>
        </div>
        <div className='flex flex-col lg:flex-row mx-[10%]  mt-[3%] '>
          <div className='flex w-full'><div className='flex justify-center lg:mx-[3%]  text-blue-400 font-bold text-md lg:text-xl'>Enter <span className='ml-[0.5rem]'>text </span><span>:</span></div>
            <div className='w-full'><TextField variant='outlined' aria-label='url' size='small' className='!w-full lg:!w-[100%]' onChange={(e)=>seturl(e.target.value)}/></div>
          </div> <div className='mx-0 lg:mx-5 flex justify-center mt-[5%] lg:mt-0'><Button variant='contained' className={`${buttonOpen?'!bg-yellow-400':' !bg-blue-600'}`}onClick={handleInput}>{buttonOpen?"Analyzing...":"Analyze"}</Button></div> 
            </div>
            <div className='flex mx-[15%] mt-[2%]'>
              {/* <div className='w-[150vh]'>
              <Newgraph datasets={datasets}/> 
              </div> */}
             {/* <Newgraph datasets={datasets}/> */}
             {/* {open?
              <div className='w-full'>
              {datasets.length===0?<Loader/>:<div className='w-[120vh] '> <Newgraph datasets={datasets} /></div>}
            </div> :<div></div>
} */}
<div className=''>
{open?<div className='w-[120vh]'><Loader/></div>: <div className='w-[120vh]'>{datasets.length===0?<div className=''></div>:<Newgraph datasets={datasets} />}</div>}
            </div>
      </div>     
    </div>
  )
}

export default Visualization
