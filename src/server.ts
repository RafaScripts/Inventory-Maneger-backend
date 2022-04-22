import express from "express";
//import xmlparser from "express-xml-bodyparser";
import cors from "cors";
import Routes from "./routes";

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

//app.use(xmlparser());

app.use(Routes);

app.listen(process.env.PORT || 3333, () => console.log('Server is ON'));

