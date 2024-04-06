import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import { Chart } from 'react-charts';
import axios from "axios";

import useDemoConfig from "../components/useDemoConfig";

export default function Patient(){
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState("VISIT_HISTORY");

    const { data, randomizeData } = useDemoConfig({
        series: 10,
        dataType: "time",
    });

    const primaryAxis = React.useMemo(
        () => ({
          getValue: datum => datum.primary
        }),
        []
    );
    
    const secondaryAxes = React.useMemo(
        () => [{
            getValue: datum => datum.secondary,
            stacked: true
          }],
        []
    );

    useEffect(()=>{
        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/getPatient/${id}`,
            headers:{"Content-Type": "application/json"}
        })
        .then((res)=>{
            let result = res.data.patient;
        
            if(result.picture.startsWith("images/guest")){
                result.picture = "../"+result.picture;
            }

            if(result.device){
            
            }

            setTimeout(()=>setPatient(result),1000);
        })
        .catch((reason)=>{ 
            console.log(reason);
            setPatient(null);
        });
    },[]);
    return (
        <div className='w-full'>    
            <div className={`w-full bg-blue-50 flex items-center justify-center transition-all duration-500 `+(patient?`h-0 opacity-0`:`h-screen opacity-100`)}>
                <i className="fa-solid fa-circle-notch fa-spin fa-2xl text-7xl text-blue-500"></i>
            </div>
            <div className={`flex flex-col w-full bg-blue-50 transition-all duration-500 gap-2 p-2 `+(patient?`h-screen opacity-100`:`h-full opacity-0`)}>
                <div className='flex gap-2 w-full'>
                    <div className='w-2/6 bg-white border-2 border-neutral-200 rounded-md p-6 flex flex-col gap-3 items-center justify-center'>
                        <img className='w-2/6 rounded-full outline-4 outline-blue-500 outline-offset-8 outline-none' src={patient?patient.picture:""} alt={""} draggable={false}/>
                        <h1 className='font-bold text-2xl text-blue-500'><i className="fa-solid fa-user fa-sm"></i> {patient?patient.name:""}</h1>
                        <p className='font-bold text-blue-400'><i className="fa-solid fa-droplet text-neutral-400"></i> {patient?patient.bloodgroup:""} • <i className="fa-solid fa-candy-cane text-neutral-400"></i> {patient?patient.age:""} Yrs</p>
                        <hr className='border border-blue-500 w-full rounded-md'/>
                        <div className='flex flex-col gap-2'>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-arrows-up-to-line"></i> Height</p>
                                <p className='w-full font-bold'>{patient?"todo":""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-weight-scale"></i> Weight</p>
                                <p className='w-full font-bold'>{patient?"todo":""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-house"></i> Address</p>
                                <p className='w-3/4 truncate font-bold'>{patient?patient.address:""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-phone"></i> Phone</p>
                                <p className='w-full font-bold'>{patient?patient.phone:""}</p>
                            </div>
                        </div>
                    </div>
                
                    <div className='w-4/6 bg-white border-2 border-neutral-200 rounded-md p-3 flex gap-2'>
                        <div className='w-full h-full rounded-md'>
                        <Chart
                            options={{
                                data,
                                primaryAxis,
                                secondaryAxes,
                            }}
                        />
                        </div>
                        <div className='w-1/6 h-full opacity-0 overflow-hidden transition-all '>
                            HelloWorld
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-white border-2 border-neutral-200 rounded-md p-3 flex gap-2'>
                    {/* <button className='p-2 bg-neutral-300 rounded-md font-bold border-2 border-black' onClick={randomizeData}> <i className="fa-solid fa-dice-five"></i> Randomize </button> */}
                    <div className='w-1/2 h-full p-2 border-neutral-100 border-2 rounded-md flex flex-col gap-1 overflow-hidden '>
                        <div className='w-full flex gap-5 border-b-2 '>
                            <div onClick={()=>setSelectedMenu("VISIT_HISTORY")} className={`font-bold p-2 rounded-sm border-blue-600 cursor-pointer transition-all `+(selectedMenu==="VISIT_HISTORY"?`border-b-4 text-blue-600`:`border-0 text-neutral-400`)}>
                                Visit History
                            </div>
                            <div onClick={()=>setSelectedMenu("LAB_RESULT")} className={`font-bold p-2 rounded-sm border-blue-600 cursor-pointer transition-all `+(selectedMenu==="LAB_RESULT"?`border-b-4 text-blue-600`:`border-0 text-neutral-400`)}>
                                Lab Result
                            </div>
                            <div onClick={()=>setSelectedMenu("FAMILY_HISTORY")} className={`font-bold p-2 rounded-sm border-blue-600 cursor-pointer transition-all `+(selectedMenu==="FAMILY_HISTORY"?`border-b-4 text-blue-600`:`border-0 text-neutral-400`)}>
                                Family History
                            </div>
                        </div>
                        <div className={`w-[300%] h-full px-2 flex overflow-hidden transition-all gap-2`}>
                            <div className={`h-full transition-all overflow-hidden text-red-600 font-bold flex items-center gap-5 `+(selectedMenu==="VISIT_HISTORY"?`w-full`:`w-0 opacity-0`)}>
                                <p className='mx-56'><i className="fa-regular fa-circle-xmark fa-lg "></i>  Visit History Not Found</p>
                            </div>
                            <div className={`h-full transition-all overflow-hidden text-red-600 font-bold flex items-center gap-5 `+(selectedMenu==="LAB_RESULT"?`w-full`:`w-0 opacity-0`)}>
                                <p className='mx-56'><i className="fa-regular fa-circle-xmark fa-lg "></i>  Lab Result Not Found</p>
                            </div>
                            <div className={`h-full transition-all overflow-hidden text-red-600 font-bold flex items-center gap-5 `+(selectedMenu==="FAMILY_HISTORY"?`w-full`:`w-0 opacity-0`)}>
                            <p className='mx-56'><i className="fa-regular fa-circle-xmark fa-lg "></i>  Family History Not Found</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 h-full rounded flex flex-col gap-1'>
                        <div className='h-full border-neutral-100 rounded border-2 flex gap-2'>
                            <div className='w-full bg-red-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i class="p-2 py-4 bg-white rounded fa-solid fa-droplet fa-lg text-red-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Blood Pressure</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>100 mg/ld</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-down"></i> Higher than Avg</p>
                            </div>
                            <div className='w-full bg-green-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i class="p-2 py-4 bg-white rounded fa-solid fa-heart-pulse fa-lg text-green-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Heart Rate</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>78 bmp</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-down"></i> Lower than Avg</p>
                            </div>
                            <div className='w-full bg-blue-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i class="p-2 py-4 bg-white rounded fa-solid fa-briefcase-medical fa-lg text-blue-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Glucose Level</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>78-92</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-up"></i> Higher than Avg</p>
                            </div>
                            <div className='w-full bg-yellow-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i class="p-2 py-4 bg-white rounded fa-solid fa-weight-hanging fa-lg text-yellow-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>BMP Result</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>27.7kg/m2</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-up"></i> Overweight</p>
                            </div>
                        </div>
                        <div className='h-full rounded border-neutral-300 border-2 p-2'>
                            <p className='font-bold text-xl'>Patient Status</p>
                            <div className='flex items-center gap-5'>
                                <p className='text-neutral-500 font-bold my-4 px-2'>Last Check</p>
                                <p className='font-bold text-black'>Dr Mohana Priya on 6th March</p>
                            </div>
                            <p className='text-neutral-500 font-bold my-4 px-2'>Report</p>
                            <div className='p-5 bg-blue-100 rounded-md font-bold'>
                                Patient admitted with symptoms of severe dehydration and electrolyte imbalance. Initial tests indicate low potassium levels and elevated creatinine. Treatment plan initiated with IV fluids and electrolyte replacement therapy
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}