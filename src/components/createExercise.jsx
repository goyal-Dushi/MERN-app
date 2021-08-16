import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function CreateExercise(props) {
  const history = useHistory();

  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState({
    username: "none",
    description: "",
    duration: "",
    date: "",
  });

  useEffect(() => {
    const users = async () => {
      const data = await axios
        .get("http://localhost:5000/users/")
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error :", err);
        });
      setUserList(data);
    };
    users();
    document.title = "Create Exercise";
  }, []);

  async function onSubmission(e) {
    e.preventDefault();
    if (userDetail.username === "none") {
      return;
    }
    await axios
      .post("http://localhost:5000/exercises/add", userDetail)
      .then((res) => {
        props.setPopup(res.data);
      });
    history.push("/");
  }

  return (
    <div className={"container-sm"}>
      <h3 className={"display-4"}>Create New Exercise</h3>
      <form onSubmit={(e) => onSubmission(e)}>
        <div className='form-group mt-3'>
          <label htmlFor='user-select'>Username</label>
          <select
            name='user-select'
            placeholder={"Select username"}
            onChange={(e) =>
              setUserDetail({ ...userDetail, username: e.target.value })
            }
            required
            className='form-control form-control-lg'
            value={userDetail.username}>
            {userList.map((item, i) => (
              <option key={i} value={item.username}>
                {item.username}
              </option>
            ))}
            <option value={"none"}> {"No user selected"} </option>
          </select>
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-desc'>Description</label>
          <input
            type='text'
            name='user-desc'
            required
            autoComplete={"off"}
            value={userDetail.description}
            className='form-control form-control-lg'
            onChange={(e) =>
              setUserDetail({ ...userDetail, description: e.target.value })
            }
          />
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-dur'>Duration (in minutes) </label>
          <input
            type='number'
            required
            name='user-dur'
            autoComplete={"off"}
            value={userDetail.duration}
            className='form-control form-control-lg'
            onChange={(e) =>
              setUserDetail({ ...userDetail, duration: Number(e.target.value) })
            }
          />
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='user-date'>Date</label>
          <input
            type='date'
            name='user-date'
            required
            className='form-control form-control-lg'
            value={userDetail.date}
            onChange={(e) =>
              setUserDetail({ ...userDetail, date: e.target.value })
            }
          />
        </div>

        <div className='form-group mt-3'>
          <button type='submit' className='btn btn-primary'>
            {"Create Exercise Log"}
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

export default CreateExercise;
