export default function SidebarButton({selected, href, name, icon}){
    return(
        <a href={href} className={("flex items-center p-4 rounded-md gap-7 w-full cursor-pointer active:scale-95 transition-all")+(selected?" bg-blue-100":" hover:scale-105")}>
            <i className={icon+(selected?" text-blue-600":"")}></i>
            <p className={("font-bold text-lg")+(selected?" text-blue-600":"")}>{name}</p>
        </a>
    );
}