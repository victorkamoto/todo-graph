require("babel-polyfill")
import express, { urlencoded, json } from "express";
import morgan from "morgan"
import cors from "cors"
import graphRouter from "./index"

import storage from "./storage";
import multer from "multer"

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, "./tmp")
        },
        filename(req, file, cb){
            const [filename, ext] = file.originalname.split(".")
            cb(null, `${filename}-${Date.now()}.${ext}`)
        }
    })
})

const { NODE_ENV, PORT = 4000 } = process.env
var app = express()

if(NODE_ENV !== "test") app.use(morgan("combined"), cors() )

const attachGraphRouter = async () => {
    const db = await storage
    Object.assign(app.locals, { db })

    app.use(urlencoded({ extended: true }))
    app.use(json())
    app.get("/health", (req, res) => res.json({ success: true, message: "Welcome to a simple todo graph API"}))
    app.use("/", graphRouter)
}

attachGraphRouter()

if(NODE_ENV !== "test") app.listen(PORT, () => console.log(`Project running on port ${PORT}! on ${NODE_ENV} mode.`))
