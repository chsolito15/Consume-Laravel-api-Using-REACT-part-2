import React, { useState } from 'react';
import List from './List';
import axios from 'axios';

const Home = () =>{

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    })

    const changeUserFieldHandler = (e) => {

        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const [loading, setLoading] = useState();

    const onSubmitChange = async (e) => {

        e.preventDefault();
        setLoading(true)

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/addnew", userField);
            console.log(response);
            setLoading(false)
        }catch(err){
            console.log("Something Wrong");
        }
    }
   
    if(loading){
        return <Home/>
    }

    return (

        <div className="container">
     
            <h2 className='w-100 d-flex justify-content-center p-3'>React JS Laravel 10 REST API CRUD | AXIOS</h2>

            <div className='row'>

                <div className='col-md-4'>
                    <h3>Add Your Detail</h3>
                

                    <form>
                        <div className="mb-3">

                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter your Name" onChange={e => changeUserFieldHandler(e)}/>
                
                        </div>

                        <div className="mb-3">

                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter your Email" onChange={e => changeUserFieldHandler(e)}/>
                        
                        </div>

                        <div className="mb-3">

                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="text" className="form-control" id="password" name="password" placeholder="Enter your Password" onChange={e => changeUserFieldHandler(e)}/>

                        </div>
                    
                        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add User</button>

                    </form>

                </div>
                    <div className='col-md-8'>
                        <List/>
                    </div>

            </div>

        </div>

    )

};

export default Home;