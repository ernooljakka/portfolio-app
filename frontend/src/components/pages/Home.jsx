import { useEffect } from "react";
import { fetchProjects } from "../../features/projects/projectSlice";
import ProjectList from "../ProjectList";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const latestProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Latest Projects</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <ProjectList projects={latestProjects} />}
    </div>
  );
};

export default Home;
