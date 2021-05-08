import React from 'react';
import axios from 'axios';
import Exercise from './exercise';
import EditExercise from './editExercise';

let exercises = [];

function deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/'+id)
    .then((res) => {
        exercises.filter((item) => item._id !== id)
    });
}

// function updateExercise(id){
//     exercises.filter((item) => item.)
// }

function getExerciseList()
{
    axios.get('http://localhost:5000/exercises')
    .then((res) => {
        exercises = res.data;
    });

    exercises.map((item) => {
        return(
            <Exercise exercise={item} delete={deleteExercise} 
            edit={<EditExercise />} />
        );
    })
}

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
                    {getExerciseList}
                </tbody>
            </table> 
        </div>
    );
}

export default ExerciseList;