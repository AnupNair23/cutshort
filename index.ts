import express from "express";
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import dbConnect from "./src/utils/mongodb";

import logger from 'morgan'
import dotenv from "dotenv";
import routerAPI from "./src/api";
dotenv.config()

const app = express();
app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}


app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

dbConnect()

app.use('/api', routerAPI)
app.get('', (req,res) => {
    res.send('yes babyy')
})

app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default app;