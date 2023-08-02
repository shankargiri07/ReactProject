import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie'


export function Login(){

    const [userDetails, setUserDetails] = useState({UserId:'',Password:''});
    const [error, setError] = useState({userMsg:''});
    const [userError, setUserError] = useState('');
    const [cookes, setCookie, removeCookie] = useCookies(["user-id"]);

    const navigate = useNavigate()

    function handelUserChange(e){
        setUserDetails({
            UserId: e.target.value,
            Password: userDetails.Password
        })
    }

    function handelPwdChange(e){
        setUserDetails({
            UserId: userDetails.UserId,
            Password: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(userDetails.UserId=="" && userDetails.Password==""){
            setError({
                userMsg:'User Id & Password Required'
            })
        } else {
            setError({
                userMsg:''
            })
        }

        axios({
            method:'get',
            url:'http://127.0.0.1:5555/users'
        })
        .then(response =>{
            for(var user of response.data){
                if(userDetails.UserId=="" && userDetails.Password==""){
                    setError({
                        userMsg:'User Id & Password Required'
                    })
                } else if(user.UserId===userDetails.UserId && user.Password === userDetails.Password) {
                    setCookie("user-id", userDetails.UserId)
                    navigate('/videos');
                    break;
                } else {
                    setUserError('Ivalid Credential')
                }
            }
        })
    }

    return(
        <div className="row">
            <div className="col loginSideImage">

            </div>
            <div className='col loginMainCotainer'>
                <h3 className='text-center mt-2'>Wellocme To Tech-<span className='text-warning'>Video</span></h3>
                <div className="w-50 loginContainer">
                    <h3 className="text-primary text-center mb-4"><span className="bi bi-person-fill"></span> User Login</h3>
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dt>User ID</dt>
                            <dd><input type="text" placeholder="Enter user id" className="form-control" onChange={handelUserChange}/></dd>

                            <dt>Password</dt>
                            <dd><input type="password" placeholder="Enter password" className="form-control" onChange={handelPwdChange}/></dd>
                            <dd className='text-danger'>{error.userMsg}</dd>
                        </dl>
                        <button className="btn btn-success w-100 mt-2">Login</button>
                        <p className='text-danger'>{userError}</p>
                        <div className='d-flex justify-content-between'>
                            <p>User Register? <Link to='/register'>Register</Link></p>
                            <p>Click? <Link to='/forgot-pass'>Forget Password</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}