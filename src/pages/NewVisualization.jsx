import React from 'react';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import logo from "../assets/smartifai.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Newgraph1 from '../component/newVisual';
import NewGraph3 from '../component/newPractice';

const NewVisualization = () => {
    // const classes = useStyles();
// const DataAnalysis=async()=>{

// }
  return (
    <div className='relative'>
    <div>
        <div className='flex justify-center'><h1 className='text-2xl font-bold mt-[5%]'>Personality Traits Analysis</h1></div>
        <div className='flex justify-center mt-[2%]'> 
        <div className='flex-col'>
           <div className='w-[35rem]'> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<div>
            </div><div className='mx-5'> Lorem Ipsum has been the industry's standard dummy text ever </div></div>
        </div>
        </div>
        <div className="flex justify-center mt-[2%]">
                            <TextField
                                variant="outlined"
                                aria-label="url"
                                size="small"
                                className="!w-full lg:!w-[35%]"
                                // className={classes.roundedInput}
                                onChange={(e) => console.log(e.target.value)}
                                placeholder='Paste Profile Url'
                                InputProps={{
                                    style: {
                                      borderRadius: "20px",
                                    }
                                  }}
                            />
                            <div className='ml-[2%]'>  <Button variant="contained" sx={ { borderRadius: 28 ,width:'120px'} }>Analyze</Button></div>
                          
            </div>
                        </div>
                        <div className='absolute top-[4rem] left-[4rem]'>
                           <img src={logo} className='w-[60%]'/>
                        </div>
                        <div className='flex gap-[2%]  mt-[4%] max-w-full max-h-full '>
                        
                            <div className='p-[4%] w-[25rem] h-[25rem] rounded-lg bg-[#E0F4FF] flex justify-center ml-[4rem]'>
                               <div className='flex-col'>
                                <div><AccountCircleIcon sx={{fontSize:'130px'}}/></div>
                                <div><h1 className='font-bold'>Mahima Chaudhary</h1></div><div className='text-sm'>Building Smartifai | APM</div></div></div>
                                <div className='w-[32rem] h-[25rem] rounded-lg bg-[#E0F4FF]'>
                                 <NewGraph3/>
                                            </div>
                               
                        
                        </div>
</div>
  )
}

export default NewVisualization