const Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
    identity,
    datastore: "default",
    primaryKey: "id",

    attributes: {
        id: { type: "string", required: true},
        task: { type: "string", required: true},
        completed: { type: "boolean", defaultsTo: false}
    }
})