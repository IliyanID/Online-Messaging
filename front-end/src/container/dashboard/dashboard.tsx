import React,{useState} from 'react';


import './dashboard.css';

import {ReactComponent as Message} from '../../resources/svg/chatting.svg'

import {ReactComponent as Settings} from '../../resources/svg/settings.svg'
import {ReactComponent as Microphone} from '../../resources/svg/microphone.svg'
import HostProfile from '../../resources/profilePicture/sunset.jpg'

import Messages from '../Objects/Messages/Messages'
import Setting from '../Objects/Settings/Settings'

interface props{
    logOut: () => void
    creds:{loggedIn:boolean,userName:string,view:string}
}









const Dashboard: React.FC<props> = ({logOut,creds}) => {
    const [messageData] = useState<any>(
    [
        [
            ["User"],
            {userName:"User", message:"This is what the client is saying", date:"3/20/2021", time:"10:26AM"},
            {userName:"User", message:"This is what the client is saying now", date:"4/1/2021", time:"10:26AM"},
            {userName:creds.userName, message:"This is what the user is responding with because because because because because because because because because because", date:"4/1/2021", time:"10:40AM"},
            {userName:creds.userName, message:"This is what the Host is saying", date:"4/1/2021", time:"10:40AM"},
            {userName:"User", message:"I am Responding to this", date:"4/1/2021", time:"10:41AM"},
            {userName:"User", message:"I disagree", date:"4/1/2021", time:"10:41AM"},
            {userName:"User", message:"The Objection is", date:"4/1/2021", time:"10:43AM"},
            {userName:"User", message:"mabye", date:"4/1/2021", time:"10:45AM"},
            {userName:creds.userName, message:"wack", date:"4/3/2021", time:"10:45AM"}
            
        ],
        [
            ["User","User3"]
        ],
        [
            ["User3"]
        ]
    ]);

  

    const setDraggable = (index:number) =>{
        let temp = [...windowsIndex];
        let tempWindow = windowsIndex[index];
        temp.splice(index,1);
        temp.unshift(tempWindow);
        setWindowsIndex(temp);
    } 

    

    let [windows] = useState([
        (index:number,zIndex:number)=>{return (<Messages
        creds = {creds}
        messageData = {messageData}
        bounds = ".bounds"
        defaultPosition = {{x:0,y:0}}
        cancel = ".messagesContainer"
        zIndex = {zIndex}
        index = {index}
        setZIndex={() =>setDraggable(index)}
        />)},

        (index:number,zIndex:number)=>{return (<Setting
            creds = {creds}
            bounds = ".bounds"
            defaultPosition = {{x:0,y:0}}
            cancel = ".settingContainer"
            zIndex = {zIndex}
            index = {index}
            setZIndex={() =>setDraggable(index)}
            />)}
    ])
    
    let tempArr:number[] = [];
    for(let i = 0; i < windows.length; i++)
        tempArr.push(i);
    let [windowsIndex,setWindowsIndex] = useState<any>([...tempArr]);

    return (

        <div className='dashboard'>
            <div className='userSettings noSelect'>
                <img src={HostProfile} alt='host'></img>
                <div className='userSettingsName noSelect' onClick={logOut}>{creds.userName}</div>
                <div className='microphoneSVG'><Microphone className='microphoneChild'/></div>
                <div className='settingsSVG'><Settings className='settingsSVG'></Settings></div>
            </div>
            
            <ul className='navBar'>
                <li> <Message fill="white" className='messageSVG noSelect'/> </li>
                <li className='noSelect'></li>
                <li className='noSelect'></li>
                <li className='noSelect'></li>
            </ul>

            <div className='bounds'>
                
                {windows.map((item,index)=>{
                    
                   return item(index,1000 - windowsIndex[index]);
                })}
                

                
            </div>   
        </div>
    );
}
/*
<Draggable 
                bounds = {'.bounds'}
                defaultPosition = {{x:900,y:0}}
                cancel = '.settingContainer'
                onMouseDown={()=>setDraggable("settings")}
                >
                    <div  style={(draggable === "settings")?{zIndex:1000}:{zIndex:10}} className='settingWindows'>
                        <div  className='grabBar'></div>
                        <div  className='settingContainer'>
                            <div className='settingsTabs'>
                            </div>
                            <h1>My Account</h1>
                        </div>
                    </div>
                </Draggable>
*/


export default Dashboard;