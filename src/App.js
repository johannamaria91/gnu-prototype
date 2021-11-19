import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Conversationpage from './pages/Conversation';
//import CreateNewTopicpage from "./pages/CreateTopicpage";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/*<Route exact path="/topic" component={CreateNewTopicpage} />*/} 
          <Route exact path="/" component={Conversationpage} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
