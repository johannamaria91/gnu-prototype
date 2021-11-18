import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Conversationpage from './pages/Conversation';
import CreateNewTopicpage from "./pages/CreateTopicpage";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/topic" component={CreateNewTopicpage}  /> 
          <Route exact path="/" component={Conversationpage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
