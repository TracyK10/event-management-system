import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EventsPage from "../pages/Register";
import Event from "../pages/Event";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/events" component={EventsPage} />
        <Route path="/events/:id" component={Event} />
      </Switch>
    </Router>
  );
}

export default App;
