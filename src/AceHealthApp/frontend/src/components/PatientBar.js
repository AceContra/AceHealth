export default function PatientBar({index, loading, search, ...element}){

    if(loading)
        return(
        <div key={index} className={`w-full h-[48px] flex items-center gap-2 p-2 border-2 border-neutral-300 rounded-md transition-all animate-pulse `+(index===0?`opacity-100`:index===1?`opacity-70`:index===2?`opacity-50`:index===3?`opacity-30`:index===4?`opacity-10`:`opacity-5`)}>
            <div className="flex items-center w-[80px] gap-2">
                <div className="bg-slate-400 rounded-full w-[40px] h-[40px]"></div>
            </div>
            <div className="flex  items-center w-1/6 gap-5">
                <div className="bg-slate-400 rounded-md w-5/6 h-[12px]"></div>
            </div>
            <div className="flex items-center w-1/6 gap-5">
                <div className="bg-slate-400 rounded-md w-4/6 h-[12px]"></div>
            </div>
            <div className="flex items-center justify-start w-1/6 gap-1">
                <div className="bg-slate-400 rounded-md w-4/6 h-[12px]"></div>
            </div>
            <div className="flex items-center justify-start w-1/6 gap-2">
                <div className="bg-slate-400 rounded-md w-5/6 h-[12px]"></div>
            </div>
            <div className="flex items-center justify-start w-1/6 gap-1">
                <div className="bg-slate-400 rounded-md w-4/6 h-[12px]"></div>
            </div>
            <div className="flex items-center justify-end w-1/6 gap-1">
                <div className="bg-slate-400 rounded-md w-2/3 h-[12px]"></div>
            </div>
        </div>
        );

    function searchReplacer(name, search){
        return (
            <>
                {name.substring(0,name.toLowerCase().indexOf(search))}
                <span class="bg-yellow-500">{name.substring(name.toLowerCase().indexOf(search),name.toLowerCase().indexOf(search)+search.length)}</span>
                {name.substring(name.toLowerCase().indexOf(search)+search.length,name.length)}
            </>
        )
    }

    return(
        <div onClick={()=>window.location.href=`../patient/${element._id}`} key={index} className="w-full flex items-center gap-2 p-2 border-2 rounded-md transition-all hover:bg-blue-100 group">
            <div className="flex items-center px-2">
                <img className="w-[35px] rounded-full" src={element.picture} alt="" />
            </div>
            <div className="flex items-center gap-2 w-1/6">
                {/* <i className={`text-xl `+element.icon}></i> */}
                <p className="font-bold text-neutral-400"> Name: </p>
                <p className="font-bold"> {
                search !=="" && element.name.toLowerCase().indexOf(search) !== -1?searchReplacer(element.name, search):
                element.name
                } </p>
            </div>
            <div className="flex items-center w-1/6 gap-3">
                <p className="font-bold text-neutral-400">Patient Age: </p>
                <p className="font-bold">{element.age}</p>
            </div>
            <div className="flex items-center w-1/6 gap-3">
                <p className="font-bold text-neutral-400"> BloodGrp: </p>
                <p className="font-bold"> {
                search !=="" && element.bloodgroup.toLowerCase().indexOf(search) !== -1?searchReplacer(element.bloodgroup, search):
                element.bloodgroup
                } </p>
            </div>
            <div className="flex items-center w-1/6 gap-3">
                <p className="font-bold text-neutral-400"> Category: </p>
                <p className="font-bold"> {
                search !=="" && element.category.toLowerCase().indexOf(search) !== -1?searchReplacer(element.category, search):
                element.category
                } </p>
            </div>
            <div className="flex items-center w-1/6 gap-3">
                <p className="font-bold text-neutral-400"> Device: </p>
                <p className={`font-bold `+(element.deviceid?"":"text-red-500")}>{element.deviceid?
                search !=="" && element.deviceid.toLowerCase().indexOf(search) !== -1?searchReplacer(element.deviceid, search):
                element.deviceid
                :"NA"}</p>
            </div>
            <div className="flex items-center justify-end w-1/6 gap-1 group-hover:visible invisible">
                <i className="fa-regular fa-eye p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
                <i className="fa-regular fa-pen-to-square p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
                <i className="fa-regular fa-trash-can p-2 bg-blue-400 text-white rounded-md cursor-pointer"></i>
            </div>
        </div>
    );
}