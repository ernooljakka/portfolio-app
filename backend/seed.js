import bcrypt from "bcrypt";
import { sequelize } from "./utils/db.js";
import { User } from "./models/user.js";
import { Project } from "./models/project.js";

const seed = async () => {
  try {
    console.log("🌱 Starting seed...");

    await sequelize.authenticate();

    await Project.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });

    const passwordHash1 = await bcrypt.hash("password123", 10);
    const passwordHash2 = await bcrypt.hash("password123", 10);

    // create users
    const user1 = await User.create({
      username: "shade",
      email: "shade@gmail.com",
      bio: "Fullstack developer passionate about modern web apps",
      passwordHash: passwordHash1,
    });

    const user2 = await User.create({
      username: "nova",
      email: "nova@gmail.com",
      bio: "Backend developer focused on scalable systems",
      passwordHash: passwordHash2,
    });

    console.log("✅ Users created");

    // create projects for user1
    await Project.create({
      userId: user1.id,
      title: "Portfolio App",
      description: "Personal portfolio built with modern web technologies",
      longDescription:
        "This project is a full-stack portfolio application where users can create profiles and showcase their projects. It includes authentication, project management, and a clean UI built with React and Tailwind.",
      githubURL: "https://github.com/shade/portfolio-app",
      projectURL: "https://example.com/portfolio",
      techStack: ["React", "Node.js", "PostgreSQL", "Redux"],
    });

    await Project.create({
      userId: user1.id,
      title: "Task Manager API",
      description: "REST API for managing tasks efficiently",
      longDescription:
        "A backend-focused project providing a RESTful API for managing tasks. Includes authentication, validation, and scalable architecture using Express and PostgreSQL.",
      githubURL: "https://github.com/shade/task-manager-api",
      projectURL: "https://example.com/task-api",
      techStack: ["Node.js", "Express", "PostgreSQL"],
    });

    // create projects for user2
    await Project.create({
      userId: user2.id,
      title: "Realtime Chat App",
      description: "Chat application with real-time messaging",
      longDescription:
        "A real-time chat application using WebSockets. Supports multiple rooms, instant messaging, and a responsive frontend built with React.",
      githubURL: "https://github.com/nova/chat-app",
      projectURL: "https://example.com/chat",
      techStack: ["React", "Node.js", "Socket.io"],
    });

    await Project.create({
      userId: user2.id,
      title: "DevOps Dashboard",
      description: "Dashboard for monitoring services and system metrics",
      longDescription:
        "A monitoring dashboard that visualizes system metrics and service health. Built with Vue and Docker, it provides real-time insights into infrastructure performance.",
      githubURL: "https://github.com/nova/devops-dashboard",
      projectURL: "https://example.com/devops",
      techStack: ["Vue", "Docker", "PostgreSQL"],
    });

    console.log("✅ Projects created");
    console.log("🌱 Seeding completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
