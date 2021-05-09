import React, { useState } from 'react';
import axios from 'axios';

// let currExercise = {
//     currUser :  '',
//     currDesc : '',
//     currDur : '',
//     currDate : ''
// }

// axios.get("http://localhost:5000/exercises/"+exerciseID)
//         .then( (res) => {
//             console.log(res.data);
//             currExercise.currUser = res.data.username;
//             currExercise.currDesc = res.data.description;
//             currExercise.currDur = res.data.duration;
//             currExercise.currDate = Date.parse(res.data.date);
// });

function EditExercise(props)
{
    var [uname, setUserName] = useState('');
    var [desc, setDesc] = useState('');
    var [timeDuration, setDuration] = useState('');
    var [dateOfExercise, setDate] = useState('');

    let exerciseID = props.match.params.id;
    // console.log(exerciseID); 

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
    .then((res) => console.log(res));
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