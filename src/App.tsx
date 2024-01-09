import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import { useEffect } from "react";
import { verifyToken } from "./services/auth";
import { useAuthDispatch } from "./context/UserContextHooks";

function App() {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      verifyToken(token).then((res) => {
        if (res) {
          dispatch({
            type: "LOG_IN",
            payload: { isAuthenticated: true, ...res, token },
          });
        }
      });
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="blog/:id" element={<Blog />} />
          <Route path="user/:id" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
