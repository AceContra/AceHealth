import ConfettiExplosion from 'react-confetti-explosion';
import { useEffect, useState } from "react";
import axios from 'axios';

import InfoCard from "../components/InfoCard";
import InputBox from "../components/InputBox";
import PatientBar from "../components/PatientBar";

export default function Patients({createPatientModal, setCreatePatientModal}){

    const[patients,setPatients] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const[search,setSearch] = useState("");
    const[searchResult, setSearchResult] = useState(0);

    const [patientCreation, setPatientCreation] = useState(false);
    const [patientImageName, setPatientImageName] = useState("custom");
    const [patientName, setPatientName] = useState("");
    const [patientAvatar, setPatientAvatar] = useState(null);
    const [patientAge, setPatientAge] = useState(null);
    const [patientBldGrp, setPatientBldGrp] = useState("");
    const [patientDeviceID, setPatientDeviceID] = useState("");
    const [patientCategory, setPatientCategory] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientPhoneNumber, setPatientPhoneNumber] = useState("");

    const [selectedPage,setSelectedPage] = useState(1);

    function loadPatients(){
        setPatients(null);
        setLoading(true);
        setError(null);

        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/getPatients`,
            headers:{"Content-Type": "application/json" }
        })
        .then((res)=>{
            setTimeout(()=>{
                setLoading(false);
                setPatients(res.data.patients);
            },1000);
            setError(null);
        })
        .catch((reason)=>{ 
            setLoading(false);
            setError(reason);
        });
    }

    useEffect(()=>{ loadPatients() },[patientCreation,selectedPage]);

    let createModal = <div className={"w-[calc(100%-400px+70px)] absolute top-0 left-[400px] -translate-x-[70px] transition-all flex items-center justify-center overflow-hidden "+(createPatientModal?"h-full z-10":"h-0")}>
        <div className='bg-black/30 w-full h-full absolute top-0 left-0 z-10 peer'></div>
        <form className="w-5/6 h-5/6 z-20 peer-active:scale-105 transition-all" action={`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/`} method="POST">
        <div className='w-full h-full bg-neutral-50 rounded-md z-20 flex flex-col overflow-y-scroll'>
            <div className='flex w-full p-5'>
                <h1 className='w-1/2 text-3xl font-bold text-blue-600'>Create New Patient</h1>
                <span className='w-full'></span>
                <button onClick={()=>{setCreatePatientModal(false);}}><i className="fa-regular fa-circle-xmark fa-2xl text-red-500 hover:scale-105 transition-all"></i></button>
            </div>
            <hr className='border-1 border-blue-500'/>
            <br/>

            <p className="text-2xl px-3 py-4 font-bold text-blue-700"><i className="fa-solid fa-passport"></i> Personal Details</p>

            <div className="grid grid-rows-4 grid-cols-3 gap-2 w-full h-auto p-5">
                <InputBox name={"name"} className={"col-span-2"} value={patientName} setValue={setPatientName} placeholder={"Name"} type={"text"} icon={"fa-solid fa-user-large"} pattern={"[a-zA-Z][a-zA-Z ]{3,15}"} minLength={3} maxLength={15} required={true} />
                <InputBox name={"picture"} className={"col-span-1 row-span-3"} value={patientAvatar} setValue={setPatientAvatar} accept={"image/*"} placeholder={"Avatar"} type={"file"} icon={"fa-regular fa-image"} imageName={patientImageName} setImageName={setPatientImageName} required={false} />
                <InputBox name={"age"} value={patientAge} setValue={setPatientAge} placeholder={"Age"} type={"number"} icon={"fa-solid fa-pager"} min={1} max={200} minLength={1} maxLength={3} required={true} />
                <InputBox name={"bloodgroup"} value={patientBldGrp} setValue={setPatientBldGrp} placeholder={"Blood Group"} type={"text"} icon={"fa-solid fa-droplet"} pattern={"/(a|b|o|ab|ab) ?[-+] ?(ve)?/gi"} minLength={2} maxLength={7} required={true} />
                <InputBox name={"deviceid"} value={patientDeviceID} setValue={setPatientDeviceID} placeholder={"Device ID"} type={"text"} icon={"fa-solid fa-microchip"} minLength={2} maxLength={7} required={true} />
                <InputBox name={"category"} value={patientCategory} setValue={setPatientCategory} placeholder={"Category"} type={"text"} icon={"fa-solid fa-stethoscope"} required={true} />
                <InputBox name={"address"} className={"col-span-2 row-span-4"} value={patientAddress} setValue={setPatientAddress} placeholder={"Address"} type={"text"} icon={"fa-solid fa-user-large"} required={true} />
                <InputBox name={"phone"} value={patientPhoneNumber} setValue={setPatientPhoneNumber} placeholder={"Phone Number"} type={"number"} minLength={10} maxLength={15} icon={"fa-solid fa-phone"} required={true} />
            </div>
            <hr className="border-1 border-blue-600 rounded-2 mx-2"/>

            <p className="text-2xl px-3 py-4 font-bold text-blue-700"><i className="fa-solid fa-file-waveform"></i> Scan & Other Reports</p>
            <div className="h-full flex items-center justify-center">
                <pre className="bg-neutral-300 p-2 px-4 rounded-md font-bold text-center text-red-700"><i className="fa-solid fa-clipboard-list"></i> @TODO: Add File Upload</pre>
            </div>
            <hr className="border-1 border-blue-600 rounded-2 mx-2"/>
            <div className="w-full flex items-center justify-end gap-4 p-5">
                <form>
                <div className="bg-emerald-200  border-2 rounded-lg p-2">
                    <i className="fa-solid fa-user-large"></i>
                    <input className="px-2 w-[160px] h-[40px] rounded-l-md bg-emerald-200 placeholder:text-black" placeholder="Patient ID" required/>
                    <button className="border-2 border-emerald-700 w-[160px] p-1 rounded-md bg-emerald-600 text-white font-bold hover:scale-105">Import Patient</button>
                </div>
                </form>
                <button name="createPatient" className="border-2 border-blue-700 w-1/6 p-3 rounded-xl bg-blue-600 text-white font-bold hover:scale-105" onClick={(event)=>{
                    event.preventDefault();

                    axios({
                        method: 'POST',
                        url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/`,
                        headers:{"Content-Type": "application/json" },
                        data:{
                            name:patientName,
                            picture:patientAvatar,
                            age:patientAge,
                            bloodgroup:patientBldGrp,
                            deviceid:patientDeviceID,
                            category:patientCategory,
                            address:patientAddress,
                            phone:patientPhoneNumber,
                            createPatient:true
                        },
                    }).then((res)=>{
                        setCreatePatientModal(false);
                        setPatientCreation(true);
                    }).catch((reason)=>{
                        console.log(reason);
                    });
                }}>Create Patient</button>
            </div>
        </div>
        </form>
    </div>;
    
    return (
        <>
        {createModal}
        <div className='w-full h-full bg-white flex flex-col gap-2 p-5'>
            {patientCreation?
            <>
            <div className="absolute flex items-center mx-[500px] justify-start">
                <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600} />
            </div>
            <div className="absolute p-2 flex flex-col gap-2 h-3/6 w-2/6 mx-[400px] my-[200px] items-center justify-center bg-white border-4 border-emerald-500 rounded-md z-10 shadow-md">
                <div className="h-full flex items-center justify-center text-7xl">
                <i className="fa-solid fa-circle-check text-emerald-600 fa-beat fa-2xl"></i>
                </div>
                <h1 className="text-3xl font-bold text-emerald-700 p-2">Patient Creation Successfull</h1>
                <button className="w-1/2 bg-emerald-500 p-2 rounded-md text-white font-bold text-xl" onClick={()=>setPatientCreation(false)}>Ok</button>
            </div>
            </>:null}
            <div className="h-2/6 flex gap-5">
                <div className="w-3/6 h-full rounded-lg bg-emerald-50 flex flex-col gap-3 p-5">
                    <h1 className="text-3xl font-bold text-emerald-500">
                        <span className="h-[200px] w-[200px] bg-white rounded-lg px-3">
                        <i className="fa-solid fa-hospital-user"></i>
                        </span> Create New Patient
                    </h1>
                    <hr/>
                    <p className="h-full indent-9 p-3 font-bold text-sm text-emerald-900">
                        Add New Patient To The <span className="font-mono bg-emerald-200 p-1 rounded font-bold hover:cursor-cell hover:bg-emerald-700 hover:text-white transition-all">AceHealth</span>. Adding New Patient Will Help Us Grow Our Network Better Which In Turn  Helps Other.
                    </p>
                    <div className="flex w-full items-center gap-2">
                        <button className="w-2/6 bg-emerald-700 rounded-md py-4 text-white text-sm font-bold hover:scale-105 transition-all text-start px-5 overflow-hidden flex gap-2 items-center" onClick={()=>{setCreatePatientModal(true);setPatientCreation(false);}}>
                            <i className="fa-solid fa-star-of-life"></i> Create 
                        </button>
                        <hr className="w-3/6 border-black"/>
                        <hr className="w-1/6 border-2 border-black"/>
                    </div>
                </div>
                <div className="w-full grid grid-rows-2 grid-flow-col gap-5">   
                    <InfoCard name={"Patients"} count={"235"} icon={"fa-solid fa-user-group"} bgcolor={"bg-violet-200"} textColor={"text-violet-500"} imgTransform={"rotate-[240deg]"}/>
                    <InfoCard name={"Operations"} count={"43"} icon={"fa-solid fa-scissors"} bgcolor={"bg-orange-200"} textColor={"text-orange-500"}/>
                    <InfoCard name={"Tracking"} count={"342"} icon={"fa-solid fa-arrow-trend-up"} bgcolor={"bg-emerald-200"} textColor={"text-emerald-500"} imgTransform={"rotate-[120deg]"}/>
                    <InfoCard name={"Appointments"} count={"156"} icon={"fa-solid fa-calendar"} bgcolor={"bg-pink-200"} textColor={"text-pink-500"} imgTransform={"rotate-[200deg]"}/>
                </div>
            </div>
            <hr/>
            <div className="flex w-full gap-2">
                    <div className="w-1/6 flex items-center justify-center font-bold text-xl gap-2">
                        <i className="fa-solid fa-users"></i> Patients
                    </div>
                    <div className="w-4/6 flex gap-2 items-center border-2 p-2 rounded-md group hover:border-blue-500">
                        <i className="fa-solid fa-magnifying-glass fa-lg text-neutral-400 group-hover:text-blue-500"></i>
                        <input value={search} onChange={(event)=>{setSearch(event.target.value);setSearchResult(0);}} className="w-full p-2 disabled:bg-neutral-200 rounded-md " placeholder="Search For Patients   NAME | CATEGORY | PATIENT ID" disabled={!patients}/>
                    </div>
                    <div className="w-1/6 flex items-center gap-2">
                        <button className="border-2 p-3 px-8 border-black rounded-md hover:bg-black hover:text-white hover:font-bold hover:scale-110 transition-all">Search</button>
                        <button className="border-2 p-3 border-black rounded-md hover:bg-black disabled:border-neutral-500 disabled:bg-neutral-500 disabled:scale-90 hover:text-white hover:font-bold hover:scale-110 transition-all" onClick={()=>loadPatients()} disabled={loading}><i className={`fa-solid fa-arrows-rotate `+(loading?`fa-spin`:"")}></i></button>
                    </div>
            </div>
            <div className="h-1/2 w-full flex flex-col items-start gap-3 px-12 py-3">
                <div className={`flex gap-2 w-full items-center justify-center transition-all duration-500 `+(loading?`h-auto p-5 opacity-100`:`h-0 opacity-0 overflow-hidden`)}>
                    <i className="text-blue-600 fa-solid fa-arrows-rotate fa-spin fa-2xl"></i>
                    <p className="font-bold a">Fetching Patients</p>
                </div>


                <div className={`w-full flex items-center justify-center transition-all duration-500 `+(error?`h-auto opacity-100`:`h-0 overflow-hidden opacity-0`)}>
                    <img className="w-2/6" src="images/connectionError.png" alt="" />
                </div>
                <p className={`font-bold text-red-600 flex items-center justify-center w-full gap-2 transition-all duration-500 `+(error?`h-auto opacity-100`:`h-0 opacity-0`)}>
                    <i className="fa-regular fa-circle-xmark fa-xl"></i> Error Connecting To The Server <button className="underline text-red-400 font-bold" onClick={()=>loadPatients()}>Retry</button>
                </p>
                
                <div className={`w-full flex flex-col gap-4 transition-all duration-500 `+(loading?`h-auto opacity-100 `:`h-0 opacity-0 overflow-hidden`)}>
                        <PatientBar key={0} index={0} loading={true} />
                        <PatientBar key={1} index={1} loading={true} />
                        <PatientBar key={2} index={2} loading={true} />
                        <PatientBar key={3} index={3} loading={true} />
                        <PatientBar key={4} index={4} loading={true} />
                </div>

                <div className={`w-full flex flex-col gap-4 transition-all duration-500 `+(loading?`h-0 opacity-0 overflow-hidden`:`h-full opacity-100 overflow-y-auto`)}>
                {patients?
                patients.map((element,index)=>{
                    if(
                        search.trim() === "" ||
                        (element.name.toLowerCase().includes(search.toLowerCase()) ||
                        element.bloodgroup.toLowerCase().includes(search.toLowerCase()) || 
                        element.category.toLowerCase().includes(search.toLowerCase()) ||
                        element.deviceid.toLowerCase().includes(search.toLowerCase()) ||
                        element.id.includes(search.toLowerCase()))
                    ){
                        // setSearchResult((prevSearchResult)=>prevSearchResult+1);
                        return <PatientBar key={index} {...element} index={index} search={search.toLowerCase()} />
                    }
                    return null;
                })
                :null}
                </div>
                <div className={`flex gap-1 transition-all duration-700 `+(loading||search?`opacity-0`:`opacity-1`)}>
                    <p onClick={()=>setSelectedPage(1)} className={`px-3 p-1 rounded `+(selectedPage===1?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>1</p>
                    <p onClick={()=>setSelectedPage(2)} className={`px-3 p-1 rounded `+(selectedPage===2?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>2</p>
                    <p onClick={()=>setSelectedPage(3)} className={`px-3 p-1 rounded `+(selectedPage===3?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>3</p>
                    <p onClick={()=>setSelectedPage(4)} className={`px-3 p-1 rounded `+(selectedPage===4?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>4</p>
                    <p className={`font-bold`}> ... </p>
                    <p onClick={()=>setSelectedPage(25)} className={`px-3 p-1 rounded `+(selectedPage===25?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>25</p>
                    <p onClick={()=>setSelectedPage(26)} className={`px-3 p-1 rounded `+(selectedPage===26?`bg-blue-600 text-white`:`text-blue-600 underline cursor-pointer`)}>26</p>
                </div>
                {/* {search.trim() !== ""?<p className="w-full font-bold text-center py-12">{searchResult} Result For Your Search</p>:null} */}
            </div>
        </div>
        </>
    );
}