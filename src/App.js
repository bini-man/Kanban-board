import './App.scss';
import Kanban from './components/Kanban';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Detail from './detail/Detail';
function App() {
  return (
    <div style={{padding: '50px'}} >
       <Router>
        <Routes>
      <Route exact path='/' element= { <Kanban/>}></Route>
      <Route exact path='/detail/:id/:title/:desc' element= { <Detail/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
