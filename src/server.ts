import express from "express";
import cors from "cors";
import Routes from "./routes";

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

app.use(Routes);

app.listen(3333);

