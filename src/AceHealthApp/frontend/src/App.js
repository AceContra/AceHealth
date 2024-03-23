import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';

function App({selectedPage}) {
    return (<div className='w-full h-screen bg-white flex'>
        <Sidebar selectedPage={selectedPage} />
        {
            selectedPage==="DASHBOARD"?<Dashboard/>:
            selectedPage==="PATIENTS"?<Patients/>:
            selectedPage==="DOCTORS"?<div className='w-full bg-white'></div>:
            selectedPage==="SETTINGS"?<div className='w-full bg-white'></div>:
            selectedPage==="EXIT"?<div className='w-full bg-white'></div>:
            <>Where The Fuck Are You?<a href='../dashboard'>Go Back To Dashboard!</a></>
        }
    </div>);
}

export default App;
