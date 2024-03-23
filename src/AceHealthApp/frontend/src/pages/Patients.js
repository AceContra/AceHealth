import InfoCard from "../components/InfoCard";

export default function Patients(){
    return (
        <div className='w-full h-full bg-white flex flex-col gap-2 p-5'>
            <div className="h-2/6 flex gap-5">
                <div className="w-full h-full rounded-lg bg-emerald-50 flex flex-col gap-3 p-5">
                    <h1 className="text-5xl font-bold text-emerald-500">
                        <span className="h-[200px] w-[200px] bg-white rounded-lg px-3">
                        <i className="fa-solid fa-hospital-user"></i>
                        </span> Create New Patient
                    </h1>
                    <hr/>
                    <p className="indent-9 p-3 font-bold text-emerald-900">
                        Add New Patient To The <span className="font-mono bg-emerald-200 p-1 rounded font-bold hover:cursor-cell hover:bg-emerald-700 hover:text-white transition-all">AceHealth</span>. Adding New Patient
                        Will Help Us Grow Our Network Better Which In Turn 
                        Helps You By Other Patients Data Vice Versa.
                    </p>
                    <div className="flex w-full items-center gap-2">
                        <button className="w-2/6 bg-emerald-700 rounded-md py-4 text-white text-sm font-bold hover:scale-105 transition-all text-start px-5"><i className="fa-solid fa-star-of-life"></i> Create </button>
                        <hr className="w-3/6 border-black"/>
                        <hr className="w-1/6 border-2 border-black"/>
                    </div>
                </div>
                <div className="w-full grid grid-rows-2 grid-flow-col gap-5">   
                    <InfoCard name={"Patients"} count={"928"} icon={"fa-solid fa-user-group"} bgcolor={"bg-violet-200"} textColor={"text-violet-500"} imgTransform={"rotate-[240deg]"}/>
                    <InfoCard name={"Operations"} count={"287"} icon={"fa-solid fa-scissors"} bgcolor={"bg-orange-200"} textColor={"text-orange-500"}/>
                    <InfoCard name={"Tracking"} count={"342"} icon={"fa-solid fa-arrow-trend-up"} bgcolor={"bg-emerald-200"} textColor={"text-emerald-500"} imgTransform={"rotate-[120deg]"}/>
                    <InfoCard name={"Appointments"} count={"342"} icon={"fa-solid fa-calendar"} bgcolor={"bg-pink-200"} textColor={"text-pink-500"} imgTransform={"rotate-[200deg]"}/>
                </div>
            </div>
            <hr/>
            <div className="h-1/2">

            </div>
        </div>
    );
}