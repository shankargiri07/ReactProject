import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom' 
import { useCookies } from 'react-cookie';

export function AdminHome(){
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    function LoadVideos(){
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/videos'
        })
        .then((response) =>{
            setVideos(response.data)
        })
    }

    useEffect(() =>{
        if(cookies["user-id"] == undefined){
            navigate('/admin-login');
        } else {
            LoadVideos()
        }
    },[])

    return(
        <div>
            <div className="d-flex justify-content-between mt-4">
                <div>
                    <h3>Admin Home</h3>
                </div>
                <div>
                    <div>
                        <Link to='/add-videos' className="btn btn-success">Add New Video</Link>
                    </div>
                    
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video =>
                            <tr key={video.VideoId}>
                                <td>
                                    <iframe src={video.Url} width="60px" height="60px"></iframe>
                                </td>
                                <td><p className="mt-3">{video.Title}</p></td>
                                <td>
                                    <Link to={`/view-video/${video.VideoId}`} className="mt-3 btn btn-primary ms-2"><span className="bi bi-eye"></span></Link>
                                    <Link to={`/edit-video/${video.VideoId}`} className="mt-3 btn btn-warning ms-2"><span className="bi bi-pen-fill"></span></Link>
                                    <Link to={`/delete-video/${video.VideoId}`} className="mt-3 btn btn-danger ms-2"><span className="bi bi-trash-fill"></span></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}