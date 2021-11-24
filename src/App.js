<<<<<<< HEAD
import './App.css';
import React from 'react';
=======

import 'bootstrap/dist/css/bootstrap.min.css';
import Discussion from './components/Discussion';
import CreateTopicpage from './components/Homepage/CreateTopicpage';
>>>>>>> 301476d6a2efd2b829a6dc221d8b293e643a0d17
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

<<<<<<< HEAD
import Conversationpage from './pages/Conversation';
import CreateNewTopicpage from "./pages/CreateTopicpage";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Conversationpage/>} />
          <Route path="/topic" element={<CreateNewTopicpage/>} />
        </Routes>
      </div>
    </Router>
  );
=======
function App() {
  return(
    <Router>
      <div className="App">
        <Routes>
         <Route exact path="/" element={<CreateTopicpage/>}/>
          <Route path="/discussions/:id" element={<Discussion/>}/>
        </Routes>
      </div>
    </Router>
  )
>>>>>>> 301476d6a2efd2b829a6dc221d8b293e643a0d17
}
export default App;
