import React, {
    Component,
    PropTypes
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Body.less';
import fetch from '../../core/fetch';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
const method = "post";


const set=async (field, id)=> {
    const send = async() => {
        const resp = await fetch('/graphql', {
            method,
            headers,
            body: JSON.stringify({
                query: '{todo{content,process,state,id}}',
                action: "set",
                id,

            }),
            credentials: 'include',
        });
        const {
            data
        } = await resp.json();
        if (!data || !data.todo) throw new Error('Failed to load the news feed.');
        this.setState({
            todo: data.todo
        })
    }
    send();
}


@withStyles(s)
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello!',
            todo: JSON.parse(JSON.stringify(props.todo))
        };
    }

    handleChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }
    keyHandle = (event) => {
        console.log(event.key);
        console.log(arguments, event.key, event.ctrlKey);
        if (event.key === "Enter") {
            console.log("send");
            const send = async() => {
                const resp = await fetch('/graphql', {
                    method,
                    headers,
                    body: JSON.stringify({
                        query: '{todo{content,process,state,id}}',
                        action: "add",
                        content: this.state.message,
                    }),
                    credentials: 'include',
                });
                const {
                    data
                } = await resp.json();
                if (!data || !data.todo) throw new Error('Failed to load the news feed.');
                this.setState({
                    todo: data.todo,
                    message: ""
                })
            }
            send();

        }
    }
    taskTop = (id) => {
        const send = async() => {
            const resp = await fetch('/graphql', {
                method,
                headers,
                body: JSON.stringify({
                    query: '{todo{content,process,state,id}}',
                    action: "top",
                    id,
                }),
                credentials: 'include',
            });
            const {
                data
            } = await resp.json();
            if (!data || !data.todo) throw new Error('Failed to load the news feed.');
            this.setState({
                todo: data.todo
            })
        }
        send();
    }
    taskDelete = (id) => {
        const send = async() => {
            const resp = await fetch('/graphql', {
                method,
                headers,
                body: JSON.stringify({
                    query: '{todo{content,process,state,id}}',
                    action: "delete",
                    id,
                }),
                credentials: 'include',
            });
            const {
                data
            } = await resp.json();
            if (!data || !data.todo) throw new Error('Failed to load the news feed.');
            this.setState({
                todo: data.todo
            })
        }
        send();
    }
    toggleComplete = (task) => {
        if (task.process < 100) {
            set(task.id, "process", 100);
        }

    }
    render() {
        console.log(arguments, this.props)
        return <section id="todoapp">
                <header id="header" >
                <input id="new-todo" placeholder="What needs to be done?" value={this.state.message}   onChange={this.handleChange} onKeyPress={this.keyHandle}/>
                </header>
                <section id="main"><input id="toggle-all" type="checkbox"/>           
                    <ul id="todo-list">
                        {this.state.todo.map((v,i)=>{
                          return <li key={i} className={v.state}>
                            <div className="view"><input className="toggle" type="checkbox" onChange={this.toggleComplete.bind(this,v)}/>
                            <label>{v.content} in {v.process}</label>                            
                            <button className="top tool" onClick={this.taskTop.bind(this,v.id)}></button>
                            <button className="destroy tool" onClick={this.taskDelete.bind(this,v.id)}></button>
                            
                            </div>
                        </li> 
                        })}
                    </ul>
                </section>
                <footer id="footer" >
                    <span id="todo-count" >
                    <strong >{this.state.todo.length}</strong>
                    <span > item left</span>
                    </span>
                    <ul id="filters" >
                        <li >
                            <a href="#" className="selected" >All</a>
                        </li>
                        <li >
                            <a href="#Active" className="" >Active</a>
                        </li>
                        <li >
                            <a href="#Completed" className="" >Completed</a>
                        </li>
                    </ul>
                </footer>
            </section>;

    }

}
Body.propTypes = {
    todo: PropTypes.array.isRequired,
};

export default Body;