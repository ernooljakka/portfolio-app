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
      description: "My personal portfolio built with React and Node.js",
      projectURL: "https://example.com/portfolio",
      imageURL: "https://example.com/image1.png",
      techStack: ["React", "Node.js", "PostgreSQL"],
    });

    await Project.create({
      userId: user1.id,
      title: "Task Manager API",
      description: "REST API for managing tasks",
      projectURL: "https://example.com/task-api",
      imageURL: "https://example.com/image2.png",
      techStack: ["Node.js", "Express", "PostgreSQL", "node.js"],
    });

    // create projects for user2
    await Project.create({
      userId: user2.id,
      title: "Realtime Chat App",
      description: "Chat app using WebSockets",
      projectURL: "https://example.com/chat",
      imageURL: "https://example.com/image3.png",
      techStack: ["React", "Node.js", "Socket.io"],
    });

    await Project.create({
      userId: user2.id,
      title: "DevOps Dashboard",
      description: "Dashboard for monitoring services",
      projectURL: "https://example.com/devops",
      imageURL: "https://example.com/image4.png",
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
