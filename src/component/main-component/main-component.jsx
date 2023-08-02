import './main.css';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

export function MainComponent(){

    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(e){
        setUserEmail(e.target.value)
    }

    function handelEmailVerify(){
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/users'
        })
        .then((response)=>{
            for(var users of response.data){
                if(users.Email===userEmail){
                    navigate('/login');
                    break;
                } else {
                    navigate('/unregistered')
                }
            }
        })
    }

    return(
        <div className='mainComnent d-flex justify-content-center align-items-center' style={{height:'500px'}}>
            <div>
                <div>
                    <h2>Learn UI From Tech-<span className='text-warning'>Video</span></h2>
                    <p className='text-center'><b>Watch Videos, Learn Technology</b></p>
                </div>
                <div className='input-group'>
                    <input className='UserEmail' type="emial" placeholder='Enter email' onChange={handleEmailChange}/>
                    <button className='btn btn-danger' onClick={handelEmailVerify}>Get Started <span className='bi bi-chevron-right'></span></button>
                </div>
            </div>
        </div>
    )
}