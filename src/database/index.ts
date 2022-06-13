// @ts-ignore
import knexfile from "../../knexfile";

import mongoose from "mongoose";

const knex = require("knex")(knexfile.development);



const mongoDB_URL = "";

mongoose.connect(mongoDB_URL);

export default knex;