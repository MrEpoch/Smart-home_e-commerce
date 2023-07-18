import app from "./data_server";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = 3247;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
