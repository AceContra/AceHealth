import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Cookies from 'universal-cookie';
import Devices from './pages/Devices';
import Patient from './pages/Patient';

function Exit(){
    return (
        <div className='w-full bg-white flex items-center justify-center'>
            <div className='w-1/2 h-1/2 rounded-md flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold'>Are You Sure! You Want To <span className='underline border-black px-2 hover:border-2 hover:border-dashed rounded transition-all duration-75'>Leave</span>?</h1>
                <div className='w-full flex gap-5 p-5'>
                    <button onClick={()=>window.location.href="../patients"} className='h-[60px] w-5/6 border-2 rounded-md bg-emerald-500 text-white font-bold p-2 hover:scale-105 transition-all'>No</button>
                    <button onClick={()=>{window.open("", "_self");window.close();}} className='w-1/6 border-2 rounded-md bg-neutral-500 text-white font-bold p-2 hover:scale-90 transition-all'>Yes</button>
                </div>
            </div>
        </div>
    );
}

function App({selectedPage}) {

    const cookies = new Cookies();
    let tmpCreatePatientModalCookie = cookies.get('createPatientModal');

    if(tmpCreatePatientModalCookie === undefined){
        cookies.set('createPatientModal', false, { path: '/' });
        tmpCreatePatientModalCookie = false;
    }

    const [createPatientModal,setCreatePatientModal] =  useState(tmpCreatePatientModalCookie);
    function _setCreatePatientModal( value ){
        const cookies = new Cookies();
        cookies.set('createPatientModal', value, { path: '/' });
        setCreatePatientModal(value);
    }

    return (<div className='w-full h-screen bg-white flex'>
        <Sidebar selectedPage={selectedPage} createPatientModal={createPatientModal} />
        {
            selectedPage==="DASHBOARD"?<Dashboard/>:
            selectedPage==="PATIENTS"?<Patients createPatientModal={createPatientModal} setCreatePatientModal={_setCreatePatientModal} />:
            selectedPage==="DOCTORS"?<div className='w-full bg-white'></div>:
            selectedPage==="DEVICES"?<Devices />:
            selectedPage==="SETTINGS"?<div className='w-full bg-white'></div>:
            selectedPage==="EXIT"?<Exit />:
            selectedPage==="PATIENT"?<Patient />:
            <>Where The Fuck Are You?<a href='../dashboard'>Go Back To Dashboard!</a></>
        }
    </div>);
}

export default App;
