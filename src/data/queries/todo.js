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
    if (!task) {
        return;
    }
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
    });    
    return userInfo.todos.reverse();
}
async function getTask(id) {
    const task = await Todo.findById(id);
    return task;
}
async function clear(user) {
    await Todo.destroy({        
        where: {
            userId: user.id,
            state:"finished",
        },
    });  
    
}
const todo = {
    type: new List(TodoType),
    async resolve(request) {
    console.log("cookie",request.request.cookies)
        const body = request.request.body;
        const {
            action,
            content,
            id
        } = body;
        let user = request.request.user;
        if (!user) {
            user = {
                id: 1
            }
        }

        if (action) {
            switch (action) {
            case "add":
                {
                    const {

                        content,
                    } = body;
                    await Todo.create({
                        content,
                        state: 'pending',
                        process: 0,
                        userId: user.id
                    });
                    break;
                }
            case "delete":
                {
                    await deleteTask(id);
                    break;
                }
            case "top":
                {
                    const task = await getTask(id);
                    if (!task) {
                        break;
                    }
                    await deleteTask(id);
                    delete task.dataValues.id;
                    const taskValue = task.get({
                        plain: true
                    });
                    delete taskValue.id;
                    await Todo.create(taskValue);
                    break;
                }
            case "set":
                {
                    const {
                        id,
                        field,
                        value
                    } = body;
                    const task = await getTask(id);
                    if (!task) {
                        break;
                    }
                    await task.update({
                        [field]: value
                    })
                    break;
                }
            case "clear":
                {
                    await clear(user);
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