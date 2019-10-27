import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import { Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            modalOpen: false,
            handleEdit: props.onClick
        }
        this.openModal = this.openModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.markDone = this.markDone.bind(this);
    }
    openModal() {
        this.setState({ modalOpen: true });
    }
    handleSubmit(e) {
        console.log(e.target);
        this.state.handleEdit(this.state.task);
        this.setState({ modalOpen: false });
    }

    markDone() {
        var t = this.state.task;
        t.done = true;
        this.setState({ task: t });
        this.state.handleEdit(this.state.task);
    }

    render() {
        return (
            <tr className={this.state.task.done ? 'positive' : null}>
                <td>{this.state.task.name} </td>
                <td>{this.state.task.description}</td>
                <td>{this.state.task.done ? "Finished" : "Not finished"}</td>
                <td>
                    <Modal open={this.state.modalOpen} trigger={<Button icon='edit' onClick={this.openModal} basic color='blue' />}>
                        <Modal.Header>Edit task</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Form onSubmit={this.state.handleEdit}>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Input}
                                            label='Name'
                                            defaultValue={this.state.task.name}
                                        />
                                        <Form.Field
                                            control={Input}
                                            label='Description'
                                            defaultValue={this.state.task.description}
                                        />
                                    </Form.Group>
                                    <Form.Field onClick={this.handleSubmit} control={Button}>Submit</Form.Field>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <Button icon='checkmark' onClick={this.markDone} basic color='green' />
                </td>
            </tr>
        );
    }
}

class ToDos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: { data: [] } }
        this.addTask = this.addTask.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:8080/tasks/all")
            .then(res => res.json())
            .then(data => {
                this.setState({ todos: data.data });
            })
            .catch(console.log)
    }
    handleEdit(e) {
        console.log("Dupa");
        console.log(e);
    }
    getTableTodos() {
        let rows = [];
        for (let i = 0; i < this.state.todos.length; i++) {
            let task = this.state.todos[i].attributes.task;
            rows.push(
                <TableRow key={task.id} onClick={this.handleEdit} isEditable={false} task={task} />
            );
        }
        console.log(rows);
        return rows;
    }
    isDone(task) {
        return task.done ? "positive" : "";
    }


    addTask = (event) => {
        console.log(this.state);
        var newId = uuid();
        var joined = this.state.todos.concat(
            {
                attributes: {
                    task: {
                        id: newId,
                        name: "New tasks name",
                        description: "New task Descriptopn",
                        done: false
                    }
                }
            }
        );
        this.setState({
            todos: joined
        })
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTableTodos()}
                        </tbody>
                        <tfoot className="fullwidth">
                            <tr>
                                <th></th>
                                <th colSpan="4">
                                    <Modal trigger={<div onClick={this.addTask} className="ui right floated small primary labeled icon button">
                                        <i className="list icon"></i> Add item
                                    </div>}>
                                        <Modal.Header>Select a Photo</Modal.Header>
                                        <Modal.Content image>
                                            <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
                                            <Modal.Description>
                                                <Header>Default Profile Image</Header>
                                                <p>
                                                    We've found the following gravatar image associated with your e-mail
                                                    address.
                                                </p>
                                                <p>Is it okay to use this photo?</p>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
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