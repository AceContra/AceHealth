import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import { Chart } from 'react-charts';
import axios from "axios";

import useDemoConfig from "../components/useDemoConfig";

export default function Patient(){
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState("VISIT_HISTORY");

    const _data = useDemoConfig({
        series: 4,
        dataType: "time",
    })['data'];

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

    const [data, setData] = useState(
        // useDemoConfig({
        //     series: 10,
        //     dataType: "time",
        // })['data']
        [
            {
                data:[
                    {
                        primary:new Date(),
                        secondary:80,
                        radius:undefined,
                    }
                ],
                label:'Series 1',
            },
            {
                data:[
                    {
                        primary:new Date(),
                        secondary:90,
                        radius:undefined,
                    }
                ],
                label:'Series 2',
            }
        ]
    );

    const [rerender, setRerender] = useState( data[0].data.length%2 === 0 );
    
    useEffect(()=>{
        if(rerender) return;
        setRerender(true);
    },[rerender])

    useEffect(()=>{
        const interval = setInterval(() => {
            setData(
                (prevData) => {
                    prevData[0].data.push(
                        {
                            primary:new Date(),
                            secondary:Math.floor(Math.random() * 90) + 140,
                            radius:undefined
                        }
                    )
                    prevData[1].data.push(
                        {
                            primary:new Date(),
                            secondary:Math.floor(Math.random() * 100) + 60,
                            radius:undefined
                        }
                    )
                    return prevData;
                }
            );
            setRerender(false);
            // setRerender(true);
        }, 1000);

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

            console.log(result);
            setTimeout(()=>setPatient(result),500);
        })
        .catch((reason)=>{ 
            console.log(reason);
            setPatient(null);
        });

        return () =>{
            clearInterval(interval);
        };
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
                                <p className='w-full font-bold'>{patient?patient.height:""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-weight-scale"></i> Weight</p>
                                <p className='w-full font-bold'>{patient?patient.bmpResult:""}</p>
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
                        {patient?patient.device.isActive?
                            rerender?
                            <Chart
                                options={{
                                    data,
                                    primaryAxis,
                                    secondaryAxes,
                                }}
                            />
                            :null
                        :<Chart
                            options={{
                                data:_data,
                                primaryAxis,
                                secondaryAxes,
                            }}
                        />
                        :null}
                        </div>
                        <div className='w-1/6 h-full transition-all '>
                            {patient?patient.device.isActive?<>
                            <div className='p-2 px-5 bg-red-200 rounded-md font-bold text-red-950'>
                                <i className="fa-solid fa-heart-pulse fa-beat"></i> Live
                            </div>
                            <hr className='border border-dashed border-red-500 my-2'/>
                            <div className='flex flex-col gap-2 my-3'>
                                <div className='flex gap-2 items-center p-2 bg-red-100 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#fcd19c] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Heart Rate</p>
                                </div>
                                <div className='flex gap-2 items-center p-2 bg-red-100 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#87c1d5] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Glucose Rate</p>
                                </div>
                            </div>
                            </>
                            :
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 items-center p-2 bg-neutral-200 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#a9e7e4] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Blood Pressure</p>
                                </div>
                                <div className='flex gap-2 items-center p-2 bg-neutral-200 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#feb3b3] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Heart Rate</p>
                                </div>
                                <div className='flex gap-2 items-center p-2 bg-neutral-200 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#fcd19c] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Glucose Rate</p>
                                </div>
                                <div className='flex gap-2 items-center p-2 bg-neutral-200 rounded-md hover:cursor-pointer'>
                                    <div className='bg-[#87c1d5] w-5 h-5 rounded'></div>
                                    <p className='text-sm'>Pulse Rate(MP)</p>
                                </div>
                            </div>
                            :null}
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
                                    <i className="p-2 py-4 bg-white rounded fa-solid fa-droplet fa-lg text-red-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Blood Pressure</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>{patient ? patient.bloodPressure:null} mg/ld</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-down"></i> Higher than Avg</p>
                            </div>
                            <div className='w-full bg-green-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i className="p-2 py-4 bg-white rounded fa-solid fa-heart-pulse fa-lg text-green-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Heart Rate</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>{patient ? patient.heartRate:null} bmp</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-down"></i> Lower than Avg</p>
                            </div>
                            <div className='w-full bg-blue-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i className="p-2 py-4 bg-white rounded fa-solid fa-briefcase-medical fa-lg text-blue-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>Glucose Level</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>{patient ? patient.glucoseRate[0]:null}-{patient ? patient.glucoseRate[1]:null}</p>
                                <p className='font-bold text-sm text-red-500'><i className="fa-solid fa-caret-up"></i> Higher than Avg</p>
                            </div>
                            <div className='w-full bg-yellow-200 rounded-md p-3 flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <i className="p-2 py-4 bg-white rounded fa-solid fa-weight-hanging fa-lg text-yellow-600"></i>
                                    <p className='font-bold text-sm text-neutral-600'>BMP Result</p>
                                </div>
                                <p className='font-bold text-3xl h-full flex items-center'>{patient ? patient.bmpResult:null}kg/m2</p>
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