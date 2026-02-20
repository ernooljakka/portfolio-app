import { User } from "./user.js";
import { Project } from "./project.js";

User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });
