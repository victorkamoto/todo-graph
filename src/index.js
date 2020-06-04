require("dotenv").config("../config.env")
require("babel-polyfill");
const router = require("express").Router()
import graphqlHTTP from "express-graphql";


import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';


const typeDefs = loadSchemaSync("schema.graphql", { loaders: [ new GraphQLFileLoader()]});
import resolvers from "./graphql"

let schema = addResolversToSchema({ 
    schema: typeDefs, 
    resolvers 
});

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