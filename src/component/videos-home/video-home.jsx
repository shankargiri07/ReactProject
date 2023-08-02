import { useState, useEffect } from "react"
import axios from "axios"
import { useCookies } from 'react-cookie';

export function VideoHome(){

    const [videos, setVideos] = useState([]);
    const [cookes, setCookie, removeCookie] = useCookies()
    useEffect(()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/videos'
        })
        .then((response)=>{
            setVideos(response.data);
        })
    },[])
    return(
        <div>
            <div>
                <h3>Video Home</h3>
                <div>
                    <b>User Name: {cookes["user-id"]}</b> 
                </div>
            </div>
            <div className="d-flex">
                {
                    videos.map(video=>
                        <div className="card p-2 m-2" style={{width:'350px'}}>
                            <div className="card-header">
                                <iframe src={video.Url} width="300px" height="250px"></iframe>
                            </div>
                            <div className="card-body">
                                <h4>{video.Title}</h4>
                            </div>
                        </div>    
                    )
                }
            </div>
        </div>
    )
}