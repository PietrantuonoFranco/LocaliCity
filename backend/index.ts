import express, { Request, Response } from "express";
import { AppDataSource } from "./src/data-source";
import dotenv from "dotenv";
import "reflect-metadata"

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

//-------------------------------------------------------------------

AppDataSource.initialize().then(async () => {
    // create express app
    const app = express();

    app.listen(process.env.EXPRESS_PORT);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));