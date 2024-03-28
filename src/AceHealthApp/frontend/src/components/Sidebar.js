import {useLocation, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

import SidebarButton from "./SidebarButton";

export default function Sidebar({selectedPage, createPatientModal}){
    const location = useLocation();
    const { id } = useParams();
    
    const [patientName, setPatientName] = useState("...");
    const [patientImage, setPatientImage] = useState(null);

    useEffect(()=>{
        if(selectedPage!=="PATIENT") return;
        
        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/getPatient/${id}`,
            headers:{"Content-Type": "application/json"}
        })
        .then((res)=>{
            setPatientName(res.data.patient.name);
            setPatientImage(res.data.patient.picture);
        })
        .catch((reason)=>{ 
            setPatientName("Patient");
            setPatientImage(null);
        });
    },[]);

    return <>
        <div className="w-[400px] border-x-2 border-neutral-200 flex flex-col gap-3 p-5">
            <div>
                <SidebarButton selected={selectedPage==="DASHBOARD"} href={"../dashboard"} name={"Dashboard"} icon={"fa-solid fa-cube fa-lg"} />
            </div>
            <hr/>
            <div className="h-full">
                <SidebarButton selected={selectedPage==="PATIENTS"} href={"../patients"} name={"Patients"} icon={"fa-solid fa-face-smile-beam fa-lg"} draft={createPatientModal&&location.pathname!=="/patients"} />
                <SidebarButton selected={selectedPage==="DEVICES"} href={"../devices"} name={"Devices"} icon={"fa-solid fa-microchip fa-lg"} />
                {selectedPage==="PATIENT"?
                <>
                <hr className='w-full border border-blue-200 rounded-md my-2'/>
                <SidebarButton selected={selectedPage==="PATIENT"} href={`../patient/${id}`} name={patientName} icon={"fa-solid fa-user-astronaut fa-lg"} image={patientImage} />
                </>
                :null}
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
