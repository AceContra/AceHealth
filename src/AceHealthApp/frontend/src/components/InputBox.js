import { useState } from "react";

export default function InputBox({name, className, value, setValue, placeholder, type, accept, icon, pattern, minLength, maxLength, min, max, required, imageName, setImageName}){

    const [image, setImage] = useState(null);
    return(
        <div className={`w-full h-full flex flex-col border-2 border-neutral-200 rounded-md group hover:border-blue-500 `+(className)}>
            {type==="file"?
            <div className="h-full p-2 flex flex-col justify-end">
                <div className="h-full p-1 flex justify-center items-center">
                    
                    <div className="flex w-full h-full gap-2">
                        {imageName==="custom"?
                        
                        (image?
                        <img className="w-[100px] h-[100px] rounded-full" src={image} alt="" draggable={false}/>
                        :<div className="w-[140px] h-[100px] flex items-center justify-center rounded-full border-2 border-dashed border-neutral-400">
                            <i className="fa-solid fa-panorama fa-xl text-neutral-600"></i>
                        </div>)

                        :<img className="w-2/6" src={`./images/${imageName}.jpg`} alt="" draggable={false}/>
                        }
                        <div className="w-full h-full flex flex-col justify-center">
                            <h1 className="font-bold">Patient Profile Pic</h1>
                            <p className="text-neutral-500 text-sm">
                                This Is How The Patient Profile Picture Will Look.
                            </p>
                            {image?
                            <button className="underline text-red-400 text-start w-full" onClick={()=>{setImage(null);setValue(null);}}>reset</button>
                            :null}
                        </div>
                    </div>
                    
                </div>
                <input type="hidden" name={name} value={image}/>
                <select className="w-full border-2 py-1 rounded-md" value={imageName} onChange={(event)=>{
                    setImageName(event.target.value);
                    if(event.target.value==="custom"){
                        setImage(null);
                        setValue(null);
                    }else{ 
                        setImage("images/"+event.target.value+".jpg");
                        setValue("images/"+event.target.value+".jpg");
                    }
                }}>
                    <option value={"custom"} defaultValue={true}>Custom</option>
                    <option value={"guest_0"}>Pinky</option>
                    <option value={"guest_1"}>Blinder</option>
                    <option value={"guest_2"}>Tree Em</option>
                    <option value={"guest_3"}>Tangled</option>
                    <option value={"guest_4"}>RockStar</option>
                    <option value={"guest_5"}>Blue ye</option>
                    <option value={"guest_6"}>Singer</option>
                    <option value={"guest_7"}>Smiley</option>
                    <option value={"guest_8"}>Biker</option>
                    <option value={"guest_9"}>Stylish</option>
                </select>
            </div>:null}
            
            <div className={`flex items-center gap-2 p-2 overflow-hidden transition-all`+(type==="file"? imageName==="custom"?" h-2/6":" h-0 opacity-0":" h-full")}>
                <i className={`${icon} text-neutral-500 group-hover:text-blue-500`}></i>
                <input name={type!=="file"?name:"fuckingNotNeeded"} className="w-full h-full p-2 peer placeholder:text-black font-bold invalid:text-red-700 valid:text-blue-700" value={type!=="file"?value:null} type={type} onChange={(event)=>{
                    if(type==="file"){
                        setValue( URL.createObjectURL(event.target.files[0]) );
                        setImage( URL.createObjectURL(event.target.files[0]) );
                        return;
                    }
                    setValue(event.target.value)}
                } minLength={minLength} min={min} max={max} maxLength={maxLength} pattern={pattern} placeholder={placeholder} required={required} accept={accept}/>
                <label className="flex gap-1 items-center w-0 h-0 opacity-0 peer-invalid:w-2/6 peer-invalid:opacity-100 peer-invalid:h-auto overflow-hidden text-sm text-red-500 px-1 transition-all">
                    <i className="fa-solid fa-circle-xmark"></i> {type!=="file"?"Invalid":null}
                </label>
                <label className="flex items-center w-0 h-0 opacity-0 peer-valid:w-1/6 peer-valid:opacity-100 peer-valid:h-auto text-sm text-blue-500 px-1 transition-all">
                    <i className="fa-solid fa-circle-check fa-lg"></i>
                </label>
            </div>
            
        </div>
    );
}