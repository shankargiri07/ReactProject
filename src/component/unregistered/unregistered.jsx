import { Link } from 'react-router-dom';
import './unrig.css';

export function Unregistered(){
    return(
        <div>
            <div className="UnrigContainer">
                
            </div>
            <div className='mt-2'>
                <h3 className='text-danger text-center'>Unable to find your account..</h3>
                <p className='fw-bold text-center'>User Register? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}