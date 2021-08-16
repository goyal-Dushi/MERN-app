import "bootstrap/dist/css/bootstrap.min.css";
import ExercisesList from "./components/exercisesList";
import EditExercise from "./components/editExercise";
import CreateExercise from "./components/createExercise";
import CreateUser from "./components/createUser";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [showAlert, setAlert] = useState({ show: false, msg: "", type: "" });

  return (
    <>
      <Router>
        <Navbar />
        <div className='container-fluid' style={{ marginTop: "70px" }}>
          {showAlert.show ? (
            <div
              className={`alert alert-${showAlert.type} alert-dismissible fade show mt-5`}
              role='alert'
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              {showAlert.msg}
              <button
                style={{ width: "20px" }}
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
                onClick={() => setAlert({ show: false, msg: "", type: "" })}>
                <span aria-hidden={"true"}>&times;</span>
              </button>
            </div>
          ) : (
            <div style={{ height: "70px", width: "100%" }}></div>
          )}
          <div className='App'>
            <Route path='/' exact component={ExercisesList} />
            <Route path='/update/:id'>
              <EditExercise setPopup={setAlert} />
            </Route>
            <Route path='/create'>
              <CreateExercise setPopup={setAlert} />
            </Route>
            <Route path='/user'>
              <CreateUser setPopup={setAlert} />
            </Route>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
