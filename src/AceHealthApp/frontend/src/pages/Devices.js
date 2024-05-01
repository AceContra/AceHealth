import { useEffect, useState } from "react"
import axios from "axios";

import DeviceBar from "../components/DeviceBar";

export default function Devices(){
    const [devices, setDevices] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function loadDevice(){
        setLoading(true);
        setError(null);

        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/getDevices`,
            headers:{"Content-Type": "application/json" }
        })
        .then((res)=>{
            setTimeout(()=>{
                setLoading(false);
                setDevices(res.data.devices);
            },1000);
            setError(null);
        })
        .catch((reason)=>{ 
            setDevices(null);
            setError(reason);
            setLoading(false);
        });
    }

    useEffect(()=>{loadDevice();},[]);

    return (
        <div className='w-full bg-white'>
            <div className="h-0 overflow-hidden transition-all ">
            <div className="h-full flex items-center justify-center bg-neutral-300">
                <pre className="bg-neutral-400 p-2 px-4 rounded-md font-bold text-center text-red-700"><i className="fa-solid fa-clipboard-list"></i> @TODO: Add Live & Graph</pre>
            </div>
            </div>
            <hr/>
            <div className="h-1/2 flex flex-col gap-1 p-2">
                <div className="flex w-full gap-2">
                    <div className="w-1/6 flex items-center justify-center font-bold text-xl gap-2">
                        <i className="fa-regular fa-hard-drive"></i> Devices
                    </div>
                    <div className="w-4/6 flex gap-2 items-center border-2 p-2 rounded-md group hover:border-blue-500">
                        <i className="fa-solid fa-magnifying-glass fa-lg text-neutral-400 group-hover:text-blue-500"></i>
                        <input className="w-full p-2" placeholder="Search For Devices  ID | NAME | TYPE | PATIENT ID"/>
                    </div>
                    <div className="w-1/6 flex items-center gap-2">
                        <button className="border-2 p-3 px-8 border-black rounded-md hover:bg-black hover:text-white hover:font-bold hover:scale-110 transition-all">Search</button>
                        <button className="border-2 p-3 border-black rounded-md hover:bg-black disabled:border-neutral-500 disabled:bg-neutral-500 disabled:scale-90 hover:text-white hover:font-bold hover:scale-110 transition-all" onClick={()=>loadDevice()} disabled={loading}><i className={`fa-solid fa-arrows-rotate `+(loading?`fa-spin`:"")}></i></button>
                    </div>
                </div>
                <div className="h-full w-full flex flex-col gap-3 p-2 px-14">
                    
                    <div className={`flex gap-2 w-full items-center justify-center transition-all duration-500 `+(loading?`h-auto p-5 opacity-100`:`h-0 opacity-0 overflow-hidden`)}>
                        <i className="text-blue-600 fa-solid fa-arrows-rotate fa-spin fa-2xl"></i>
                        <p className="font-bold a">Fetching Devices</p>
                    </div>
    

                    <div className={`w-full flex items-center justify-center transition-all duration-500 `+(error?`h-auto opacity-100`:`h-0 overflow-hidden opacity-0`)}>
                        <img className="w-2/6" src="images/connectionError.png" alt="" />
                    </div>
                    <p className={`font-bold text-red-600 flex items-center justify-center w-full gap-2 transition-all duration-500 `+(error?`h-auto opacity-100`:`h-0 opacity-0`)}>
                        <i className="fa-regular fa-circle-xmark fa-xl"></i> Error Connecting To The Server <button className="underline text-red-400 font-bold" onClick={()=>loadDevice()}>Retry</button>
                    </p>


                    <div className={`flex flex-col gap-4 transition-all duration-500 `+(loading?`h-auto opacity-100 `:`h-0 opacity-0 overflow-hidden`)}>
                        <DeviceBar key={0} index={0} loading={true} />
                        <DeviceBar key={1} index={1} loading={true} />
                        <DeviceBar key={2} index={2} loading={true} />
                        <DeviceBar key={3} index={3} loading={true} />
                        <DeviceBar key={4} index={4} loading={true} />
                    </div>
                    <div className={`flex flex-col gap-4 transition-all duration-500 `+(loading?`h-0 opacity-0 overflow-hidden`:`h-auto opacity-100`)}>
                        {devices != null? devices.map((element,index) => { 
                            return <DeviceBar key={index} {...element} index={index} />
                        }):null}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}