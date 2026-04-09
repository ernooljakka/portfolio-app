import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import ProjectPage from "./components/pages/ProjectPage";
import Login from "./components/pages/Login";
import projectService from "./services/projectService";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      projectService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
