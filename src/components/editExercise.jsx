import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

let initialState = {
  username: "",
  duration: "",
  date: "",
  description: "",
};

function EditExercise(props) {
  const [userExercise, setUserExercise] = useState(initialState);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Edit Exercise";
  }, []);

  useEffect(() => {
    const getExercise = async () => {
      await axios
        .get("http://localhost:5000/exercises/" + id)
        .then((res) => {
          setUserExercise({ ...res.data });
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    };
    getExercise();
  }, [id]);

  async function onSubmission(e) {
    e.preventDefault();

    await axios
      .patch("http://localhost:5000/exercises/update/" + id, userExercise)
      .then((res) => {
        props.setPopup(res.data);
      })
      .catch((err) => {
        console.log("Error updating: ", err);
        props.setPopup(err);
      });
    setUserExercise(initialState);
    history.push("/");
  }

  return (
    <div>
      <h3>Edit Exercise</h3>
      <form className='container sm' onSubmit={(e) => onSubmission(e)}>
        <div className='form-group mt-3'>
          <label htmlFor='user-select'>Username</label>
          <input
            name='user-select'
            required
            disabled
            className='form-control'
            value={userExercise?.username}
          />
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-desc'>Description</label>
          <input
            type='text'
            name='user-desc'
            required
            value={userExercise?.description}
            className='form-control'
            onChange={(e) =>
              setUserExercise({ ...userExercise, description: e.target.value })
            }
          />
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-dur'>Duration (in minutes) </label>
          <input
            type='text'
            required
            name='user-dur'
            value={userExercise?.duration}
            className='form-control'
            onChange={(e) =>
              setUserExercise({ ...userExercise, duration: e.target.value })
            }
          />
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-date'>Date</label>
          <input
            type='date'
            name='user-date'
            required
            className='form-control'
            value={userExercise?.date.slice(0, 10)}
            onChange={(e) =>
              setUserExercise({ ...userExercise, date: e.target.value })
            }
          />
        </div>

        <div className='form-group mt-2'>
          <button type='submit' className='btn btn-primary'>
            {"Edit Exercise Log"}
          </button>
          <button
            onClick={() => history.push("/")}
            type={"button"}
            style={{ margin: "0px 15px" }}
            className={"btn btn-secondary"}>
            {"Go Back"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
