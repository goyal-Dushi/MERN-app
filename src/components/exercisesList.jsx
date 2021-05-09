import React from 'react';
import axios from 'axios';
import Exercise from './exercise';

let exercises = [];

function deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(() => {
        exercises.filter((item) => item._id !== id)
    });
}

axios.get('http://localhost:5000/exercises/')
    .then((res) => {
    exercises = res.data; 
});

function ExerciseList()
{
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((item) => <Exercise exercise={item} delete={deleteExercise} />)}
                </tbody>
            </table> 
        </div>
    );
}

export default ExerciseList;