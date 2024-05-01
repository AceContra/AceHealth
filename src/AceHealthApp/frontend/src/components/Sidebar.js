import {useLocation, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";

import SidebarButton from "./SidebarButton";

export default function Sidebar({selectedPage, createPatientModal}){
    const location = useLocation();
    const { id } = useParams();
    
    const [patientName, setPatientName] = useState("...");
    const [patientImage, setPatientImage] = useState(null);

    const [recents, setRecents] = useState(null);

    useEffect(()=>{
        
        if(selectedPage!=="PATIENT"){    
            const cookies = new Cookies();
            setRecents(cookies.get('recents'));
            // cookies.set('recents',[],{path:'/'});
            return;
        }

        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/getPatient/${id}`,
            headers:{"Content-Type": "application/json"}
        })
        .then((res)=>{
            setPatientName(res.data.patient.name);
            setPatientImage(res.data.patient.picture);

            let tmpRecents = null;
            const cookies = new Cookies();
            tmpRecents = cookies.get('recents');
            
            if(tmpRecents === undefined){
                cookies.set('recents',[],{ path: '/' });
                tmpRecents = [];
                // tmpRecents = [{
                //     id:res.data.patient._id,
                //     name:res.data.patient.name,
                //     picture:res.data.patient.picture,
                //     href:`../patient/${res.data.patient.id}`
                // }];
            }else{
                if(tmpRecents.length >= 4) tmpRecents.shift();

                let addRecent = true;
                tmpRecents.every(element => {
                    if(element.id === res.data.patient._id){
                        addRecent = false;
                        return false;
                    }
                    return true;
                });

                if(addRecent){
                    tmpRecents.push({
                        id:res.data.patient._id,
                        name:res.data.patient.name,
                        picture:res.data.patient.picture,
                        href:`../patient/${res.data.patient._id}`
                    });
                }
            }

            setRecents(tmpRecents);
            cookies.set('recents',tmpRecents,{path:'/'});
        })
        .catch((reason)=>{ 
            setPatientName("Patient");
            setPatientImage(null);
        });
    },[]);

    return <>
        <div className="w-[400px] border-x-2 border-neutral-200 flex flex-col gap-3 p-5">
            <div>
                <SidebarButton selected={selectedPage==="DASHBOARD"} href={"../dashboard"} name={"Dashboard"} icon={"fa-solid fa-cube fa-lg"} disabled={true} />
            </div>
            <hr/>
            <div className="h-full flex flex-col">
                <SidebarButton selected={selectedPage==="PATIENTS"} href={"../patients"} name={"Patients"} icon={"fa-solid fa-face-smile-beam fa-lg"} draft={createPatientModal&&location.pathname!=="/patients"} />
                <SidebarButton selected={selectedPage==="DEVICES"} href={"../devices"} name={"Devices"} icon={"fa-solid fa-microchip fa-lg"} />
                {selectedPage==="PATIENT"?
                <>
                <hr className='w-full border border-blue-200 rounded-md my-2'/>
                <SidebarButton selected={selectedPage==="PATIENT"} href={`../patient/${id}`} name={patientName} icon={"fa-solid fa-user-astronaut fa-lg"} image={patientImage} />
                </>
                :null}
                {recents&&recents.length > 0?<div className='flex flex-col items-center justify-end h-full'>
                <div className='w-full flex items-center gap-2'>
                    <p className='text-neutral-400'>Recent</p>
                    <hr className='w-full border border-neutral-400 border-dashed' />
                    <p onClick={()=>{
                        const cookies = new Cookies();
                        cookies.remove('recents',{path:'/'});
                        setRecents(null);
                    }} className='text-red-600 underline cursor-pointer hover:bg-red-600 hover:text-white hover:px-2 rounded-md transition-all'>clear</p>
                </div>
                {recents.map((element,index)=>{
                    return <SidebarButton key={index} selected={false} href={element.href} name={element.name} icon={"fa-solid fa-user-astronaut fa-lg"} image={element.picture} className={`opacity-70 hover:opacity-100`}/>
                })}
                </div>:null}
                {/* <SidebarButton selected={selectedPage==="DOCTORS"} href={"../doctors"} name={"Doctors"} icon={"fa-solid fa-user-doctor fa-lg"} /> */}
            </div>
            <hr/>
            <div>
                <SidebarButton selected={selectedPage==="SETTINGS"} href={"../settings"} name={"Settings"} icon={"fa-solid fa-gear fa-lg"} />
                <SidebarButton selected={selectedPage==="EXIT"} href={"../exit"} name={"Exit"} icon={"fa-solid fa-xmark fa-lg"} />            
            </div>
        </div>
    </>
}
