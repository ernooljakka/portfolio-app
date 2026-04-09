import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import projectService from "../../services/projectService";

const ProjectPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!project) return <p className="text-gray-400">Project not found</p>;

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex justify-between text-sm text-gray-400 mb-6">
        <Link to={`/profile/${project.User.id}`} className="text-indigo-400 hover:underline">
          {project.User.username}
        </Link>

        <span>
          {new Date(project.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="text-lg text-gray-300 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span key={tech} className="bg-blue-800 px-3 py-1 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      {project.longDescription && (
        <p className="text-gray-400 whitespace-pre-line mb-8">{project.longDescription}</p>
      )}

      <div className="flex gap-4">
        {project.githubURL && (
          <a
            href={project.githubURL}
            target="_blank"
            rel="noreferrer"
            className="bg-gray-800 px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-700 hover:scale-105"
          >
            GitHub
          </a>
        )}

        {project.projectURL && (
          <a
            href={project.projectURL}
            target="_blank"
            rel="noreferrer"
            className="bg-indigo-600 px-4 py-2 rounded-lg transition duration-200 hover:bg-indigo-500 hover:scale-105"
          >
            Visit Site
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
