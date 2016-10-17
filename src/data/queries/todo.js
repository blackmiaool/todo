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

const todo = {
    type: new List(TodoType),
    resolve(request) {
        const {
            action,
            content
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
                    Todo.create({
                        content,
                        state: 'pending',
                        process: 0,
                        userId: user.id
                    });
                    break;
                default:
                    break;
            }
        }
        console.log("request:", action, content);
        const wait = async function() {
           
               let userLogin = await User.findOne({
                //                    attributes: ['todo'],
                include: [ {
                        model: Todo,
                        as: 'todos'
                    } ],
                where: {
                    id: user.id,
                },
            });
            console.log(userLogin.todos) 
      
            return userLogin.todos;
            
        }
        return wait();
        const ret = [{
            content: "abc",
            state: "pending",
            process: 5,
        }];
        return ret;

    },
};

export default todo;