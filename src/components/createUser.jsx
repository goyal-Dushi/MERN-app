import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateUser(props) {
  const [user, setUsername] = useState({ username: "" });
  const history = useHistory();

  useEffect(() => {
    document.title = "Create User";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => {
        props.setPopup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/create");
  }

  return (
    <div className={"container sm"} style={{ marginTop: "78px" }}>
      <h3 className={"display-4"}>Create User</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group mt-3'>
          <label htmlFor='user-select'>Username</label>
          <input
            type='text'
            autoComplete={"off"}
            name='user-select'
            onChange={(e) => setUsername({ username: e.target.value })}
            required
            className='form-control form-control-lg'
            value={user.username}
          />
        </div>
        <div className='form-group mt-3'>
          <button type='submit' className='btn btn-primary'>
            {"Create User"}
          </button>
          <button
            onClick={() => history.push("/")}
            type={"button"}
            style={{ marginLeft: "10px" }}
            className={"btn btn-outline-dark"}>
            {"Go Back"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
