// @ts-ignore
import knexfile from "../../knexfile";
const knex = require("knex")(knexfile.development);


export default knex;