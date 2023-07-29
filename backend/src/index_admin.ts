import app from "./auth_server_admin";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = 3249;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
