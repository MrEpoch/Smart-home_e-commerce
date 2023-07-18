import app from "./auth_server_normal";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = 3248;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
