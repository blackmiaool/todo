import React, {
    Component,
    PropTypes
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Body.less';
import fetch from '../../core/fetch';
import ContentEditable from "react-contenteditable";


const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
const method = "post";


async function set(id, field, value) {
    const send = async() => {
        const resp = await fetch('/graphql', {
            method,
            headers,
            body: JSON.stringify({
                query: '{todo{content,process,state,id}}',
                action: "set",
                id,
                field,
                value
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
async function getUserInfo(id, field, value) {
    const send = async() => {
        
    }
    send();
}


@withStyles(s)
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            todo: JSON.parse(JSON.stringify(props.todo)),
            filter: "avaliable",
            needUpdate:false
        };
    }

    handleChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }
    keyHandle = (event) => {
        if (event.key === "Enter") {
            if(!this.state.message){
                return;
            }
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
    topTask = (task) => {
        const id = task.id;
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
    deleteTask = (task) => {
        const id = task.id;
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
    toggleActive = (task) => {
        let state;
        switch (task.state) {
        case "pending":
            state = "active";
            break;
        case "active":
            state = "pending";
            break;
        case "finished":
            state = "active";
            break;
        }
        set.call(this, task.id, "state", state);

    }
    finishTask = (task) => {
        if (task.state !== "finished") {
            set.call(this, task.id, "state", "finished");
        }

    }
    setFilter = (filter) => {
        this.setState({
            filter
        });
    }
    filterState = (state) => {
        if (this.state.filter === "avaliable") {
            if (state === "finished") {
                return false;
            }
        } else if (this.state.filter !== state) {
            return false;
        }

        return true;
    }
    clearTask = () => {
        const send = async() => {
            const resp = await fetch('/graphql', {
                method,
                headers,
                body: JSON.stringify({
                    query: '{todo{content,process,state,id}}',
                    action: "clear",                    
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
    updateContent =(task)=>{
        return (e)=>{
            const content=e.target.value
            task.content=content;
            this.state.needUpdate=true;
        }
    }
    syncContent=(task)=>{
        return ()=>{
            if(!this.state.needUpdate){
                this.state.needUpdate=false;
                return;
            }                            
            set.call(this, task.id, "content", task.content);
        }
    }
    render() {
        const listData = this.state.todo.filter((v, i) => {
            if (!this.filterState(v.state)) {
                return false;
            }
            return true;
        });
        const list = listData.map((v, i) => {
            if (!this.filterState(v.state)) {
                return;
            }

            return <li key={i} className={v.state}>
                            <div className="view"><input className="toggle" type="checkbox" onChange={this.toggleActive.bind(this,v)} checked={v.state==="active"} title={v.state==="active"?"active":"inactive"}/>
                          
                            <ContentEditable html={v.content} tagName="label"
                            onChange={this.updateContent(v)}
                            onBlur={this.syncContent(v)}
                            />
                            <button className="top tool" onClick={this.topTask.bind(this,v)} title="top"></button>
                            {
                                this.state.filter==="finished"?<button className="destroy tool" onClick={this.deleteTask.bind(this,v)} title="delete"></button>:<button className=" tool finish" onClick={this.finishTask.bind(this,v)} title="finish"></button>
                            }
                            
                            </div>
                        </li>
        });
        const avaliableCnt = this.state.todo.reduce((p, v, i) => {
            if (v.state !== "finished")
                return p + 1;
            else
                return p;
        }, 0);
        return <section id="todoapp">
               <footer id="footer" >
                    <span id="todo-count" >
                    <strong >{avaliableCnt}</strong>
                    <span > task{list.length&&'s'||''} left</span>
                    </span>
                    <ul id="filters" >
                        <li >
                            <a className={this.state.filter==="avaliable"&&"selected"}  onClick={this.setFilter.bind(this,"avaliable")}>Avaliable</a>
                        </li>
                        <li >
                            <a className={this.state.filter==="active"&&"selected"}  onClick={this.setFilter.bind(this,"active")}>Active</a>
                        </li>
                        <li >                           
                            <a className={this.state.filter==="finished"&&"selected"}  onClick={this.setFilter.bind(this,"finished")}>Finished</a>
                        </li>
                    </ul>
                    {this.state.filter==="finished"&&
                    <button id="clear-completed" onClick={this.clearTask}><span>Clear finished (</span><span>{list.length}</span><span>)</span></button>}
                </footer>
                <header id="header" >
                <input id="new-todo" placeholder="What needs to be done?" value={this.state.message}   onChange={this.handleChange} onKeyPress={this.keyHandle}/>
                </header>
                <section id="main"><input id="toggle-all" type="checkbox"/>           
                    <ul id="todo-list">
                        {list}
                    </ul>
                </section>
                
            </section>;

    }

}
Body.propTypes = {
    todo: PropTypes.array.isRequired,
};

export default Body;