import express from "express";
//import xmlparser from "express-xml-bodyparser";
import cors from "cors";
import Routes from "./routes";
import {dbConnect} from "./database";

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

//app.use(xmlparser());

app.use(Routes);

dbConnect().then(async () => {
    app.listen(process.env.PORT || 3333, () => {
        console.log(`Server is running on port ${process.env.PORT || 3333}`);
    });
});

