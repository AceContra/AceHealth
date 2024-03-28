import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Patient(){
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

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
            <div className={`flex flex-col w-full bg-blue-50 transition-all duration-500 p-2 `+(patient?`h-screen opacity-100`:`h-full opacity-0`)}>
                <div className='flex gap-2 w-full'>
                    <div className='w-2/6 bg-white border-2 border-neutral-200 rounded-md p-6 flex flex-col gap-3 items-center justify-center'>
                        <img className='w-1/2 rounded-full outline-4 outline-blue-500 outline-offset-8 outline-none' src={patient?patient.picture:""} alt={""} draggable={false}/>
                        <h1 className='font-bold text-2xl text-blue-500'><i className="fa-solid fa-user fa-sm"></i> {patient?patient.name:""}</h1>
                        <p className='font-bold text-blue-400'><i class="fa-solid fa-droplet text-neutral-400"></i> {patient?patient.bloodgroup:""} • <i class="fa-solid fa-candy-cane text-neutral-400"></i> {patient?patient.age:""} Yrs</p>
                        <hr className='border border-blue-500 w-full rounded-md'/>
                        <div className='flex flex-col gap-2'>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-arrows-up-to-line"></i> Height</p>
                                <p className='w-full'>{patient?"todo":""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-weight-scale"></i> Weight</p>
                                <p className='w-full'>{patient?"todo":""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-house"></i> Address</p>
                                <p className='w-3/4 truncate'>{patient?patient.address:""}</p>
                            </div>
                            <div className='flex w-full gap-2'>
                                <p className='w-full text-neutral-500 font-bold'><i className="fa-solid fa-phone"></i> Phone</p>
                                <p className='w-full'>{patient?patient.phone:""}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/6 bg-white border-2 border-neutral-200 rounded-md p-3'></div>
                </div>
                <div className='w-full h-full bg-white border-2 border-neutral-200 rounded-md p-3'></div>
            </div>
        </div>
    )
}