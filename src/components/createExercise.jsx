import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

function getUsers(currUser)
{
    return (
        <option key={currUser} value={currUser}>
            {currUser}
        </option>
    );
}

let users = [];

function CreateExercise()
{
const history = useHistory();
const [uname, setUserName] = useState(users[0]);
const [desc, setDesc] = useState('');
const [timeDuration, setDuration] = useState('');
const [dateOfExercise, setDate] = useState('');

function onSubmission(e)
{
    e.preventDefault();

    const exercise = {
        username : uname,
        description : desc,
        duration : timeDuration,
        date : dateOfExercise
    }

    axios.post('http://localhost:5000/exercises/add', exercise)
    .then((res) => {
        console.log(res);
    });
    history.push('/');
}

    return (
        <div>
            <h3>Create New Exercise</h3>
            <form className="container sm" onSubmit={(e) => onSubmission(e)}>

                <div className="form-group">
                    <label htmlFor="user-select">Username</label>
                    <select 
                    name="user-select" 
                    onChange={(e) => setUserName(e.target.value)} required 
                    className="form-control"
                    value={uname}
                    >   
                        {users.map((user) => getUsers(user))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="user-desc">Description</label>
                    <input type="text"
                    name="user-desc"
                    required 
                    value={desc}
                    className="form-control"
                    onChange={(e) => setDesc(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="user-dur">Duration (in minutes) </label>
                    <input type="text" 
                    required
                    name="user-dur"
                    value={timeDuration}
                    className="form-control"
                    onChange={(e) => setDuration(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="user-date">Date</label>
                    <input type="date" name="user-date"
                    required
                    className="form-control"
                    value={dateOfExercise}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" 
                    className="btn btn-primary"
                    />
                </div>

            </form>
        </div>
    );
}

axios.get('http://localhost:5000/users/')
.then((res) => {
    users = res.data.map((user) => user.username);
});

export default CreateExercise;