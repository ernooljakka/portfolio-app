import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import ProjectPage from "./components/pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
