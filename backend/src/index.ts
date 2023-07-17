import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = 3247;

app.listen(port, () => {
    console.log("Server is running on port 3244");
});
