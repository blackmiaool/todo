import DataType from 'sequelize';
import Model from '../sequelize';
import User from './User';

const Todo = Model.define('Todo', {
    content: {
        type: DataType.STRING(1000),
    },
    state: {
        type: DataType.ENUM('pending', 'active', 'finish'),
        defaultValue: "pending",
    },
    process: {
        type: DataType.INTEGER(),
        defaultValue: 0,
    },

}, {
});

export default Todo;