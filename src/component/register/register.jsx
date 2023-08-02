import './register.css';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Register(){

    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [errorClass, setErrorClass] = useState('');
    const [user, setUser] = useState ({UserId:'', UserName:'',Password:'',Email:'',Mobile:''});

    function handelUserIdChange(e){
        setUser({
            UserId:e.target.value,
            UserName:user.UserName,
            Password:user.Password,
            Email:user.Email,
            Mobile:user.Mobile
        })
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/users'
        })
        .then((response) => {
            for(var user of response.data){
                if(user.UserId === e.target.value){
                    setUserError('User Id Taken - Try Another');
                    setErrorClass('text-danger');
                    break;
                } else {
                    setUserError('User Id Available');
                    setErrorClass('text-success')
                }
            }
        })
    }
    /* function handelUserIdCahnge(e){
        setUser({
            UserId:e.target.value,
            UserName:user.UserName,
            Password:user.Password,
            Email:user.Email,
            Mobile:user.Mobile
        })
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/users'
        })
        .then((response) =>{
            for(var user of response.data){
                if(user.UserId===e.target.value){
                    setUserError('User Id Taken - Try Another');
                    setErrorClass('text-danger')
                } else {
                    setUserError('User Id Available');
                    setErrorClass('text-success')
                }
            }
        })
    } */

    function handelUserNameChange(e){
        setUser({
            UserId:user.UserId,
            UserName:e.target.value,
            Password:user.Password,
            Email:user.Email,
            Mobile:user.Mobile
        })
    }
    function handelPwdChange(e){
        setUser({
            UserId:user.UserId,
            UserName:user.UserName,
            Password:e.target.value,
            Email:user.Email,
            Mobile:user.Mobile
        })
    }
    function handelEmailChange(e){
        setUser({
            UserId:user.UserId,
            UserName:user.UserName,
            Password:user.Password,
            Email:e.target.value,
            Mobile:user.Mobile
        })
    }
    function handelMobileChange(e){
        setUser({
            UserId:user.UserId,
            UserName:user.UserName,
            Password:user.Password,
            Email:user.Email,
            Mobile:e.target.value
        })
    }
    function handelSubmit(){
        axios({
            method:'post',
            url:'http://127.0.0.1:5555/registeruser',
            data:user
        })
        alert("Registered Successfully..")
        navigate('/login')
    }
    
    return(
        <div className='row'>
            <div className='col registerImage'>

            </div>
            <div className='col registerMainContainer'>
                <h3 className='text-center mt-2'>Wellocme To Tech-<span className='text-warning'>Video</span></h3>
                <div className='w-50 registerContainer'>
                    <h3 className='text-center text-primary'><span className='bi bi-person-fill'></span> User Register</h3>
                    <form onSubmit={handelSubmit}>
                        <dl>
                            <dt>User ID</dt>
                            <dd><input type="text" placeholder='Enter user id' className='form-control' onChange={handelUserIdChange}/></dd>
                            <dd className={errorClass}>{userError}</dd>

                            <dt>User Name</dt>
                            <dd><input type="text" placeholder='Enter user name' className='form-control' onChange={handelUserNameChange}/></dd>
                            <dt>Password</dt>
                            <dd><input type="password" placeholder='Enter user password' className='form-control' onChange={handelPwdChange}/></dd>
                            <dt>Email</dt>
                            <dd><input type="text" placeholder='Enter user email' className='form-control' onChange={handelEmailChange}/></dd>
                            <dt>Mobile No</dt>
                            <dd><input type="text" placeholder='Enter user mobile no' className='form-control' onChange={handelMobileChange}/></dd>
                            <button className='btn btn-primary w-100 mt-4'>Register</button>
                        </dl>
                        <p><b>User Loign? <Link to='/login'>Login</Link></b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}