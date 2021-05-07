import './App.css';
import ExercisesList from './components/exercisesList';
import EditExercise from './components/editExercise';
import CreateExercise from './components/createUser';
import CreateUser from './components/createUser';
import {BrowserRouter as Router, Route} from 'react-router-dom';
 
function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' exact component={ExercisesList} />
      <Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
      <Route path='/user' component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
