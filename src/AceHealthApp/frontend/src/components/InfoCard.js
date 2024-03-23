export default function InfoCard({name, icon, count, bgcolor, textColor, imgTransform}){
    return (
        <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 hover:font-bold cursor-pointer transition-all">
        <img className={`object-fill absolute opacity-5 ${imgTransform}`} src="images/infoCardBG.jpg" alt="" draggable={"false"}/>
        <div className={`w-full h-full flex flex-col gap-2 p-5 ${bgcolor} `}>
            <div className="flex gap-6 items-center">
                <div className="p-3 w-[50px] bg-white rounded-md flex items-center justify-center">
                    <i className={`${icon} ${textColor}`} ></i>
                </div>
                <p>{name}</p>
                <div className="w-full flex items-center justify-end">
                    <span class="relative flex h-5 w-5 items-center justify-center">
                        <span class="animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                    </span>
                    <p className="text-sm text-red-500 font-bold font-mono">Live</p>
                </div>
            </div>
            <div className="flex w-full gap-1 items-center">
                <p className="text-4xl font-bold">{count}</p>
                <hr className="w-2/6 border-1 border-black border-double"/>
                <hr className="w-2/6 border-2 border-black"/>
            </div>
        </div>
        </div>
    )
}