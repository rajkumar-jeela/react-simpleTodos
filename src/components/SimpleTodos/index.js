import {Component} from 'react'
import {MdDeleteForever} from 'react-icons/md'
import {IoIosSave} from 'react-icons/io'
import TodoItem from '../TodoItem'

import './index.css'

class Todo extends Component {
  state = {
    todoList: [],
    inputElement: '',
  }

  componentDidMount() {
    this.getTodoListFromLocalStorage()
  }

  getTodoListFromLocalStorage = () => {
    const stringifiedTodoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList === null) {
      this.setState({todoList: []})
    } else {
      this.setState({todoList: parsedTodoList})
    }
  }

  onClickSubmit = event => {
    event.preventDefault()
    console.log('submit button is clicked ')

    const {inputElement} = this.state
    if (inputElement === '') {
      alert.show('Please Enter your todo')
    } else {
      const todoContent = inputElement
      this.setState(prevState => ({
        todoList: [...prevState.todoList, todoContent],
      }))
      this.setState({inputElement: ''})
    }
  }

  onChangeInput = event => {
    this.setState({inputElement: event.target.value})
  }

  onClickDeleteAllTodo = () => {
    this.setState({todoList: []})
    localStorage.removeItem('todoList')
  }

  onClickDeleteTodo = content => {
    const {todoList} = this.state
    const newList = todoList.filter(eachItem => eachItem !== content)
    this.setState({todoList: newList})
  }

  onClickSaveAllTodo = () => {
    const {todoList} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  render() {
    const {inputElement, todoList} = this.state
    const showTodoContainer = todoList.length > 0
    console.log(showTodoContainer)
    return (
      <div className="main-todo-container">
        <h1 className="todo-main-heading">Todos</h1>
        <div className="todo-container">
          <h1 className="create-task-heading">Create Task</h1>
          <form onSubmit={this.onClickSubmit}>
            <input
              type="text"
              className="todo-input-tag"
              placeholder="What needs to be done?"
              onChange={this.onChangeInput}
              value={inputElement}
            />
            <button type="submit" className="add-todo-button">
              Add Todo
            </button>
          </form>
        </div>
        {showTodoContainer && (
          <div className="todo-lists-container">
            <div className="todo-list-heading-container">
              <h1 className="create-task-heading">Your Todos</h1>
              <div className="save-delete-button-container">
                <button
                  type="button"
                  className="save-all-todo-button"
                  onClick={this.onClickSaveAllTodo}
                >
                  <IoIosSave color="green" size={20} />
                  <span className="button-text">Save All Todos</span>
                </button>

                <button
                  className="delete-all-todo-button"
                  type="button"
                  onClick={this.onClickDeleteAllTodo}
                >
                  <MdDeleteForever color="red" size={20} />
                  <span className="button-text">Delete All todo</span>
                </button>
              </div>
            </div>
            <ul>
              {todoList.map(eachItem => (
                <TodoItem
                  todoItemContent={eachItem}
                  key={eachItem}
                  onClickDeleteTodo={this.onClickDeleteTodo}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Todo
