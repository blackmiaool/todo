import {
    GraphQLList as List
} from 'graphql';
import fetch from '../../core/fetch';
import TodoType from '../types/TodoType';
import {
    User
} from '../models';

import {
    Todo
} from '../models';

async function deleteTask(id) {
    const task = await getTask(id);
    await task.destroy();
}
async function getList(user) {
    const userInfo = await User.findOne({
        //                    attributes: ['todo'],
        include: [{
            model: Todo,
            as: 'todos'
                    }],
        where: {
            id: user.id,
        },
    })
    return userInfo.todos.reverse();
}
async function getTask(id) {
    const task = await Todo.findById(id);
    return task;
}
const todo = {
    type: new List(TodoType),
    async resolve(request) {
        const {
            action,
            content,
            id
        } = request.request.body;
        let user = request.user;
        if (!user) {
            user = {
                id: 1
            }
        }
        if (action) {
            switch (action) {
            case "add":
                await Todo.create({
                    content,
                    state: 'pending',
                    process: 0,
                    userId: user.id
                });
                break;
            case "delete":
                await deleteTask(id);

                break;
            case "top":
                {
                    const task = await getTask(id);                    
                    await deleteTask(id);
                    delete task.dataValues.id;
                    const taskValue = task.get({
                        plain: true
                    });
                    delete taskValue.id;
                    await Todo.create(taskValue);                    
                    break;
                }

            default:
                break;
            }
        }

        const list = await getList(user);
        return list;


    },
};

export default todo;