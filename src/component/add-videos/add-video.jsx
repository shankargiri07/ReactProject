import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Formik, useFormik } from "formik";
import * as yup from 'yup'
import { useState, useEffect } from "react"

export function AddVideos(){

    const [categorise, setCategories] = useState ([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method:'get',
            url:'http://127.0.0.1:5555/categories'
        }) 
        .then((response) => {
            response.data.unshift({CategoryId:-1, CategoryName:'Choose Category'});
            setCategories(response.data)
        })
    },[])

    const formik = useFormik({
        initialValues:{
            "VideoId":'',
            "Title":'',
            "Url":'',
            "Likes":'',
            "Dislikes":'',
            "Views":'',
            "CategoryId":''
        },
        validationSchema:yup.object({
            "VideoId":yup.string().required('Video id required')
        }),
        onSubmit: (value)=>{
            axios({
                method:'post',
                url:'http://127.0.0.1:5555/addvideos',
                data:value
            })
            alert('Video Added Successfully..');
            navigate("/admin-home");
        }
    })
    return(
        <div>
            <h3>Add New Videos</h3>
            <div>

            </div>
            <div className="w-25">
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>VideoId</dt>
                        <dd><input type="number" placeholder="Enter video id" name="VideoId" className="form-control" {...formik.getFieldProps("VideoId")} onChange={formik.handleChange}/></dd>
                        <dd className="text-danger">{formik.errors.VideoId}</dd>
                        <dt>Title</dt>
                        <dd><input type="text" placeholder="Enter video title" name="Title" className="form-control" onChange={formik.handleChange}/></dd>
                        <dt>Url</dt>
                        <dd><input type="text" placeholder="Enter video link" name="Url" className="form-control" onChange={formik.handleChange}/></dd>
                        <dt>Likes</dt>
                        <dd><input type="number" placeholder="Enter likes" name="Likes" className="form-control" onChange={formik.handleChange}/></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="number" placeholder="Enter dislike" name="Dislikes" className="form-control" onChange={formik.handleChange}/></dd>
                        <dt>Views</dt>
                        <dd><input type="number" placeholder="Enter views" name="Views" className="form-control" onChange={formik.handleChange}/></dd>
                        <dt>Category Id</dt>
                        <dd>
                            <select name="CategoryId" onChange={formik.handleChange} className="form-select">
                                {
                                    categorise.map(category=>
                                        <option value={category.CategoryId} key={category.CategoryId}>
                                            {category.CategoryName.toUpperCase()}
                                        </option>    
                                    )
                                }
                            </select>
                        </dd>
                        <button className="btn btn-primary w-100 mt-2">Add Video</button>
                    </dl>
                </form>
                <p>Back To Home? <Link to='/admin-home'>Admin Home</Link></p>
            </div>
        </div>
    )
}