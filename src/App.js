import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getCurrentUser } from "./api/index.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C99C9C",
      contrastText: '#ffffff',
    },
    secondary: {
      main: "#856565",
    },
    contrastThreshold: 3,
  },
  typography: {
    allVariants: {
      color: "#856565"
    },
    fontFamily: "'Ropa Sans', sans-serif",
    fontSize: 16,
    h1: {
      fontFamily: "'Croissant One', cursive",
      fontSize: 24,
    },
    h2: {
      fontFamily: "'Codystar', cursive",
      fontSize: 44,
    },
    h3: {
      color: "#624A4A",
      fontSize: 42
    }
  },
});

function App() {
  const user = getCurrentUser();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/results" component={Results} />
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/login" component={() => (!user ? <Login /> : <Redirect to="/profile" />)} />
          <Route path="/profile" component={() => (user ? <Profile /> : <Redirect to="/login" />)} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
