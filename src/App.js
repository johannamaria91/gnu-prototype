
import 'bootstrap/dist/css/bootstrap.min.css';
import Discussion from './components/Discussion';
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
          <Route path="/disc" element={<Discussion/>} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;
