import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import logo from "../assets/smartifai.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DoughnutChart from '../component/Graph-UI';
import instance from '../instance';
import profileinstance from '../profileInstance';
import Swal from 'sweetalert2';
import linkedinInstance from '../linkedinInstance';
import Loader from '../component/Loader/Loader';




const NewVisualization = () => {
    const[profiletype,setProfile]=useState("");
    const[url,seturl]=useState("");
    const[textFieldError,settextFieldError]=useState(false);
    const[profileurls,setProfileUrls]=useState([]);
    const[analyseButton, setanalyseButton]=useState(false);
    const[twitterUrl,settwitterUrl]=useState("");
    const [twitterUserName,settwitterUserName]=useState("");
    const[twitterdata,settwitterData]=useState([]);
    const [datasets,setdatasets]=useState([]);
  const [open,setopen]=useState(false);
  const [buttonOpen,setButtonOpen]=useState(false);
  const [userid,setuserid]=useState("");
  const [CategoryData,setCategoryData]=useState([]);
  const [linkData,setlinkData]=useState([]);
  const[numbers,setNumbers]=useState([]);
  const[linkedinClick,setlinkedinClick]=useState(false);
  // const[text,settext]=useState("");
  const[openness1,setopenness1]=useState(0);
  const[conscientiousness1,setconscientiousness1]=useState(0);
  const[extraversion1,setextraversion1]=useState(0);
  const[agreeableness,setagreeableness]=useState(0);
  const[neuroticism,setneuroticism]=useState(0)
  const[consolidate,setConsolidate]=useState(false);
  const[data,setData]=useState("");
  const[twittererror,settwitterError]=useState(false);
  const[linkedinerror,setlinkedinError]=useState(false);
  const[linkUsername,setlinkUsername]=useState("");
  
  const urlSet=[...profileurls];
  // const[linkedinButton,setlinkedinButton]=useState(false);

//     useEffect(()=>{
// console.log("----consolidate-color---")
//        setConsolidateColor(true);

//       },[twitterdata.length !==0 && linkData.length !==0])


  // useEffect(()=>{
  //    divideInputs(openness1, conscientiousness1, extraversion1, agreeableness,neuroticism)
  // },[datasets.length>0])
  
function divideInputs(openness1, conscientiousness1, extraversion1, agreeableness,neuroticism) {
  // Calculate the total sum of inputs
  let total = openness1 + conscientiousness1 + extraversion1 + agreeableness + neuroticism;

  // Calculate the percentages
  let percentage1 = Math.round((openness1 / total) * 100);
  let percentage2 = Math.round((conscientiousness1 / total) * 100);
  let percentage3 = Math.round((extraversion1 / total) * 100);
  let percentage4 = Math.round((agreeableness / total) * 100);
  let percentage5 = Math.round((neuroticism / total) * 100);

  return [percentage1, percentage2, percentage3, percentage4, percentage5];
}
 
const handleUrl=(url)=>{
    // let urlSet=[...profileurls];
    setanalyseButton(false);
    console.log("url---------",url);
    if (url.includes('https://www.linkedin.com/')) {
        setProfile("linkedin");
        settextFieldError(false);
        handleUrlInput(url);
       
        
    } else if (url.includes('https://twitter.com/')) {
        setProfile("twitter");
        settextFieldError(false);
        handleInput(url);
     
    } else {
        settextFieldError(true);
    }
    if(url.length===0){
        settextFieldError(false);
    }
    console.log("----profileurl",urlSet);

    const urlArray = urlSet.filter((item, index) => {
        return urlSet.indexOf(item) === index;
    });
    setProfileUrls(urlArray);
}

const handleData=async()=>{
    // seturl(urlSet);
    setopen(true);
    setanalyseButton(true);
    setlinkedinClick(true);
    if(profiletype==="linkedin"){
       await LinkedinData2();
    //    seturl(urlSet);
    }else{
      await twitterData();
    //   seturl(urlSet);
    }
    
}
    const handleInput=(value)=>{
      console.log("urlset------",profileurls);
    urlSet.push(value);
        console.log("--url----",value);
        console.log("--urlsplittwitter----",value.split('/')[3]);
        const twitterRegex=/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
        if(!twitterRegex.test(value)){
          settwitterError(true);
        }
   
        else{
          settwitterError(false);
          settwitterUrl(value);
        let twitterName=value.split('/')[3];
        console.log("twitterName",twitterName);
        settwitterUserName(twitterName);
        }
      // const twitterRegex=/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
      // console.log("twitterRegex",twitterRegex.test(value));
    
      }

    

      const twitterData=async()=>{
        console.log("twitterDataclciked--------------");
        // setopen(true);
        setButtonOpen(true);

        try{
        const res= await profileinstance({
            url:`user/tweets?username=${twitterUserName}`,
            method:'GET',
            headers:{
              "X-RapidAPI-Key":"f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
            "X-RapidAPI-Host":"twitter154.p.rapidapi.com",
            }
            
        })
        console.log("-------twitterData----",res.data);
        console.log("-------twitterDataresults----",res.data.results);
        // if(res.data.details.details ===`'Twitter user with username = ${twitterUserName} not found'`){
        //   alert(`${twitterUserName} not found`)
        // }
        const datatwitter=res.data.results;
        const tweetdata=[];
        datatwitter.map((item)=>{
        tweetdata.push(item.text);
        })
        console.log("tweetdata------",tweetdata);
        if(tweetdata.length===0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sufficient Data Not Available!"
          
          });
          setdatasets([]);
          setButtonOpen(false);
          setopen(false);
        }
        else{
          divideInputs(openness1, conscientiousness1, extraversion1, agreeableness,neuroticism);
        settwitterData(tweetdata);
        setTimeout(()=>{
            GraphData(tweetdata);
        },500);
        }
        // divideInputs(openness1, conscientiousness1, extraversion1, agreeableness,neuroticism);
        // settwitterData(tweetdata);
        // setTimeout(()=>{
        //     GraphData(tweetdata);
        // },500);
      }catch(e){
        if(e){
          // alert("user not found");
          // if(twitterData.length>0 && linkData.length>0){
          //   settwitterData([]);
          //   setlinkData([]);
          // }
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Not Available!"
          
          });
        
        //   setdatasets([]);
        profileurls.pop();
          setButtonOpen(false);
          setopen(false);
          // if(twitterData.length>0 && linkData.length>0){
          //   settwitterData([]);
          //   setlinkData([]);
          // }
        }
       
      }
      }

      const GraphData=async(postData)=>{
        // setopen(true);
    //   const text=twitterData.toString();
    // setGraphReady(true);
    seturl(urlSet);
    console.log("-------linkedinData-------",linkData);
      let text=postData.toString();
    
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
              "text":text
           }],
           headers:{
             "X-RapidAPI-Key":"f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
           "X-RapidAPI-Host":"big-five-personality-insights.p.rapidapi.com",
           }
           
       })
        console.log("GraphData",res.data[0]);
        console.log("GraphDataLength",Object.keys(res.data[0]).length);
        setCategoryData([res.data[0].openness,res.data[0].conscientiousness,res.data[0].extraversion,res.data[0].agreeableness,res.data[0].neuroticism]);
        console.log("----categoryData-------",CategoryData);
       
        let percentagesData=divideInputs(res.data[0].openness,res.data[0].conscientiousness,res.data[0].extraversion,res.data[0].agreeableness,res.data[0].neuroticism)
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
           let openness2=res.data[i].openness;
           setopenness1(openness2);
           // for(let j=0;j<SubOpenness.length;j++){
           //   newOpennessData[SubOpenness[j]]=res.data[0][SubOpenness[j]];
           // }
           // newOpennessOutputData["openness"]={data:openness1,subCategory:newOpennessData,color:'#D04848'};
           // Data.push(newOpennessOutputData);
           for(let j=0;j<SubOpenness.length;j++){
            let openness={};
            openness.name=SubOpenness[j];
            openness.y=Math.round(res.data[0][SubOpenness[j]]*100);
             OpennessData.push(openness);
             // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
           }
           newOpennessData={y:percentagesData[0],name:'Openness',category:SubOpenness,data:OpennessData,color:'#00008B'}
           // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
           Data.push(newOpennessData);
         }
         // console.log("--Subcloseness------------------------",newOpennessData);
   
         if(res.data[i].conscientiousness){
            let conscientiousness2=res.data[i].conscientiousness;
            setconscientiousness1(conscientiousness2);
           for(let j=0;j<SubConscientiousness.length;j++){
             // newConscientiousnessData[SubConscientiousness[j]]=res.data[0][SubConscientiousness[j]];
             let conscientiousness={};
             conscientiousness.name=SubConscientiousness[j];
             conscientiousness.y=Math.round(res.data[0][SubConscientiousness[j]]*100);
             ConscientiousnessData.push(conscientiousness);
           }
           console.log(" ConscientiousnessData---------------------", ConscientiousnessData);
           newConscientiousnessOutputData={y:percentagesData[1],name:'Diligence',category:SubConscientiousness,data:ConscientiousnessData,color:'#0000FF'}
            Data.push(newConscientiousnessOutputData);
         }
         // console.log("--SubclosenessConscientiousness------------------------",newConscientiousnessOutputData);
   
         
         if(res.data[i].extraversion){
           let extraversion2=res.data[i].extraversion;
           setextraversion1(extraversion2);
           for(let j=0;j<SubExtraversion.length;j++){
             // newExtraversionData[SubExtraversion[j]]=res.data[0][SubExtraversion[j]];
             // ExtraversionData.push(res.data[0][SubExtraversion[j]]);
             let extraversion={};
             
             if(SubExtraversion[j]==="gregariousness"){
            extraversion.name="sociablity";
             extraversion.y=Math.round(res.data[0][SubExtraversion[j]]*100);
             }
             else{
             extraversion.name=SubExtraversion[j];
             extraversion.y=Math.round(res.data[0][SubExtraversion[j]]*100);
             }
             ExtraversionData.push(extraversion);
           }
           newExtraversionOutputData={y:percentagesData[2],name:'Dynamism',category:SubExtraversion,data:ExtraversionData,color:'#75E6DA'}
           Data.push(newExtraversionOutputData);
         }
         console.log("--SubclosenessnewExtraversionOutputData------------------------", newExtraversionOutputData);
   
         if(res.data[i].agreeableness){
           let agreeableness1=res.data[i].agreeableness;
           setagreeableness(agreeableness1)
           for(let j=0;j<SubAgreeableness.length;j++){
             // newAgreeablenessData[SubAgreeableness[j]]=res.data[0][SubAgreeableness[j]];
             let agreeableness={};
         
             agreeableness.name=SubAgreeableness[j];
             agreeableness.y=Math.round(res.data[0][SubAgreeableness[j]]*100);
             AgreeablenessData.push(agreeableness);
           }
           newAgreeablenessOutputData={y:percentagesData[3],name:'Agreeableness',category:SubAgreeableness,data:AgreeablenessData,color:'#0E86D4'};
           Data.push(newAgreeablenessOutputData);
         }
         console.log("--SubclosenessnewAgreeablenessOutputData------------------------", newAgreeablenessOutputData);
   
         if(res.data[i].neuroticism){
            let neuroticism1=res.data[i].neuroticism;
            setneuroticism(neuroticism1);
           for(let j=0;j<SubNeuroticism.length;j++){
            console.log("neurotism---------",SubNeuroticism[j]);
            let Neuroticism={};
             // newNeuroticismData[SubNeuroticism[j]]=res.data[0][SubNeuroticism[j]];
            //  NeuroticismData.push(Math.round(res.data[0][SubNeuroticism[j]]*100));
            if(SubNeuroticism[j]==="prone_to_worry"){
                Neuroticism.name="Worry Prone";
                Neuroticism.y=Math.round(res.data[0][SubNeuroticism[j]]*100);
            }
            else{
            Neuroticism.name=SubNeuroticism[j];
            Neuroticism.y=Math.round(res.data[0][SubNeuroticism[j]]*100);
            }
             NeuroticismData.push(Neuroticism);
           }
           // newNeuroticismOutputData["neuroticism"]={data:neuroticism1,subCategory:newNeuroticismData,color:'#99BC85'};
           // Data.push(newNeuroticismOutputData);
           newNeuroticismOutputData={y:percentagesData[4],name:'Emotional Range',data:NeuroticismData,color:'#7EC8E3'};
           console.log("---newNeuroticismData--------",newNeuroticismOutputData);
           Data.push(newNeuroticismOutputData);
         }
         console.log("--SubclosenessnewAgreeablenessOutputData------------------------", newNeuroticismOutputData);
         console.log("-----DATA-----",Data);
         

         setdatasets(Data);
         setButtonOpen(false);
         setConsolidate(false);
         setlinkedinClick(false);
         setopen(false);
        }
      
   
   
      
     }
     catch(error){
       // console.log("error",error.response.data);
       setopen(false);
       setButtonOpen(false);
        setopen(false);
      
     }
   }
   const LinkedinData2=async()=>{
    console.log("linkedinClick----------------");
    // setlinkedinClick(true);
    // setopen(true);
    const res= await linkedinInstance({
      url:`get-profile-posts?username=${linkUsername}`,
      method:'GET',

      headers:{
        // "X-RapidAPI-Key":"f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
        "X-RapidAPI-Key":"f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
      "X-RapidAPI-Host":"linkedin-api8.p.rapidapi.com",
      }
      
  })
  console.log("Linkeddata-----",res.data.data);
  let Data=res.data.data;
  let postData=[];
  if(Data.length !==0){
    // Swal.fire({
    //      icon: "error",
    //   title: "Oops...",
    //   text: "Sufficient data not available!",
    //   });
    Data.map((item)=>{
      postData.push(item.text);
    })
    setlinkData(postData);
    setTimeout(()=>{
      console.log("setPostData---------------",postData);
    
        GraphData(postData);
      
      // GraphData(postData);
  },1000);
  }
  else{
  
    Swal.fire({
      icon: "error",
   title: "Oops...",
   text: "Sufficient data not available!",
   });
//    setdatasets([]);
   setopen(false);
   setlinkedinClick(false);
   profileurls.pop();
   console.log("profilesurls",profileurls);
  //  if(postData.length !==0){
  //   setdatasets([]);
  //  }
  }

   }

  

   const ConsolidateData=()=>{
    // setConsolidate(true);
    // setopen(true);
    console.log("twitterdata",twitterdata);
    console.log("linkData",linkData);
    const consolidateData=[];
    consolidateData.push(twitterdata);
    consolidateData.push(linkData);
   
    console.log("consolidateData----------",consolidateData);
    console.log("consolidateDatatype----------",typeof(consolidateData));
    if(twitterdata.length===0 || linkData.length===0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Twitter and Linkedin url!"
      
      });

    }
    else{
      setConsolidate(true);
    //   setopen(true);
    console.log("consolidateData",consolidateData);
    setTimeout(()=>{
      GraphData(consolidateData);
  },500);
}
   }
   
   const handleUrlInput=(value)=>{
      console.log("value",value);
      urlSet.push(value);
      console.log("--urlsplitLinkedin----",value.split('/')[4]);
      // const linkedinRegex=/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/
      // const linkedinRegex=/^http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/? /
      const linkedinRegex1=/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
       
      
      if(!linkedinRegex1.test(value)){
        setlinkedinError(true);
      }
    
      else{
        let linkName=value.split('/')[4];
        setlinkedinError(false);
        setlinkUsername(linkName);
    //   seturl(value);
      }
    
   }

   const LinkedinErrorData=()=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Linkedin Url!"
    
    });
   }
   const TwitterErrorData=()=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Twitter Url!"
    
    });
   }

   const twitterNotAvail=()=>{
    Swal.fire({
      icon: "error",
      title: "Please Enter Twitter Url!!!",
    });
   }

   const linkedinNotAvail=()=>{
    Swal.fire({
      icon: "error",
      title: "Please Enter Linkedin Url!!!",
    });
   }

   const resetButton=()=>{
    window.location.reload();
   }



  return (
    <div className='relative '>
    <div className='w-full'>
        <div className='flex justify-center'><div className='text-2xl font-bold mt-[5%] '>Personality Traits Analysis</div></div>
        {/* <div className='flex justify-center mt-[2%]'>  */}
        {/* <div className='flex-col'>
           <div className='w-[35rem]'> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<div>
            </div><div className='mx-5'> Lorem Ipsum has been the industry's standard dummy text ever </div></div>
        </div> */}
        {/* </div> */}
        <div className="flex justify-center mt-[3%] ">
                            <TextField
                                variant="outlined"
                                aria-label="url"
                                size="small"
                                className="!w-full lg:!w-[30%] !h-full"
                                // className={classes.roundedInput}
                                onChange={(e) => handleUrl(e.target.value)}
                                placeholder='Paste Linkedin Profile/ Twitter Profile url'
                                error={textFieldError}
                                helperText={
                                    textFieldError
                                        ? "Please Enter Valid Linkedin / Twitter Profile url"
                                        : ""
                                }
                                InputProps={{
                                    style: {
                                      borderRadius: "20px",
                                    }
                                  }}
                            />
                            <div className='ml-[1%]'>  <Button variant="contained" sx={ { borderRadius: 28 ,width:'120px'} } onClick={handleData} className={`${linkedinClick?'!bg-[#00008B]':' !bg-blue-600'} h-[2.5rem] w-[10rem]`}>{linkedinClick?"Analyzing...":"Analyse"}</Button></div>
                          
           </div>
                        </div>
                        <div className='absolute top-[4rem] left-[4rem]'>
                           <img src={logo} className='w-[60%]'/>
                        </div>

                        {/* <div className="">
                        {open ? (
                            <div className="w-[120vh]">
                                <Loader />
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                }}
                                className="w-full"
                            >
                                {datasets.length === 0 ? (
                                    <div className=""></div>
                                ) : (
                                    <Newgraph datasets={datasets} />
                                )}
                            </div>
                        )}
                    </div> */}

                    {/* <div className="">
                        {open && datasets.length===0 ? (
                            <div className="w-[120vh]">
                                <Loader />
                            </div>
                        ) :
                        
                        
                        (
                        <div className='flex gap-[2%]  mt-[4%] max-w-full max-h-full '>
                    
                            <div className='p-[4%] w-[25rem] h-[25rem] rounded-lg bg-[#E0F4FF] flex justify-center ml-[4rem]'>
                               <div className='flex-col'>
                                <div><AccountCircleIcon sx={{fontSize:'100px'}}/></div>
                                {/* <div><h1 className='font-bold'>Mahima Chaudhary</h1></div> */}
                                {/* <div className='text-sm'>Building Smartifai | APM</div> */}
                                 
                                {/* <div>{profileurls.map((item)=>{
                                return <div className='font-bold'>{item}</div>
                                })}</div>
                                </div>
                                </div>
                                <div className='w-[32rem] h-[25rem] rounded-lg bg-[#E0F4FF]'>
                                 <NewGraph3 datasets={datasets}/>
                                            </div>
                        </div>
                        )}
                        </div> */} 
                        <div className=''>

{open?<div className='w-full'><Loader/></div>: 
<div className='w-full'>{datasets.length===0?<div className=''></div>:<div className='flex gap-[2%]  mt-[6%] max-w-full max-h-full '>
                    
                    <div className='p-[4%] w-[25rem] h-[25rem] rounded-lg bg-[#E0F4FF] flex justify-center ml-[4rem] relative'>
                       <div className='flex-col'>
                        <div className='flex justify-center'><AccountCircleIcon sx={{fontSize:'100px'}}/></div>
                        {/* <div><h1 className='font-bold'>Mahima Chaudhary</h1></div> */}
                        {/* <div className='text-sm'>Building Smartifai | APM</div> */}
                        
                        <div className='h-[55%] max-w-full overflow-auto'>{profileurls.map((item,index)=>{
                       
                        if(index===profileurls.length-1){
                            return <div className='pt-4 w-[50%]'>
                                 <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full transform  text-sm px-1 animate-bounce">{analyseButton?"Latest Analysis":"Waiting For Analysis..."}</div>
                            <div className='font-bold text-[#0E86D4] animate-pulse '>{item}</div>
                        </div>
                        }
                        else{
                            return <div key={index} className='font-bold py-1 text-[#00008B]'>{item}</div>
                        }
                        })}</div>
                        <div className='absolute bottom-5 left-20'>
                        <Button variant="contained"  sx={ { borderRadius: 28} } onClick={ConsolidateData} className={`${consolidate?'!bg-[#00008B]':twitterdata.length !==0 && linkData.length !==0?' !cursor-pointer':'!bg-slate-600 !cursor-default'} h-[2.5rem] w-[15rem]`} disabled={twitterdata.length ===0 || linkData.length===0?true:false}>{consolidate && twitterdata.length !==0 && linkData.length !==0?"Analyzing...":"Consolidate Profiles"}</Button>
                     </div>
                        </div>
                        </div>
                        <div className='w-[32rem] h-[25rem] rounded-lg bg-[#E0F4FF]'>
                         <DoughnutChart datasets={datasets}/>
                                    </div>
                </div>}
                </div>
}
            </div>
</div>
  )
}

export default NewVisualization