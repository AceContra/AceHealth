export default function SidebarButton({selected, href, name, icon, image, draft, className, disabled}){
    if(image && image.startsWith("images/guest")) image = "../"+image;

    if(disabled) return <></>

    return(
        <a href={href} className={("flex items-center p-4 rounded-md gap-7 w-full cursor-pointer active:scale-95 transition-all")+(selected?" bg-blue-100":" hover:scale-105")+(` ${className}`)}>
            {image?
            <img src={image} alt="" className="w-[30px] rounded-full" draggable={false}/>
            :<i className={icon+(selected?" text-blue-600":"")}></i>}

            <p className={("font-bold text-lg")+(selected?" text-blue-600":"")}>{name}</p>
            {draft?
            <div className="ml-auto flex items-center gap-1 p-1 bg-yellow-200 rounded">
                <i className="fa-brands fa-firstdraft text-yellow-600"></i>
                <p className="text-sm text-yellow-600">Draft</p>
            </div>:null}
        </a>
    );
}