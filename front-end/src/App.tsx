import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import {useCookieState} from 'use-cookie-state'

import LandingPage from  './container/landingPage/landingPage';
import Login from './container/login/login'
import Dashboard from './container/dashboard/dashboard'

import './App.css';







const App = () => {
  
  
  const [stringLoginInfo,stringSetLoginInfo] = useCookieState("mykey",JSON.stringify({loggedIn:false,userName:"",view:"landingPage"}),undefined);

  const loginInfo = JSON.parse(stringLoginInfo);
  const setLoginInfo = (obj:{loggedIn:boolean,userName:string,view:string}) =>{
    stringSetLoginInfo(JSON.stringify(obj))
  }
  


  let content = (<div>Error occured loginInfo is {loginInfo.view}</div>)


  if(loginInfo.view === 'landingPage')
    content = (
      <LandingPage
        changeView={()=>{setLoginInfo({loggedIn:false,userName:"",view:"login"})}}
      />
    );

  else if(loginInfo.view === 'login')
    content = (<Login
      getLoginInfo = {loginInfo}
      setLoginInfo = {(obj:{loggedIn:boolean,userName:string,view:string}) => {setLoginInfo(obj)}}
      />
    );

  else if(loginInfo.view === 'dashboard'){
    content = <Dashboard
      creds = {loginInfo}
      logOut = {()=>{setLoginInfo({loggedIn:false,userName:"",view:"landingPage"})}}
      />
  }

  return(
    <div>
      {content}
    </div>
  );
}

export default App;