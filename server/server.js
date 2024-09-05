import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

app.get("/", function (request, response) {
  response.json("You are looking at my root route.");
});

app.get("/jokes", async function (request, response) {
  const jokes = await db.query("SELECT * FROM jokes");
  response.json(jokes.rows);
});

app.post("/jokes", async function (request, response) {
  const jokes = await db.query(
    "INSERT INTO jokes(setup, punchline) VALUES($1, $2)",
    [request.body.setup, request.body.punchline]
  );
  response.json(jokes); // we are sending back the request, to prove we got it!
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080...");
});
