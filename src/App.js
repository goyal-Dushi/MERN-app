import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ExercisesList from './components/exercisesList';
import EditExercise from './components/editExercise';
import CreateExercise from './components/createExercise';
import CreateUser from './components/createUser';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
 
function App() {
  return (
    <Router>
    <div className="container" > 
    <Navbar/>
    <div className="App">
      <Route path='/' exact component={ExercisesList} />
      <Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
      <Route path='/user' component={CreateUser} />
    </div>
    </div>
    </Router>
  );
}

export default App;
