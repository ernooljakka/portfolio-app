import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition hover:-translate-y-1">
      <div className="p-5">
        {/* TITLE */}
        <Link to={`/project/${project.id}`}>
          <h2 className="text-xl font-semibold text-white hover:underline">{project.title}</h2>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-2">{project.description}</p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="bg-blue-800 text-xs px-2 py-1 rounded-md text-gray-300">
              {tech}
            </span>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center text-sm">
          <Link to={`/profile/${project.User.id}`} className="text-indigo-400 hover:underline">
            @{project.User.username}
          </Link>

          <span className="text-gray-500 text-xs">
            {new Date(project.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
