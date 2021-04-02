import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import Draggable from "react-draggable";

import './dashboard.css';

import {ReactComponent as Message} from '../../resources/svg/chatting.svg'
import {ReactComponent as Phone} from '../../resources/svg/phone-call.svg'
import {ReactComponent as Video} from '../../resources/svg/video-camera.svg'

import HostProfile from '../../resources/profilePicture/male.jpg'
import ClientProfile from '../../resources/profilePicture/female.jpg'

interface props{
    logOut: () => void
    creds:{loggedIn:boolean,userName:string,view:string}
}




const parseMessageData = (index:number,messageData,userName:string) =>{
    const compareDates = (date:string) =>{
        let currentDate = new Date();
        let messageDate = new Date(date);

        if(currentDate.getFullYear() === messageDate.getFullYear())
            if(currentDate.getMonth() === messageDate.getMonth())
                if(currentDate.getDay() === messageDate.getDay()){
                    return true;
                }

        return false;
    }

    let JSXmessagesArray:JSX.Element[] = [];
    let currentMessages = messageData[index];
    for(let i = 1; i < currentMessages.length;i++){
        let individualMessage = (
            <li>
                <img className='profilePicture' src={(currentMessages[i].userName === userName)?HostProfile : ClientProfile} alt ='Host Profile'/>
                <div className='hostMessage'>
                    <div className='hostName'>
                        {currentMessages[i].userName}
                    </div>
                    <div className='time'>{(compareDates(currentMessages[i].date)) ? ("Today at" + currentMessages[i].time) : currentMessages[i].date}</div>
                    <div className='messageText'>
                        {currentMessages[i].message}
                    </div>
                </div>
            </li>
        );
        JSXmessagesArray.push(individualMessage)
    }

    const parseParticipants = (users:string[]):string => {
        let result = "";
        for(let s of users){
            result +='@' + s + ((users[users.length - 1] === s)?' ' : ', ');
        }
        return result;
    }
   

    let result = (
        <Fragment>
            <div className='messageHeader'>
                <div className = 'friendName'>{parseParticipants(currentMessages[0])}</div>
                <ul className='callOptions'>
                    <li><Phone className='svg microphone'/></li>
                    <li><Video className='svg'/></li>
                    <input className='searchMessages' type='text' placeholder='Search'/>
                </ul>
            </div>
            <div className='messageContent'>
                <ul>    
                    {JSXmessagesArray.map((jsx)=>{return jsx})}
                </ul>
            </div>
        </Fragment>

    )
    return result;
}



const Dashboard: React.FC<props> = ({logOut,creds}) => {
    let messageData = 
[
    [
        ["User1"],
        {userName:"User1", message:"This is what the client is saying", date:"3/20/2021", time:"10:26AM"},
        {userName:"User1", message:"This is what the client is saying", date:"4/1/2021", time:"10:26AM"},
        {userName:creds.userName, message:"This is what the user is responding with because because because because because because because because because because", date:"4/1/2021", time:"10:40AM"},
        {userName:creds.userName, message:"This is what the Host is saying", date:"4/1/2021", time:"10:40AM"},
        {userName:"User1", message:"I am Responding to this", date:"4/1/2021", time:"10:41AM"},
        {userName:"User1", message:"I disagree", date:"4/1/2021", time:"10:41AM"},
        
    ]
]
    //dragElement(document.getElementById("messages"));
    return (
        <div className='dashboard'>
            <h1 className='test'>Hello {creds.userName}</h1>
            <input type='button' value='Logout' onClick={logOut}></input>
            <ul className='navBar'>
                <li> <Message fill="white" className='messageSVG'/> </li>
                <li>Server 1</li>
                <li>Server 2</li>
                <li>Server 3</li>
            </ul>
            <div className='bounds'>
                <Draggable 
                bounds = {'.bounds'}
                defaultPosition = {{x:50,y:40}}
                cancel = '.messagesContainer'
                >
                    <div className='messages'>
                        <div className='messagesContainer'>
                           {parseMessageData(0,messageData,creds.userName)}
                            <form className='messageType'>
                                <input type='text' placeholder='Message @User1'></input>
                            </form>
                        </div>
                        
                    </div>
                </Draggable>
            </div>
                
            
        </div>
    );
}

const dragElement = (element) =>{
    const dragMouseDown = (e:any) =>{
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDrageElement;
        document.onmousemove = elementDrag;
    }

    const elementDrag = (e) =>{
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";    
    }

    const closeDrageElement = () =>{
        document.onmouseup = null;
        document.onmousemove = null;
    }

    let pos1 = 0,pos2 = 0, pos3 = 0, pos4 = 0;
    let doc = document.getElementById("messagesHeader");
    //if(doc != null)
       // doc.onmousedown = dragMouseDown;
    //else
        element.onmousedown = dragMouseDown;
}

export default Dashboard;