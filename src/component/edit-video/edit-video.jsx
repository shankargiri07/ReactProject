import { useState, useEffect } from "react"
import axios from "axios";
import { useFormik, Formik } from "formik";
import { useParams, Link, useNavigate } from "react-router-dom";


export function EditVideo(){

    const params = useParams();
    const navigate = useNavigate()
    const [Videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}])
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            VideoId:Videos[0].VideoId,
            Title:Videos[0].Title,
            Url:Videos[0].Url,
            Likes:Videos[0].Likes,
            Dislikes:Videos[0].Dislikes,
            Views:Videos[0].Views,
            CategoryId:Videos[0].CategoryId
        },

        onSubmit: (values)=>{
            axios({
                method: 'put',
                url: `http://127.0.0.1:5555/updatevideo/${params.id}`,
                data: values
            })
            alert("Video Update")
            navigate('/admin-home')
        },
        enableReinitialize: true
    })
    
    function LoadCategory(){
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5555/categories'
        })
        .then(response =>{
            response.data.unshift({CategoryId:-1, CategoryName:'Choose Category'})
            setCategories(response.data)
        })
    }

    function GetVideo(){
        axios({
            method: 'get',
            url: `http://127.0.0.1:5555/videos/${params.id}`
        })
        .then((response)=>{
            setVideos(response.data);
        })
    }
    useEffect(()=>{
        LoadCategory();
        GetVideo();
    },[])
    return(
        <div>
            <div>
                <h3>Edit Video Details</h3>
                <form onSubmit={formik.handleSubmit}>
                   <dl className="w-50">
                        <dt>Video Id</dt>
                        <dd><input type="number" name="VideoId" className="form-control" value={formik.values.VideoId} onChange={formik.handleChange}/></dd>
                        <dt>Title</dt>
                        <dd><input type="text" name="Title" className="form-control" value={formik.values.Title} onChange={formik.handleChange}/></dd>
                        <dt>Url</dt>
                        <dd><input type="text" name="Url" className="form-control" value={formik.values.Url} onChange={formik.handleChange}/></dd>
                        <dt>Likes</dt>
                        <dd><input type="number" name="Likes" className="form-control" value={formik.values.Likes} onChange={formik.handleChange}/></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="number" name="Dislikes" className="form-control" value={formik.values.Dislikes} onChange={formik.handleChange}/></dd>
                        <dt>Views</dt>
                        <dd><input type="number" name="Views" className="form-control" value={formik.values.Views} onChange={formik.handleChange}/></dd>
                        <dt>Category</dt>
                        <dd>
                            <select name="CategoryId" className="form-select" value={formik.values.CategoryId}>
                                {
                                    categories.map(category =>
                                        <option value={category.CategoryId} key={category.CategoryId} onChange={formik.handleChange}>
                                            {category.CategoryName.toUpperCase()}
                                        </option>
                                    ) 
                                }
                            </select>
                        </dd>
                        <button className="btn btn-primary w-100 mt-2">Update Video</button>
                    </dl> 
                    
                </form>
                <p>
                    <Link to='/admin-home'>Back To Home</Link>
                </p>
            </div>
            <div>

            </div>
        </div>
    )
}