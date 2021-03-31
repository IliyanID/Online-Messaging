import React,{useState, Fragment, FormEvent, useEffect} from 'react';


import LandingPage from  './container/landingPage/landingPage';
import Login from './container/login/login'
import Dashboard from './container/dashboard/dashboard'

import './App.css';







const App = () => {
  const [view,setView] = useState("landingPage")
  const [loginInfo,setLoginInfo] = useState({loggedIn:false,userName:""})
  let content = (<div></div>)

  if(view === 'landingPage')
    content = (
      <LandingPage
        changeView={()=>{setView("login")}}
      />
    );

  else if(view === 'login')
    content = (<Login
      getLoginInfo = {loginInfo}
      setLoginInfo = {(obj:{loggedIn:boolean,userName:string}) => {setLoginInfo(obj); 
                              if(obj.loggedIn){
                                setView ('dashboard');
                              }
                              
                            }}
      />
    );

  else if(view === 'dashboard'){
    content = <Dashboard
      changeView={()=>{setView("login")}}
      creds = {loginInfo}
      />
  }

  return(
    <div>
      {content}
    </div>
  );
}

export default App;