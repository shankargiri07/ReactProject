import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function ForgotPass(){
    const [userDetails, setUserDetails] = useState({Email:''})
    const [emailError, setEmailError] = useState('');
    const [errorClass, setErrorClass] = useState('')
    const navigate = useNavigate();

    function handelEmailVerify(e){
        setUserDetails({
            Email:e.target.value
        })
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5555/users'
        })
        .then(response => {
            for(var user of response.data){
                if(user.Email === e.target.value){
                    setEmailError('Valid Email Id')
                    setErrorClass('text-success')
                } else {
                    setEmailError('Invalid Email Id')
                    setErrorClass('text-danger')
                }
            }
        })
    }
    function handelSubmitEmail(e){
        e.preventDefault();
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5555/users'
        })
        .then(response => {
            for(var user of response.data){
                if(user.Email === userDetails.Email){
                    navigate('/update-pass')
                    break;
                } else {
                    setEmailError('Somthing Worng')
                }
            }
        })
    }
    return(
        <div className="container-fluid">
            <form onSubmit={handelSubmitEmail}>
                <dl className="w-25">
                    <dt>User Email</dt>
                    <dd><input type="text" placeholder="Enter register email" className="form-control" onChange={handelEmailVerify}/></dd> 
                    <dd className={errorClass}>{emailError}</dd>
                    <button className="btn btn-primary">Verify</button>
                </dl>   
            </form>
        </div>
    )
}