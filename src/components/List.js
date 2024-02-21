import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const List = () =>{

    const [userData, setUserData] = useState([]);

    useEffect(() =>{

        fetchData();

    }, [])

    const fetchData = async () =>{

        try{
            const result = await axios("http://127.0.0.1:8000/api/users");
            
            setUserData(result.data.results);

        }catch(err){
            console.log("Something Wrong");
        }
    }

    const handleDelete = async(id) =>{
      
        try{

        await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);
    
        setUserData(userData.filter(user => user.id !== id));

        }catch(err){
            console.log("Something Wrong");
        }
    }



    return(

        <div className="container">

            <h3>User Details</h3>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        userData.map((user, i) => {

                            return(      
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>

                                    <td>    
                                        <NavLink to={`/view/${user.id}`} className="btn btn-success mx-2">View</NavLink>
                                        <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                        <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                    
                                    </td>
                                </tr>

                            )
                        })
                    }
                </tbody>

            </table>

        </div>

    )

}

export default List;