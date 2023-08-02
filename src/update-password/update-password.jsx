import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function UpdatePass(){
    const [pass, setPass] = useState({Password:''})
    const navigate = useNavigate();
    const params = useParams();

    function handelPwdChange(e){
        setPass({Password:e.target.value})
    }
    function handelSubmit(e){
        e.preventDefault();
        axios({
            method: 'put',
            url: `http://127.0.0.1:5555/users/${params.password}`
        })
        alert('Password Update Succefully..')
        navigate('/login')
    }
    return(
        <div>
            <form onSubmit={handelSubmit}>
                <dl className="w-25">
                    <dt>Change Password</dt>
                    <dd><input type="password" placeholder="Enter new password" className="form-control" onChange={handelPwdChange}/></dd>
                    <button className="btn btn-primary w-100">Update</button>
                </dl>
            </form>
        </div>
    )
}