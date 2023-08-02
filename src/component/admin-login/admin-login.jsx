import './admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export function AdminLogin(){

    const [user, setUser] = useState({UserId:'', Password:''})
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user-id'])

    function handelIdChange(e){
        setUser({
            UserId:e.target.value,
            Password:user.Password
        })
    }
    function handelPwdChange(e){
        setUser({
            UserId:user.UserId,
            Password:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/admin'
        })
        .then((response) => {
            for(var users of response.data){
                if(users.UserId===user.UserId && users.Password===user.Password){
                    setCookie("user-id", user.UserId)
                    navigate('/admin-home')
                    break;
                } else {
                    setError("Invalid Credentials")
                }
            }
        })
    }

    return(
        <div className="row mt-2">
            <div className="col mainAdminContainer">
                <h3 className='text-center'>Wellcome To Tech-<span className="text-warning">Video</span> Admin</h3>
                <div className="w-50 adminContainer">
                    <h3 className="text-center text-primary mb-4"><span className="bi bi-person-fill"></span> Admin Login</h3>
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dt>Admin ID</dt>
                            <dd><input type="text" placeholder="Enter admin id" className="form-control" onChange={handelIdChange}/></dd>
                            <dt>Admin Password</dt>
                            <dd><input type="password" placeholder="Enter admin password" className="form-control" onChange={handelPwdChange}/></dd>
                        </dl>
                        <button className="btn btn-success w-100 mt-2">Login</button>
                        <p className='text-danger'>{error}</p>
                    </form>
                </div>
            </div>
            <div className="col adminLoginImage">

            </div>
        </div>
    )
}