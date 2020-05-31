const { name } = require("./about");

const list = async (parent, args, { db: { collections }}) => {
    const all = await collections[name].find()
    return all;
}

const listCompleted = async (parent, args, { db: { collections }}) => {
    const completed = await collections[name].find({
        where: {
            completed: true
        }
    });
    return completed;
}

const listIncomplete = async (parent, args, { db: { collections }}) => {
    const incomplete = await collections[name].find({
        where: {
            completed: false
        }
    });
    return incomplete;
}

const single = async (parent, args, { db: { collections }}) => {
    const { id } = args[name];

    const singleTodo = await collections[name].findOne({
        where: id
    });
    return singleTodo;
}

export { list, listCompleted, listIncomplete, single };