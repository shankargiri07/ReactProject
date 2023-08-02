import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export function DeleteVideo(){
    const params = useParams();
    const [videos, setVideos] = useState([{VideoId:0, Title:0, Url:'', Likes:0, Dislike:0, Views:0, CategoryId:0}]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            method: 'get',
            url: `http://127.0.0.1:5555/videos/${params.id}`
        })
        .then(response =>{
            setVideos(response.data)
        })

    },[])

    function handelDeleteClick(){
        axios({
            method: 'delete',
            url: `http://127.0.0.1:5555/deletevideo/${params.id}`
        })
        alert('Video Deleted');
        navigate('/admin-home');
    }
    return(
        <div>
            <h4>Deleting Video {videos[0].Title} are you sure?</h4>
            <iframe src={videos[0].Url} width='400px' height="300px">

            </iframe>
            <p>
                <button onClick={handelDeleteClick} className="btn btn-danger">Yes</button> <Link className="btn btn-warning" to="/admin-home">Cancel</Link>
            </p>
        </div>
    )
}