import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import Draggable from "react-draggable";

import './dashboard.css';

import {ReactComponent as Message} from '../../resources/svg/chatting.svg'
import {ReactComponent as Microphone} from '../../resources/svg/microphone.svg'
import {ReactComponent as Video} from '../../resources/svg/video-camera.svg'

import HostProfile from '../../resources/profilePicture/male.jpg'

interface props{
    logOut: () => void
    creds:{loggedIn:boolean,userName:string,view:string}
}








const Dashboard: React.FC<props> = ({logOut,creds}) => {
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
                            <div className='messageHeader'>
                                <div className = 'friendName'>User1</div>
                                <ul className='callOptions'>
                                    <li><Microphone className='svg microphone'/></li>
                                    <li><Video className='svg'/></li>
                                </ul>
                            </div>
                            <div className='messageContent'>
                                <ul>
                                    <li>
                                        <img className='profilePicture' src={HostProfile} alt ='Host Profile'/>
                                        <div className='hostMessage'>
                                            <div className='hostName'>
                                                {creds.userName} <div>4/1/2021 10:26AM</div>
                                            </div>
                                            <div>
                                                This is my message that I'm saying
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <img className='profilePicture' src={HostProfile} alt ='Host Profile'/>
                                        <div className='hostMessage'>
                                            <div>
                                                {creds.userName} 
                                            </div>
                                            <div>4/1/2021 10:26AM</div>
                                            <div>
                                                This is my second message
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <img className='profilePicture' src={HostProfile} alt ='Host Profile'/>
                                        <div className='hostMessage'>
                                            <div className='hostName'>
                                                {creds.userName} <div>4/1/2021 10:26AM</div>
                                            </div>
                                            <div>
                                                This is my message that I'm saying
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <form className='messageText'>
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