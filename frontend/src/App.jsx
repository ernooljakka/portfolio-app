import { useEffect, useState } from "react";
import userService from "./services/userService";
import authService from "./services/authService";

const App = () => {
  //const [token, setToken] = useState("");

  useEffect(() => {
    const run = async () => {
      const credentials = {
        username: "shade",
        password: "password123",
      };

      const loggedUser = await authService.login(credentials);

      console.log(loggedUser);

      userService.setToken(loggedUser.token);
      //const updated = await userService.updateUsername("Erno123");

      //const updatedBio = await userService.updateBio("noobie");

      //const me = await userService.getMe();

      await userService.deleteUser(loggedUser.user.id);
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
