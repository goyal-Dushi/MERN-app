import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/exercises/")
        .then((res) => setExercises(res.data));
    };
    document.title = "Home:Exercises";
    getData();
  }, []);

  async function deleteExercise(id) {
    const updateData = await axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(() => exercises.filter((item) => item._id !== id));
    setExercises([...updateData]);
  }

  return (
    <div className={"container-md text-center"}>
      <div className={"display-4"}>Logged Exercises</div>
      {exercises.length ? (
        <table className='table table-hover table-responsive-sm mt-4'>
          <thead className='thead-light'>
            <tr style={{ textAlign: "center" }}>
              <th>
                <h5>Username </h5>
              </th>
              <th>
                <h5> Description </h5>
              </th>
              <th>
                <h5> Duration </h5>
              </th>
              <th>
                <h5> Date </h5>
              </th>
              <th>
                <h5>Actions </h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises?.map((item, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td className={"align-middle"}>{item?.username}</td>
                <td className={"align-middle"}> {item?.description} </td>
                <td className={"align-middle"}> {item?.duration} </td>
                <td className={"align-middle"}> {item?.date.slice(0, 10)} </td>
                <td>
                  <Link
                    type={"button"}
                    to={`/update/${item?._id}`}
                    className={"btn btn-outline-warning m-2"}>
                    Edit
                  </Link>
                  <a
                    type={"button"}
                    href='/'
                    onClick={() => deleteExercise(item?._id)}
                    className={"btn btn-outline-danger m-1"}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className={"text-muted mt-3"}> {"No Logged Exercises!"} </h3>
      )}
    </div>
  );
}

export default ExerciseList;
