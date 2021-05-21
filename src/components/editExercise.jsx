import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router';

function EditExercise(props)
{
    const [uname, setUserName] = useState('');
    const [desc, setDesc] = useState('');
    const [timeDuration, setDuration] = useState('');
    const [dateOfExercise, setDate] = useState('');
    const history = useHistory()

    let exerciseID = props.match.params.id;
    axios.get("http://localhost:5000/"+exerciseID)
    .then((data) => {
        setUserName(data.username);
        setDesc(data.description);
        setDuration(data.duration);
        setDate(data.date);
    });

function onSubmission(e)
{
    e.preventDefault();

    const exercise = {
        username : uname,
        description : desc,
        duration : timeDuration,
        date : dateOfExercise
    }

    axios.patch("http://localhost:5000/exercises/update/"+exerciseID, exercise)
    .then((res) => {console.log(res)});
    history.push('/');
}

    return (
        <div>
            <h3>Edit Exercise</h3>
            <form className="container sm" onSubmit={(e) => onSubmission(e)}>

                <div className="form-group">
                    <label htmlFor="user-select">Username</label>
                    <input 
                    name="user-select" 
                    onChange={(e) => setUserName(e.target.value)} required 
                    className="form-control"
                    value={uname}
                    />   
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
                    <input type="submit" value="Edit Exercise Log" 
                    className="btn btn-primary"
                    />
                </div>

            </form>
        </div>
    );
}

export default EditExercise;