require("dotenv").config("../config.env")
require("babel-polyfill");
const router = require("express").Router()
import graphqlHTTP from "express-graphql";


import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";


const typeDefs = importSchema("./schema.graphql");
import resolvers from "./graphql"

let schema = makeExecutableSchema({ typeDefs, resolvers });

router.use("/graph", (req, res, next) => {
    return graphqlHTTP({
        schema,
        graphiql: true,
        context: {
            db: req.app.locals.db
        }
    })(req, res, next)
})

export default router;