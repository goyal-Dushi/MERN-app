import React from 'react';
import { Link } from 'react-router-dom';

function Exercise(props)
{
    let editLink = "/update/"+props.exercise._id;
    return(
        <tr>
            <td> {props.exercise.username} </td>
            <td> {props.exercise.description} </td>
            <td> {props.exercise.duration} </td>
            <td> {props.exercise.date.substring(0,10)} </td>
            <Link to={editLink}> Edit </Link> | <a href="#" onClick={() => props.delete(props.exercise._id)} >Delete</a>
        </tr>
    );
}

export default Exercise;