import { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Dashboard(){
    const navigate = useNavigate();
    const location = useLocation();
    const [data,setData] = useState(null);

    useEffect(()=>{
        axios({
            method: 'GET',
            url:`http://localhost:${process.env.REACT_APP_API_HOSPITAL_PORT}/`,
            headers:{"Content-Type": "application/json" },
        })
        .then((res)=>{ setData(res.data);})
        .catch((reason)=>{ console.log(reason); });
    },[]);

    return (
        <div className='w-full bg-white'>
            Dashboard
        </div>
    );
}