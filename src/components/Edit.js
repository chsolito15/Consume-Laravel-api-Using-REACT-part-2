import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const clicktoBackHandler = () => {
        navigate("/");
    }

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    })
   
    useEffect(()=>{
        fetchUser();

    },[id]);

    const fetchUser = async() =>{

        try{

            const result = await axios.get("http://127.0.0.1:8000/api/users/" + id);
            console.log(result.data.users);
            setUserField(result.data.users);

        }catch(err){
            console.log("Something Wrong");
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        try{

            await axios.put("http://127.0.0.1:8000/api/usersupdate/" + id, userField);
            navigate("/");
        }catch(err){
            console.log("Something Wrong");
        }
    }

    return(

        <div className="container">
     
            <h2 className='w-100 d-flex justify-content-center p-3'>React JS Laravel 10 REST API CRUD</h2>

            <div className='row'>

                <div className='col-md-4'>
                    <h3>Add Your Detail</h3>
               

                <form>

                    <div className="mb-3">

                        <label className="form-label">ID</label>
                        <input type="text" className="form-control" id="id" name="id" value={id} placeholder="Enter your id"/>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={userField.name} onChange={e => changeUserFieldHandler(e)} placeholder="Enter your Name"/>
               
                    </div>

                    <div className="mb-3">

                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={userField.email} onChange={e => changeUserFieldHandler(e)} placeholder="Enter your Email"/>
                    
                    </div>

                    <div className="mb-3">

                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={userField.password} onChange={e => changeUserFieldHandler(e)} placeholder="Enter your Password"/>
                    
                    </div>
       
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Update</button>

                </form>

                </div>
                
                <div className='container d-flex justify-content-center mb-3'>
                    <button className='btn btn-primary' onClick={clicktoBackHandler}>Back to home</button>
                </div>

            </div>
        </div> 

    );

};

export default Edit;