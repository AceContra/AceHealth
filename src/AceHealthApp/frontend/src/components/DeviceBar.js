export default function DeviceBar({index, loading, ...element}){

    if(loading)
        return(
        <div key={index} className={`w-full h-[48px] flex items-center gap-2 p-2 border-2 border-neutral-300 rounded-md transition-all animate-pulse `+(index===0?`opacity-100`:index===1?`opacity-70`:index===2?`opacity-50`:index===3?`opacity-30`:index===4?`opacity-10`:`opacity-5`)}>
            <div className="flex items-center w-1/6 gap-5">
                <div className="bg-slate-400 rounded-md w-[25px] h-[25px]"></div>
                <div className="bg-slate-400 rounded-md w-4/6 h-[12px]"></div>
            </div>
            <div className="flex items-center w-1/6 gap-1">
                <div className="bg-slate-400 rounded-md w-2/4 h-[12px]"></div>
            </div>
            <div className="flex items-center w-1/6 gap-2">
                <div className="bg-slate-400 rounded-md w-5/6 h-[12px]"></div>
            </div>
            <div className="flex items-center w-1/6 gap-1">
                <div className="bg-slate-400 rounded-md w-full h-[12px]"></div>
            </div>
            <div className="flex items-center justify-end w-2/6 gap-1">
                <div className="bg-slate-400 rounded-md w-1/2 h-[12px]"></div>
            </div>
        </div>
        );

    return(
        <div key={index} className="w-full flex items-center gap-2 p-2 border-2 rounded-md transition-all hover:bg-blue-100 group">
            <div className="flex items-center gap-5 w-1/6">
                <i className={`text-xl `+element.icon}></i>
                <p className="font-bold"> {element.name} <span className="text-sm text-neutral-400">({element.id})</span></p>
            </div>
            <div className="flex items-center w-1/6 gap-1">
                <p className="text-neutral-400">Type:</p>
                <p className="font-bold">{element.type}</p>
            </div>
            <div className="flex items-center w-1/6 gap-2">
                
                {element.assignedTo?
                <div onClick={()=>window.location.href=`../patient/${element.assignedTo._id}`} className="flex gap-2 items-center hover:cursor-pointer px-5 p-1 hover:bg-blue-300 rounded-md transition-all duration-200">
                    <img className="w-[23px] rounded-full" src={element.assignedTo.picture} alt=""/>
                    <p className="underline text-sm"> {element.assignedTo.name} </p>
                </div>
                :
                <>
                <p className="text-neutral-400">Assigned To:</p>
                <p className="text-red-600 font-bold">NA</p>
                </>}
            </div>
            <div className="flex items-center w-1/6 gap-1">
                <p className="text-neutral-500">Status:</p>
                {element.isActive?<i className="fa-regular fa-circle-dot animate-pulse text-emerald-800"></i>:<i className="fa-solid fa-circle-dot text-neutral-600 fa-sm"></i>}
                {element.isActive?<p className="font-bold text-emerald-700 animate-pulse">Active</p>:"Inactive"}
            </div>
            <div className="flex items-center justify-end w-2/6 gap-1 group-hover:visible invisible">
                <i className="fa-regular fa-eye p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
                <i className="fa-regular fa-pen-to-square p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
                <i className="fa-brands fa-stack-overflow p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
            </div>
        </div>
    );
}