// @ts-ignore
import knexfile from "../../knexfile";

import mongoose from "mongoose";

const knex = require("knex")(knexfile.development);


const mongoDB_URL = "mongodb+srv://sysposDev:032211@cluster0.p1zcpyw.mongodb.net/clusterV0?retryWrites=true&w=majority";

export const dbConnect = () => {

    return new Promise((resolve: any) => {

        mongoose.Promise = require(`bluebird`)
        // mongoose.set('debug', true)
        //mongoose.set('useCreateIndex', true)
        //mongoose.set('useFindAndModify', false);

        mongoose.connect(mongoDB_URL);

        mongoose.connection.on(`connected`, () => {
            console.log(`Mongoose connected to ${mongoDB_URL}`);
            resolve();
        });

        const db =  mongoose.connection;

        mongoose.connection.on(`error`, (error:any) => {
            console.log(`MongoDB error => `, error)
        })
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('connected', resolve);
    });
}

export default knex;