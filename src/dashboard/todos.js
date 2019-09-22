import React from 'react';
import ReactDOM from 'react-dom';


class ToDos extends React.Component {
    constructor(props) {
        super(props);
        if(props.todos && props.todos.data){
            this.state = { todos: props.todos };
        }
        else{
            this.state = {todos: {data:[]}}
        }
        console.log(props);
    }
    getTableTodos() {
        let rows = [];
        for (let i = 0; i < this.state.todos.data.length; i++) {
            let task = this.state.todos.data[i].attributes.task;
            rows.push(
                <tr className={this.isDone(task)} key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.done ? "Finished" : "Not finished"}</td>
                </tr>
            );
        }
        return rows;
    }
    isDone(task) {
        return task.done ? "positive" : "";
    }

    render() {
        return (
            <div className="ui raised padded container segment">
                <div>
                    <table className="ui selectable celled table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>No Action</td>
                                <td>None</td>
                            </tr>
                            {this.getTableTodos()}
                        </tbody>
                        <tfoot className="fullwidth">
                            <tr>
                                <th></th>
                                <th colSpan="4">
                                    <div className="ui right floated small primary labeled icon button">
                                        <i className="list icon"></i> Add item
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

export default ToDos;