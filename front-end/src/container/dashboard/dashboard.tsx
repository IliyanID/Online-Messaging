import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import './dashboard.css';

interface props{
    changeView: () => void
    creds:{loggedIn:boolean,userName:string}
}

const Dashboard: React.FC<props> = ({changeView,creds}) => {
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
        </div>
    );
}

export default Dashboard;