import Waterline from "waterline"
import DiskAdapter from "sails-disk";
import MongoAdapter from "sails-mongo";

import { todo } from "./graphql/resolvers/Mutation/todo/model";

const { NODE_ENV, DB_URI } = process.env

var waterline = new Waterline()

waterline.registerModel(todo)

var config = {
    adapters: {
        mongo: MongoAdapter,
        disk: DiskAdapter,
    },
    datastores: {
        default: !['development', 'test'].includes(NODE_ENV) ? {
            adapter: 'mongo',
            url: DB_URI
        } : {
            adapter: "disk"
        }
    }
}

export default new Promise((resolve, reject) => {
    waterline.initialize(config, (err, db) => {
        if (err) {
            console.log(err)
            reject(err)
        }
        resolve(db)
    })
})