import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectPage = () => {
  const { id } = useParams();

  const { projects } = useSelector((state) => state.projects);

  const project = projects.find((p) => p.id === Number(id));

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      <p className="text-gray-400">Project details will go here...</p>
    </div>
  );
};

export default ProjectPage;
