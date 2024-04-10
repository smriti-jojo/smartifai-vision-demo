import React from "react";
import logo from "../assets/smartifai.png";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import profileinstance from "../profileInstance";
import { useEffect } from "react";
import instance from "../instance";
import Loader from "../component/Loader/Loader";
import Newgraph from "../component/Newgraph";
import linkedinInstance from "../linkedinInstance";
import Swal from "sweetalert2";

const SocialVisualization = () => {
    const [url, seturl] = useState("");
    const [twitterUserName, settwitterUserName] = useState("");
    const [twitterdata, settwitterData] = useState([]);
    const [datasets, setdatasets] = useState([]);
    const [open, setopen] = useState(false);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [userid, setuserid] = useState("");
    const [CategoryData, setCategoryData] = useState([]);
    const [linkData, setlinkData] = useState([]);
    const [linkedinClick, setlinkedinClick] = useState(false);
    // const[text,settext]=useState("");
    const [openness1, setopenness1] = useState(0);
    const [conscientiousness1, setconscientiousness1] = useState(0);
    const [extraversion1, setextraversion1] = useState(0);
    const [agreeableness, setagreeableness] = useState(0);
    const [neuroticism, setneuroticism] = useState(0);
    const [consolidate, setConsolidate] = useState(false);
    const [twittererror, settwitterError] = useState(false);
    const [linkedinerror, setlinkedinError] = useState(false);
    // const[linkedinButton,setlinkedinButton]=useState(false);

    //     useEffect(()=>{
    // console.log("----consolidate-color---")
    //        setConsolidateColor(true);

    //       },[twitterdata.length !==0 && linkData.length !==0])

    // useEffect(()=>{
    //    divideInputs(openness1, conscientiousness1, extraversion1, agreeableness,neuroticism)
    // },[datasets.length>0])

    function divideInputs(
        openness1,
        conscientiousness1,
        extraversion1,
        agreeableness,
        neuroticism,
    ) {
        // Calculate the total sum of inputs
        let total =
            openness1 +
            conscientiousness1 +
            extraversion1 +
            agreeableness +
            neuroticism;

        // Calculate the percentages
        let percentage1 = Math.round((openness1 / total) * 100);
        let percentage2 = Math.round((conscientiousness1 / total) * 100);
        let percentage3 = Math.round((extraversion1 / total) * 100);
        let percentage4 = Math.round((agreeableness / total) * 100);
        let percentage5 = Math.round((neuroticism / total) * 100);

        return [
            percentage1,
            percentage2,
            percentage3,
            percentage4,
            percentage5,
        ];
    }

    const handleInput = (value) => {
        console.log("--url----", value);
        console.log("--urlsplit----", value.split("/")[3]);
        const twitterRegex =
            /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
        if (!twitterRegex.test(value)) {
            settwitterError(true);
        } else {
            settwitterError(false);
            let twitterName = value.split("/")[3];
            console.log("twitterName", twitterName);
            settwitterUserName(twitterName);
        }
        // const twitterRegex=/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
        // console.log("twitterRegex",twitterRegex.test(value));
    };

    const twitterUserId = async () => {
        const res = await profileinstance({
            url: `user/details?username=${twitterUserName}`,
            method: "GET",
            // data:[{
            //   "id": "",
            //   "language": "en",
            //    "text":url
            // }],
            headers: {
                "X-RapidAPI-Key":
                    "f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
                "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
            },
        });
        console.log("twitteruserid----", res.data);
        console.log("twitteruserid----", res.data.user_id);
        console.log("typeodtwitteruserid", typeof res.data.user_id);
        const user = res.data.user_id;
        const userid1 = parseInt(user);
        console.log("typeodtwitteruserid1----", typeof userid1);
        setuserid(userid1);
        setTimeout(() => {
            twitterData();
        }, 40000);
    };

    const twitterData = async () => {
        setopen(true);
        setButtonOpen(true);

        try {
            const res = await profileinstance({
                url: `user/tweets?username=${twitterUserName}`,
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
                    "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
                },
            });
            console.log("-------twitterData----", res.data);
            console.log("-------twitterDataresults----", res.data.results);
            // if(res.data.details.details ===`'Twitter user with username = ${twitterUserName} not found'`){
            //   alert(`${twitterUserName} not found`)
            // }
            const datatwitter = res.data.results;
            const tweetdata = [];
            datatwitter.map((item) => {
                tweetdata.push(item.text);
            });
            console.log("tweetdata------", tweetdata);
            divideInputs(
                openness1,
                conscientiousness1,
                extraversion1,
                agreeableness,
                neuroticism,
            );
            settwitterData(tweetdata);
            setTimeout(() => {
                GraphData(tweetdata);
            }, 500);
        } catch (e) {
            if (e) {
                // alert("user not found");
                // if(twitterData.length>0 && linkData.length>0){
                //   settwitterData([]);
                //   setlinkData([]);
                // }
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Not Available!",
                });
                setButtonOpen(false);
                setopen(false);
                // if(twitterData.length>0 && linkData.length>0){
                //   settwitterData([]);
                //   setlinkData([]);
                // }
            }
        }
    };

    const GraphData = async (postData) => {
        // setopen(true);
        //   const text=twitterData.toString();
        console.log("-------linkedinData-------", linkData);
        let text = postData.toString();

        const key = "chrexec_e98b9d61aa2d00eb4f3b2c166450ddf4";
        const id = url;
        const persona = "sales";
        try {
            const res = await instance({
                url: `big5`,
                method: "POST",
                data: [
                    {
                        id: "",
                        language: "en",
                        text: text,
                    },
                ],
                headers: {
                    "X-RapidAPI-Key":
                        "f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
                    "X-RapidAPI-Host":
                        "big-five-personality-insights.p.rapidapi.com",
                },
            });
            console.log("GraphData", res.data[0]);
            console.log("GraphDataLength", Object.keys(res.data[0]).length);
            setCategoryData([
                res.data[0].openness,
                res.data[0].conscientiousness,
                res.data[0].extraversion,
                res.data[0].agreeableness,
                res.data[0].neuroticism,
            ]);
            console.log("----categoryData-------", CategoryData);

            let percentagesData = divideInputs(
                res.data[0].openness,
                res.data[0].conscientiousness,
                res.data[0].extraversion,
                res.data[0].agreeableness,
                res.data[0].neuroticism,
            );
            const data = res.data;
            //  let newOpennessOutputData={};
            let newOpennessData = {};
            let newConscientiousnessOutputData = {};
            let newExtraversionOutputData = {};
            let newAgreeablenessOutputData = {};
            let newNeuroticismOutputData = {};
            let SubOpenness = [
                "adventurous",
                "artistic",
                "emotionally_aware",
                "imaginative",
                "intellectual",
                "authority_challenging",
            ];
            let SubConscientiousness = [
                "achievement_striving",
                "cautious",
                "dutiful",
                "disciplined",
                "self_efficacy",
            ];
            let SubExtraversion = [
                "active",
                "assertive",
                "cheerful",
                "excitement_seeking",
                "outgoing",
                "gregariousness",
            ];
            let SubAgreeableness = [
                "altruism",
                "modesty",
                "uncompromising",
                "sympathy",
                "cooperative",
                "trusting",
            ];
            let SubNeuroticism = [
                "fiery",
                "prone_to_worry",
                "immoderation",
                "melancholy",
                "self_conscious",
                "orderliness",
                "stress_prone",
            ];
            let OpennessData = [];
            let Data = [];
            let ConscientiousnessData = [];
            let ExtraversionData = [];
            let AgreeablenessData = [];
            let NeuroticismData = [];
            for (let i = 0; i < Object.keys(res.data[0]).length; i++) {
                // console.log("dataValues",obj.openness);

                if (res.data[i].openness) {
                    let openness2 = res.data[i].openness;
                    setopenness1(openness2);
                    // for(let j=0;j<SubOpenness.length;j++){
                    //   newOpennessData[SubOpenness[j]]=res.data[0][SubOpenness[j]];
                    // }
                    // newOpennessOutputData["openness"]={data:openness1,subCategory:newOpennessData,color:'#D04848'};
                    // Data.push(newOpennessOutputData);
                    for (let j = 0; j < SubOpenness.length; j++) {
                        OpennessData.push(
                            Math.round(res.data[0][SubOpenness[j]] * 100),
                        );
                        // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
                    }
                    newOpennessData = {
                        y: percentagesData[0],
                        name: "openness",
                        category: SubOpenness,
                        data: OpennessData,
                        color: "#FF9843",
                    };
                    // newOpennessData={y:res.data[0].openness,name:'openness',category:SubOpenness,data:[]}
                    Data.push(newOpennessData);
                }
                // console.log("--Subcloseness------------------------",newOpennessData);

                if (res.data[i].conscientiousness) {
                    let conscientiousness2 = res.data[i].conscientiousness;
                    setconscientiousness1(conscientiousness2);
                    for (let j = 0; j < SubConscientiousness.length; j++) {
                        // newConscientiousnessData[SubConscientiousness[j]]=res.data[0][SubConscientiousness[j]];
                        ConscientiousnessData.push(
                            Math.round(
                                res.data[0][SubConscientiousness[j]] * 100,
                            ),
                        );
                    }
                    console.log(
                        " ConscientiousnessData---------------------",
                        ConscientiousnessData,
                    );
                    newConscientiousnessOutputData = {
                        y: percentagesData[1],
                        name: "conscientiousness",
                        category: SubConscientiousness,
                        data: ConscientiousnessData,
                        color: "#D24545",
                    };
                    Data.push(newConscientiousnessOutputData);
                }
                // console.log("--SubclosenessConscientiousness------------------------",newConscientiousnessOutputData);

                if (res.data[i].extraversion) {
                    let extraversion2 = res.data[i].extraversion;
                    setextraversion1(extraversion2);
                    for (let j = 0; j < SubExtraversion.length; j++) {
                        // newExtraversionData[SubExtraversion[j]]=res.data[0][SubExtraversion[j]];
                        // ExtraversionData.push(res.data[0][SubExtraversion[j]]);
                        ExtraversionData.push(
                            Math.round(res.data[0][SubExtraversion[j]] * 100),
                        );
                    }
                    newExtraversionOutputData = {
                        y: percentagesData[2],
                        name: "extraversion",
                        category: SubExtraversion,
                        data: ExtraversionData,
                        color: "#86A7FC",
                    };
                    Data.push(newExtraversionOutputData);
                }
                console.log(
                    "--SubclosenessnewExtraversionOutputData------------------------",
                    newExtraversionOutputData,
                );

                if (res.data[i].agreeableness) {
                    let agreeableness1 = res.data[i].agreeableness;
                    setagreeableness(agreeableness1);
                    for (let j = 0; j < SubAgreeableness.length; j++) {
                        // newAgreeablenessData[SubAgreeableness[j]]=res.data[0][SubAgreeableness[j]];
                        AgreeablenessData.push(
                            Math.round(res.data[0][SubAgreeableness[j]] * 100),
                        );
                    }
                    newAgreeablenessOutputData = {
                        y: percentagesData[3],
                        name: "agreeableness",
                        category: SubAgreeableness,
                        data: AgreeablenessData,
                        color: "#597E52",
                    };
                    Data.push(newAgreeablenessOutputData);
                }
                console.log(
                    "--SubclosenessnewAgreeablenessOutputData------------------------",
                    newAgreeablenessOutputData,
                );

                if (res.data[i].neuroticism) {
                    let neuroticism1 = res.data[i].neuroticism;
                    setneuroticism(neuroticism1);
                    for (let j = 0; j < SubNeuroticism.length; j++) {
                        // newNeuroticismData[SubNeuroticism[j]]=res.data[0][SubNeuroticism[j]];
                        NeuroticismData.push(
                            Math.round(res.data[0][SubNeuroticism[j]] * 100),
                        );
                    }
                    // newNeuroticismOutputData["neuroticism"]={data:neuroticism1,subCategory:newNeuroticismData,color:'#99BC85'};
                    // Data.push(newNeuroticismOutputData);
                    newNeuroticismOutputData = {
                        y: percentagesData[4],
                        name: "neuroticism",
                        category: SubNeuroticism,
                        data: NeuroticismData,
                        color: "#FF8F8F",
                    };
                    Data.push(newNeuroticismOutputData);
                }
                console.log(
                    "--SubclosenessnewAgreeablenessOutputData------------------------",
                    newNeuroticismOutputData,
                );
                console.log("-----DATA-----", Data);

                setdatasets(Data);
                setButtonOpen(false);
                setConsolidate(false);
                setlinkedinClick(false);
                setopen(false);
            }
        } catch (error) {
            // console.log("error",error.response.data);
            setopen(false);
            setButtonOpen(false);
            setopen(false);
        }
    };

    const LinkedinData = async () => {
        console.log("-----linkedinData--------");
        setlinkedinClick(true);
        setopen(true);
        console.log("linkedinurl----", url);

        try {
            const res = await linkedinInstance({
                url: `person_deep`,
                method: "POST",
                data: {
                    link: url,
                },
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key":
                        "f98a7dcf75mshbec3fc4926c0197p1dad9cjsnbf95294b90fa",
                    "X-RapidAPI-Host": "linkedin-data-scraper.p.rapidapi.com",
                },
            });
            console.log("-----linkedindataEError-------");
            console.log("-----linkedindata-------", res.data.data.about);

            // const data = res.data;
            const updates = res.data.data.updates;
            const about = res.data.data?.about || "";
            if (!about) {
                console.log("----about not found----");
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sufficient data not available!",
                });
                setlinkedinClick(false);
                setopen(false);
            }
            const postData = [];
            if (updates.length > 0) {
                updates.map((item) => {
                    if (item.postText !== undefined) {
                        postData.push(item.postText);
                    } else {
                        postData.push(item.postLink);
                    }
                    // postData.push(item.postText);
                });
            }

            if (updates.length === 0 && about.length !== 0) {
                console.log("Updates not available----");
                postData.push(about);
            }
            // if(!about){
            //   console.log("----about and updates length---")
            //     setdatasets([]);

            //       Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: "Sufficient data not available!",
            //       });
            //       setlinkedinClick(false);
            //       setopen(false);
            // }

            // else if(updates.length===0 && about !=="undefined"){
            // console.log("----about and updates length---")
            // setdatasets([]);

            //   Swal.fire({
            //     icon: "error",
            //     title: "Oops...",
            //     text: "Sufficient data not available!",
            //   });
            //   setlinkedinClick(false);
            // setopen(false);

            // Swal.fire({
            //   icon: "error",
            //   title: "Oops...",
            //   text: "Sufficient data not available!"

            // });
            //  setlinkedinClick(false);
            //  seopen(false);
            else {
                // const Data=updates;
                if (updates[0].image === "undefinedundefined") {
                    // alert("Sufficient data not available");
                    // Swal.fire({
                    //   icon: "error",
                    //   title: "Oops...",
                    //   text: "Sufficient data not available!"

                    // });
                    // setlinkedinClick(false);
                    // setopen(false);
                    setdatasets([]);
                    setTimeout(() => {
                        // setlinkedinClick(false);
                        // setopen(false);
                        // Swal.fire({
                        //   icon: "error",
                        //   title: "Oops...",
                        //   text: "Sufficient data not available!"

                        // });
                        setlinkedinClick(false);
                        setopen(false);
                    }, 500);
                }
                //   updates.map((item)=>{

                //     if(item.postText!==undefined){
                //         postData.push(item.postText);
                //     }
                //     else{
                //       postData.push(item.postLink);
                //     }
                //     // postData.push(item.postText);
                //  });
            }

            //  Data.map((item)=>{

            //     if(item.postText!==undefined){
            //         postData.push(item.postText);
            //     }
            //     // postData.push(item.postText);
            //  });

            console.log("linkedin----PostDatadata----", postData);
            console.log("linkedin----PostDatadata----", typeof postData);
            let objVisual = [];

            setlinkData(postData);

            console.log("CAlled");

            setTimeout(() => {
                console.log("setlinkedinData---------------", linkData);
                GraphData(postData);
            }, 1000);
        } catch (error) {
            // alert("user not found");
            console.log("error-------", error);
            if (
                error.response.data.error ===
                "Error fetching person profile, please try again later"
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Not Found!",
                });
            } else {
                //   Swal.fire({
                //   icon: "error",
                //   title: "Oops...",
                //   text: "Sufficient data not Available!"

                // });
                setdatasets([]);
                setTimeout(() => {
                    // Swal.fire({
                    //   icon: "error",
                    //   title: "Oops...",
                    //   text: "Sufficient data not available!"
                    // });
                    // //  setlinkedinClick(false);
                    // //  setopen(false);
                }, 10000);
            }
            // Swal.fire({
            //   icon: "error",
            //   title: "Oops...",
            //   text: "User Not Found!"

            // });
            setlinkedinClick(false);
            setopen(false);
        }
        // console.log("setlinkedinData---------------",linkData)
        // setTimeout(()=>{
        //     GraphData();
        // },1000);
    };

    const ConsolidateData = () => {
        // setConsolidate(true);
        // setopen(true);

        const consolidateData = [];
        consolidateData.push(twitterdata);
        consolidateData.push(linkData);
        console.log("consolidateData----------", consolidateData);
        console.log("consolidateDatatype----------", typeof consolidateData);
        if (twitterdata.length === 0 || linkData.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter Twitter and Linkedin url!",
            });
        } else {
            setConsolidate(true);
            setopen(true);
            console.log("consolidateData", consolidateData);
            setTimeout(() => {
                GraphData(consolidateData);
            }, 500);
        }
    };

    const handleUrlInput = (value) => {
        console.log("value", value);
        const linkedinRegex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/;
        if (!linkedinRegex.test(value)) {
            setlinkedinError(true);
        } else {
            setlinkedinError(false);

            seturl(value);
        }
    };

    const LinkedinErrorData = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Linkedin Url!",
        });
    };
    const TwitterErrorData = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Twitter Url!",
        });
    };

    return (
        <>
            <div className="max-h-screen">
                <div className="flex justify-center">
                    <div className="flex-col ">
                        <div>
                            <img src={logo} alt="logo" className="w-[55%]" />
                        </div>
                        <div className="text-blue-400 text-xl font-bold ">
                            {" "}
                            Personality Traits Analysis
                            <div />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mx-[5%]  mt-[3%] ">
                    <div className="flex w-full">
                        <div className="flex justify-center  text-blue-400 font-bold text-md lg:text-xl w-[30%]">
                            Enter <span className="mx-2">Twitter </span>
                            <span className=""> Profile:</span>
                        </div>
                        <div className="w-full">
                            <TextField
                                variant="outlined"
                                aria-label="url"
                                size="small"
                                className="!w-full lg:!w-[100%]"
                                onChange={(e) => handleInput(e.target.value)}
                                error={twittererror}
                                helperText={
                                    twittererror
                                        ? "Please enter twitter url"
                                        : ""
                                }
                            />
                        </div>
                    </div>{" "}
                    <div className="mx-0 lg:mx-5 flex justify-center mt-[5%] lg:mt-0">
                        <Button
                            variant="contained"
                            className={`${
                                buttonOpen ? "!bg-yellow-400" : " !bg-blue-600"
                            } h-[2.5rem] w-[10rem]`}
                            onClick={
                                twittererror ? TwitterErrorData : twitterData
                            }
                        >
                            {buttonOpen ? "Analyzing..." : "Analyze"}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mx-[5%]  mt-[3%] ">
                    <div className="flex w-full">
                        <div className="flex justify-center  text-blue-400 font-bold text-md lg:text-xl  w-[30%] ">
                            Enter <span className="mx-2">Linkedin</span>{" "}
                            <span>Profile:</span>
                        </div>
                        <div className="w-full">
                            <TextField
                                variant="outlined"
                                aria-label="url"
                                size="small"
                                className="!w-full lg:!w-[100%]"
                                onChange={(e) => handleUrlInput(e.target.value)}
                                error={linkedinerror}
                                helperText={
                                    linkedinerror
                                        ? "Please enter linkedin url"
                                        : ""
                                }
                            />
                        </div>
                    </div>{" "}
                    <div className="mx-0 lg:mx-5 flex justify-center mt-[5%] lg:mt-0">
                        <Button
                            variant="contained"
                            className={`${
                                linkedinClick
                                    ? "!bg-yellow-400"
                                    : " !bg-blue-600"
                            } h-[2.5rem] w-[10rem]`}
                            onClick={
                                linkedinerror ? LinkedinErrorData : LinkedinData
                            }
                        >
                            {linkedinClick ? "Analyzing..." : "Analyse"}
                        </Button>
                    </div>
                </div>
                {/* <Button variant='contained' size="small" className=''>Consolidate Personality</Button> */}
                <div className="flex mx-[5%] mt-[2%]">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={ConsolidateData}
                        className={`${
                            consolidate ? "!bg-yellow-400" : " !bg-blue-600"
                        } h-[2.5rem] w-[15rem]`}
                        disabled={consolidate}
                    >
                        {consolidate
                            ? "Analyzing..."
                            : "Consolidate Personality"}
                    </Button>
                    <div className="">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocialVisualization;
