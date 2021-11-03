import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Results from "./pages/Results";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/results" component={Results} />
        <Route path="/ingredients" component={Ingredients} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
