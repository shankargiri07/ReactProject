import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
export function Logout(){

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    function handelLogout(){
        removeCookie("user-id");
        navigate('/admin-login');
    }
    return(
        <div>
            <h3 className="ms-4"><button onClick={handelLogout} className="btn btn-link text-danger"><span className="bi bi-box-arrow-right"></span> Logout</button></h3>
        </div>
    )
}