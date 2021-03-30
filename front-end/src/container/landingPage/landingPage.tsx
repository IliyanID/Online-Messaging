import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import './landingPage.css';
const LandingPage = () => {

    return(
        <div className='LandingPage'>
            <section className='header'>
                <div className='name'>Deimos</div>
                <ul>
                    <li>Why Deimos</li>
                    <li> Download</li>
                    <li>Support</li>
                </ul>
                <div className='buttonsContainer'> 
                    <h1>Your Place to Talk</h1> 
                    <p>Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.</p>
                    <input type='button' value='Download Deimos'></input>
                    <input type='button' value='Open Deimos in Browser'></input>
                </div>

            </section>

            <section>

            </section>
        </div>
    );

}

export default LandingPage;
