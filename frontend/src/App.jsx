import { useEffect, useState } from "react";
import userService from "./services/userService";
import authService from "./services/authService";
import projectService from "./services/projectService";

const App = () => {
  //const [token, setToken] = useState("");

  useEffect(() => {
    const run = async () => {
      const credentials = {
        username: "nova",
        password: "password123",
      };

      const loggedUser = await authService.login(credentials);

      console.log(loggedUser);

      projectService.setToken(loggedUser.token);
      //const updated = await userService.updateUsername("Erno123");

      //const updatedBio = await userService.updateBio("noobie");

      //const me = await userService.getMe();

      const projects = await projectService.getAllProjects({ tech: ["vue"] });
      console.log(projects);
    };

    run();
  }, []);

  return (
    <div>
      <p>Nothing here yet</p>
    </div>
  );
};

export default App;
