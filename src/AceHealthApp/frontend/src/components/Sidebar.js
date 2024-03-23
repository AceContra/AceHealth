import SidebarButton from "./SidebarButton";


export default function Sidebar({selectedPage}){
    return <>
        <div className="w-[400px] border-x-2 border-neutral-200 flex flex-col gap-3 p-5">
            <div>
                <SidebarButton selected={selectedPage==="DASHBOARD"} href={"../dashboard"} name={"Dashboard"} icon={"fa-solid fa-cube fa-lg"} />
            </div>
            <hr/>
            <div className="h-full">
                <SidebarButton selected={selectedPage==="PATIENTS"} href={"../patients"} name={"Patients"} icon={"fa-solid fa-face-smile-beam fa-lg"} />
                <SidebarButton selected={selectedPage==="DOCTORS"} href={"../doctors"} name={"Doctors"} icon={"fa-solid fa-user-doctor fa-lg"} />
            </div>
            <hr/>
            <div>
                <SidebarButton selected={selectedPage==="SETTINGS"} href={"../settings"} name={"Settings"} icon={"fa-solid fa-gear fa-lg"} />
                <SidebarButton selected={selectedPage==="EXIT"} href={"../exit"} name={"Exit"} icon={"fa-solid fa-xmark fa-lg"} />            
            </div>
        </div>
    </>
}
