import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import './dashboard.css';

interface props{
    logOut: () => void
    creds:{loggedIn:boolean,userName:string,view:string}
}

const Dashboard: React.FC<props> = ({logOut,creds}) => {
    return (
        <div>
            <section>
                <ul>
                    <li>Messages</li>
                    <li>Server 1</li>
                    <li>Server 2</li>
                    <li>Server 3</li>
                </ul>
            </section>
            <input type='button' value='Logout' onClick={logOut}></input>
        </div>
    );
}

export default Dashboard;