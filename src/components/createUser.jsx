import React, { useState } from 'react';
import axios from 'axios';

function CreateUser()
{

    const [uname, setUsername] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        const user = {
            username : uname
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add', user)
        .then((res) => console.log(res.data));
    }

    return (
        <div>
            <h3>Create User</h3>
            <form onSubmit={(e) => handleSubmit(e)} >
            <div className="form-group">
                    <label htmlFor="user-select">Username</label>
                    <input
                    type="text"
                    name="user-select" 
                    onChange={(e) => setUsername(e.target.value)} required 
                    className="form-control mt-3"
                    value={uname}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" 
                    className="btn btn-primary mt-3"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateUser;