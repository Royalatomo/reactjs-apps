import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoteState from './context/NoteState';
import About from './components/About';

function App() {
  return (
    <NoteState>
      <div className="App">
        <Router>

          <Switch>

            <Route exact path="/login"><Login /></Route>
            <Route exact path="/signup"><Register /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/"><Home /></Route>

          </Switch>

        </Router>
      </div>
    </NoteState>
  );
}

export default App;
