
import 'bootstrap/dist/css/bootstrap.min.css';
import Discussion from './components/Discussion';
import CreateTopicpage from './components/CreateTopicpage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return(
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CreateTopicpage/>}/>
          <Route path="/disc" element={<Discussion/>}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App;
